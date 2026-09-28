// encode <in> <out> <bitrate bps> <gop frames> [width height [cropX [grade [window focus]]]]
//
// Re-encodes a film for scroll scrubbing (see src/journey/film/films.ts):
// H.264 High, a keyframe every `gop` frames, no frame reordering (no
// B-frames), BT.709 tags, metadata first, no audio, starting at time 0.
//
// - width × height: the frame every rendition shares (1880 × 1080), or a
//   smaller one (the light encode, 1128 × 648).
// - cropX: pixels cut from each side of the source before it is scaled to
//   width × height.
// - grade: "saturation,contrast,vibrance,gamma" in an sRGB working space, or
//   "-" for none.
// - window, focus: a portrait rendition. Of each frame only `window` pixels
//   of its width are kept, where `object-position: <focus>%` shows them on a
//   screen that narrow — the focus following the film's keyframes
//   ("time:percent,…", as `focus` in films.ts). A screen no wider than the
//   window (window / height) then sees exactly what the full frame shows it,
//   from a fraction of the pixels.
//
// Build: swiftc -O -o encode tools/film/encode.swift (see encode-films.mjs).
import AVFoundation
import CoreImage
import Foundation

let a = CommandLine.arguments
let inURL = URL(fileURLWithPath: a[1]), outURL = URL(fileURLWithPath: a[2])
let bitrate = Int(a[3])!, gop = Int(a[4])!
let frameW = a.count > 6 ? Int(a[5])! : 1880, frameH = a.count > 6 ? Int(a[6])! : 1080
let cropX = a.count > 7 ? Int(a[7])! : 0
let grade: [Double]? =
  a.count > 8 && a[8] != "-" ? a[8].split(separator: ",").map { Double($0)! } : nil
let window = a.count > 10 ? Int(a[9])! : nil
let focusKeys: [(Double, Double)] =
  a.count > 10
  ? a[10].split(separator: ",").map { pair in
    let parts = pair.split(separator: ":").map { Double($0)! }
    return (parts[0], parts[1])
  }
  : []
let outW = window ?? frameW, outH = frameH

/// The focus (percent) at `time`, as `focusAt` in frameMapping.ts on a
/// portrait screen: linear between keyframes, held before and after.
func focus(at time: Double) -> Double {
  guard var x = focusKeys.first?.1 else { return 50 }
  for index in 1..<focusKeys.count {
    let (t0, x0) = focusKeys[index - 1]
    let (t1, x1) = focusKeys[index]
    if time <= t0 { break }
    x = time >= t1 ? x1 : x0 + (x1 - x0) * ((time - t0) / (t1 - t0))
  }
  return x
}

try? FileManager.default.removeItem(at: outURL)
let asset = AVURLAsset(url: inURL)
let sem = DispatchSemaphore(value: 0)
var track: AVAssetTrack!
Task {
  track = try! await asset.loadTracks(withMediaType: .video).first!
  sem.signal()
}
sem.wait()
let reader = try! AVAssetReader(asset: asset)
let output = AVAssetReaderTrackOutput(
  track: track,
  outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
reader.add(output)
let writer = try! AVAssetWriter(outputURL: outURL, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: outW, AVVideoHeightKey: outH,
  AVVideoColorPropertiesKey: [
    AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
    AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
    AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2,
  ],
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: bitrate,
    AVVideoMaxKeyFrameIntervalKey: gop,
    AVVideoAllowFrameReorderingKey: false,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoH264EntropyModeKey: AVVideoH264EntropyModeCABAC,
    AVVideoExpectedSourceFrameRateKey: Int(track.nominalFrameRate.rounded()),
  ] as [String: Any],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: input,
  sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: outW, kCVPixelBufferHeightKey as String: outH,
  ])
writer.add(input)
reader.startReading()
writer.startWriting()
writer.startSession(atSourceTime: .zero)
let context = CIContext(
  options: grade != nil ? [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!] : [:])
var frames = 0
var firstPTS: CMTime? = nil
while let sample = output.copyNextSampleBuffer() {
  guard let pixels = CMSampleBufferGetImageBuffer(sample) else { continue }
  var pts = CMSampleBufferGetPresentationTimeStamp(sample)
  if firstPTS == nil { firstPTS = pts }
  // Start at exactly 0 (a source's edit list may start later).
  pts = CMTimeSubtract(pts, firstPTS!)
  while !input.isReadyForMoreMediaData { usleep(1000) }
  var buffer = pixels
  let srcW = CVPixelBufferGetWidth(pixels), srcH = CVPixelBufferGetHeight(pixels)
  if frameW != srcW || frameH != srcH || cropX > 0 || grade != nil || window != nil {
    var target: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &target)
    let cropW = srcW - 2 * cropX
    var image = CIImage(cvPixelBuffer: pixels)
      .cropped(to: CGRect(x: cropX, y: 0, width: cropW, height: srcH))
      .transformed(by: CGAffineTransform(translationX: CGFloat(-cropX), y: 0))
      .transformed(
        by: CGAffineTransform(
          scaleX: CGFloat(frameW) / CGFloat(cropW), y: CGFloat(frameH) / CGFloat(srcH)))
    if let g = grade {
      image =
        image
        .applyingFilter(
          "CIColorControls",
          parameters: [
            kCIInputSaturationKey: g[0], kCIInputContrastKey: g[1], kCIInputBrightnessKey: 0,
          ]
        )
        .applyingFilter("CIVibrance", parameters: ["inputAmount": g[2]])
        .applyingFilter("CIGammaAdjust", parameters: ["inputPower": g[3]])
    }
    if let window = window {
      // Where object-position shows a window this wide: that share of the
      // width the frame has beyond it.
      let x = (focus(at: CMTimeGetSeconds(pts)) / 100 * Double(frameW - window)).rounded()
      image = image
        .cropped(to: CGRect(x: x, y: 0, width: Double(window), height: Double(frameH)))
        .transformed(by: CGAffineTransform(translationX: CGFloat(-x), y: 0))
    }
    context.render(image, to: target!)
    buffer = target!
  }
  adaptor.append(buffer, withPresentationTime: pts)
  frames += 1
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
if writer.status != .completed {
  print("FAILED", writer.error as Any)
  exit(1)
}
let size = (try! FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as! NSNumber)
  .intValue
print(outURL.lastPathComponent, "frames", frames, "bytes", size)
