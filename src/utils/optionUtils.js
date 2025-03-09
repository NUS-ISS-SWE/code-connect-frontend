import { JOB_TYPES } from "../constants/jobTypes";
import paths from "../routes/paths";

const JOB_TYPES_FILTER_OPTIONS = [
  {
    title: "All",
    value: "",
  },
  {
    title: JOB_TYPES.get("fullTime").label,
    value: JOB_TYPES.get("fullTime").value,
  },
  {
    title: JOB_TYPES.get("partTime").label,
    value: JOB_TYPES.get("partTime").value,
  },
  {
    title: JOB_TYPES.get("contract").label,
    value: JOB_TYPES.get("contract").value,
  },
  {
    title: JOB_TYPES.get("internship").label,
    value: JOB_TYPES.get("internship").value,
  },
  {
    title: JOB_TYPES.get("freelance").label,
    value: JOB_TYPES.get("freelance").value,
  },
];

const NAV_OPTIONS = [
  { title: paths.get("HOME").LABEL, path: paths.get("HOME").PATH },
  { title: paths.get("JOBS").LABEL, path: paths.get("JOBS").PATH },
];

export { JOB_TYPES_FILTER_OPTIONS, NAV_OPTIONS };
