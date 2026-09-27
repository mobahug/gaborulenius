type NavigatorConnection = {
  effectiveType?: string;
  saveData?: boolean;
  /** Estimated bandwidth (Mb/s). */
  downlink?: number;
};

type NavigatorWithConnection = Navigator & {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
};

export const getNetworkConnection = () => {
  const navigatorWithConnection = navigator as NavigatorWithConnection;

  return (
    navigatorWithConnection.connection ??
    navigatorWithConnection.mozConnection ??
    navigatorWithConnection.webkitConnection
  );
};

export const canPrefetchHeavyAsset = () => {
  const connection = getNetworkConnection();

  if (connection?.saveData) {
    return false;
  }

  return !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
};

/**
 * Whether to take the lighter encodes of the films: only when the visitor
 * asked to save data, the connection is slow, or the device has very little
 * memory. Screen size is no reason — a phone crops the 16:9 films to a
 * portrait slice and needs every pixel of the full-HD ones.
 */
export const wantsLightVideo = () => {
  const connection = getNetworkConnection();
  if (connection?.saveData) return true;
  if (["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")) {
    return true;
  }
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  return memory !== undefined && memory <= 2;
};

/** A connection known to be modest (under 4 Mb/s), where a large file is
 * better fetched after a light one (where the browser tells). */
export const isModestConnection = () => {
  const downlink = getNetworkConnection()?.downlink;
  return typeof downlink === "number" && downlink > 0 && downlink < 4;
};
