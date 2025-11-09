import logoConsolePlus from "../assets/images/logo-console-plus.svg";
import logoDevlens from "../assets/images/logo-devlens.svg";
import logoDomSnapshot from "../assets/images/logo-dom-snapshot.svg";
import logoGridGuides from "../assets/images/logo-grid-guides.svg";
import logoJsonWizard from "../assets/images/logo-json-wizard.svg";
import logoLinkChecker from "../assets/images/logo-link-checker.svg";
import logoMarkupNotes from "../assets/images/logo-markup-notes.svg";
import logoPalettePicker from "../assets/images/logo-palette-picker.svg";
import logoSpeedBoost from "../assets/images/logo-speed-boost.svg";
import logoStyleSpy from "../assets/images/logo-style-spy.svg";
import logoTabMasterPro from "../assets/images/logo-tab-master-pro.svg";
import logoViewportBuddy from "../assets/images/logo-viewport-buddy.svg";

export const extensions = [
  {
    logo: logoDevlens,
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: logoStyleSpy,
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: logoSpeedBoost,
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: logoJsonWizard,
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: logoTabMasterPro,
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: logoViewportBuddy,
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: logoMarkupNotes,
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: logoGridGuides,
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: logoPalettePicker,
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: logoLinkChecker,
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: logoDomSnapshot,
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: logoConsolePlus,
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

export default extensions;
