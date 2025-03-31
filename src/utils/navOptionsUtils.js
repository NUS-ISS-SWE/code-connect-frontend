import paths from "../routes/paths";

const NAV_OPTIONS = [
  { title: paths.get("HOME").LABEL, path: paths.get("HOME").PATH },
  { title: paths.get("JOBS").LABEL, path: paths.get("JOBS").PATH },
];

const PROFILE_MENU_OPTIONS = [
  {
    icon: "UserLine",
    title: paths.get("PROFILE").LABEL,
    path: paths.get("PROFILE").PATH,
  },
  {
    icon: "Table",
    title: paths.get("JOBS_MANAGEMENT").LABEL,
    path: paths.get("JOBS_MANAGEMENT").PATH,
  },
  {
    icon: "Settings",
    title: paths.get("ACCOUNT").LABEL,
    path: paths.get("ACCOUNT").PATH,
  },
];

export { NAV_OPTIONS, PROFILE_MENU_OPTIONS };
