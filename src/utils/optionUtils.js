import { JOB_TYPES } from "../constants/jobTypes";
import paths from "../routes/paths";

const JOB_TYPES_FILTER_OPTIONS = [
  {
    label: JOB_TYPES.get("fullTime").label,
    value: JOB_TYPES.get("fullTime").value,
  },
  {
    label: JOB_TYPES.get("partTime").label,
    value: JOB_TYPES.get("partTime").value,
  },
  {
    label: JOB_TYPES.get("contract").label,
    value: JOB_TYPES.get("contract").value,
  },
  {
    label: JOB_TYPES.get("internship").label,
    value: JOB_TYPES.get("internship").value,
  },
  {
    label: JOB_TYPES.get("freelance").label,
    value: JOB_TYPES.get("freelance").value,
  },
];

const LOCATION_FILTER_OPTIONS = [
  {
    label: "Remote",
    value: "Remote",
  },
  {
    label: "Central",
    value: "Central",
  },
  {
    label: "North",
    value: "North",
  },
  {
    label: "South",
    value: "South",
  },
  {
    label: "East",
    value: "East",
  },
  {
    label: "West",
    value: "West",
  },
];

const NAV_OPTIONS = [
  { title: paths.get("HOME").LABEL, path: paths.get("HOME").PATH },
  { title: paths.get("JOBS").LABEL, path: paths.get("JOBS").PATH },
];

export { JOB_TYPES_FILTER_OPTIONS, LOCATION_FILTER_OPTIONS, NAV_OPTIONS };
