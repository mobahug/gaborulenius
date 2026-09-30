import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import StraightenIcon from "@mui/icons-material/Straighten";
import TerrainIcon from "@mui/icons-material/Terrain";
import type { ReactNode } from "react";

type ExplorerScreenshot = {
  src: string;
  altId: string;
  titleId: string;
};

export type ExplorerCapability = {
  icon: ReactNode;
  titleId: string;
  bodyId: string;
  /**
   * The app screens shown beside it (from `explorerScreenshots`): the one
   * that does it, in front, and another behind it.
   */
  screens: readonly [front: string, back: string];
};

export const explorerScreenshots: ExplorerScreenshot[] = [
  {
    src: "explorer/map-tracking.webp",
    titleId: "projectExplorerScreenshotMapTrackingTitle",
    altId: "projectExplorerScreenshotMapTracking",
  },
  {
    src: "explorer/map-stopped.webp",
    titleId: "projectExplorerScreenshotMapStoppedTitle",
    altId: "projectExplorerScreenshotMapStopped",
  },
  {
    src: "explorer/home-active-expedition.webp",
    titleId: "projectExplorerScreenshotHomeTitle",
    altId: "projectExplorerScreenshotHomeAlt",
  },
  {
    src: "explorer/expeditions-list.webp",
    titleId: "projectExplorerScreenshotExpeditionsTitle",
    altId: "projectExplorerScreenshotExpeditionsAlt",
  },
  {
    src: "explorer/profile-summary.webp",
    titleId: "projectExplorerScreenshotProfileTitle",
    altId: "projectExplorerScreenshotProfileAlt",
  },
  {
    src: "explorer/measure-distance.webp",
    titleId: "projectExplorerScreenshotMeasureTitle",
    altId: "projectExplorerScreenshotMeasureAlt",
  },
  {
    src: "explorer/log-type-picker.webp",
    titleId: "projectExplorerScreenshotLogTypeTitle",
    altId: "projectExplorerScreenshotLogTypeAlt",
  },
  {
    src: "explorer/log-layout-customize.webp",
    titleId: "projectExplorerScreenshotCustomizeTitle",
    altId: "projectExplorerScreenshotCustomizeAlt",
  },
  {
    src: "explorer/logs-overview.webp",
    titleId: "projectExplorerScreenshotLogsOverviewTitle",
    altId: "projectExplorerScreenshotLogsOverview",
  },
  {
    src: "explorer/logs-records.webp",
    titleId: "projectExplorerScreenshotLogsRecordsTitle",
    altId: "projectExplorerScreenshotLogsRecords",
  },
  {
    src: "explorer/log-details-weather.webp",
    titleId: "projectExplorerScreenshotLogDetailsTitle",
    altId: "projectExplorerScreenshotLogDetailsAlt",
  },
  {
    src: "explorer/logs-selection.webp",
    titleId: "projectExplorerScreenshotLogsSelectionTitle",
    altId: "projectExplorerScreenshotLogsSelection",
  },
];

export const explorerCapabilities: ExplorerCapability[] = [
  {
    icon: <TerrainIcon />,
    titleId: "projectExplorerCapabilityTopoTitle",
    bodyId: "projectExplorerCapabilityTopoBody",
    screens: ["explorer/map-tracking.webp", "explorer/map-stopped.webp"],
  },
  {
    icon: <StraightenIcon />,
    titleId: "projectExplorerCapabilityPrecisionTitle",
    bodyId: "projectExplorerCapabilityPrecisionBody",
    screens: [
      "explorer/measure-distance.webp",
      "explorer/profile-summary.webp",
    ],
  },
  {
    icon: <AssignmentTurnedInIcon />,
    titleId: "projectExplorerCapabilityCaptureTitle",
    bodyId: "projectExplorerCapabilityCaptureBody",
    screens: [
      "explorer/log-type-picker.webp",
      "explorer/log-details-weather.webp",
    ],
  },
  {
    icon: <CloudSyncIcon />,
    titleId: "projectExplorerCapabilityCloudTitle",
    bodyId: "projectExplorerCapabilityCloudBody",
    screens: [
      "explorer/home-active-expedition.webp",
      "explorer/expeditions-list.webp",
    ],
  },
];

export const explorerDetailGroups = [
  {
    titleId: "projectExplorerDetailMobileHeading",
    items: [
      "projectExplorerDetailMobileItemOffline",
      "projectExplorerDetailMobileItemPrecision",
      "projectExplorerDetailMobileItemCapture",
    ],
  },
  {
    titleId: "projectExplorerDetailInfraHeading",
    items: [
      "projectExplorerDetailInfraItemCloudflare",
      "projectExplorerDetailInfraItemSupabase",
      "projectExplorerDetailInfraItemRelease",
    ],
  },
  {
    titleId: "projectExplorerDetailWebHeading",
    items: [
      "projectExplorerDetailWebItemWorkspace",
      "projectExplorerDetailWebItemReporting",
    ],
  },
];

export const explorerStack = [
  "React Native",
  "Expo",
  "TypeScript",
  "MapLibre",
  "Protomaps/PMTiles",
  "Cloudflare R2/Workers",
  "Supabase",
  "Auth0",
  "EAS",
  "WeatherAPI",
];
