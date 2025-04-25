import { ROLES } from "../constants/roles";
import paths from "../routes/paths";

const NAV_OPTIONS = [
  { title: paths.get("HOME").LABEL, path: paths.get("HOME").PATH },
  { title: paths.get("JOBS").LABEL, path: paths.get("JOBS").PATH },
];

const PROFILE_MENU_OPTIONS = (id) => [
  {
    icon: "Users",
    title: paths.get("USER_MANAGEMENT").LABEL,
    path: `${paths.get("USER_MANAGEMENT").PATH}`,
    roles: [ROLES.get("admin").value],
  },
  {
    icon: "UserLine",
    title: paths.get("PROFILE").LABEL,
    path: `${paths.get("PROFILE").PATH}/${id}`,
    roles: [ROLES.get("employee").value, ROLES.get("employer").value],
  },
  {
    icon: "Table",
    title: paths.get("JOBS_MANAGEMENT").LABEL,
    path: paths.get("JOBS_MANAGEMENT").PATH,
    roles: [ROLES.get("employer").value],
  },
  {
    icon: "Archive",
    title: paths.get("JOBAPPLICATIONS").LABEL,
    path: paths.get("JOBAPPLICATIONS").PATH,
    roles: [ROLES.get("employee").value, ROLES.get("employer").value],
  },
  {
    icon: "Settings",
    title: paths.get("ACCOUNT").LABEL,
    path: paths.get("ACCOUNT").PATH,
    roles: [
      ROLES.get("admin").value,
      ROLES.get("employee").value,
      ROLES.get("employer").value,
    ],
  },
];

export { NAV_OPTIONS, PROFILE_MENU_OPTIONS };
