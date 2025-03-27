import { JOB_LOCATION } from "../constants/jobLocation";
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
    label: JOB_TYPES.get("temporary").label,
    value: JOB_TYPES.get("temporary").value,
  },
  {
    label: JOB_TYPES.get("internship").label,
    value: JOB_TYPES.get("internship").value,
  },
  {
    label: JOB_TYPES.get("remote").label,
    value: JOB_TYPES.get("remote").value,
  },
];

const LOCATION_FILTER_OPTIONS = [
  {
    label: JOB_LOCATION.get("remote").label,
    value: JOB_LOCATION.get("remote").value,
  },
  {
    label: JOB_LOCATION.get("central").label,
    value: JOB_LOCATION.get("central").value,
  },
  {
    label: JOB_LOCATION.get("north").label,
    value: JOB_LOCATION.get("north").value,
  },
  {
    label: JOB_LOCATION.get("south").label,
    value: JOB_LOCATION.get("south").value,
  },
  {
    label: JOB_LOCATION.get("east").label,
    value: JOB_LOCATION.get("east").value,
  },
  {
    label: JOB_LOCATION.get("west").label,
    value: JOB_LOCATION.get("west").value,
  },
];

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

const SALARY_MIN_FILTER_OPTIONS = [
  {
    label: "$0",
    value: "0",
  },
  {
    label: "$1,000",
    value: "1000",
  },
  {
    label: "$2,000",
    value: "2000",
  },
  {
    label: "$3,000",
    value: "3000",
  },
  {
    label: "$4,000",
    value: "4000",
  },
  {
    label: "$5,000",
    value: "5000",
  },
  {
    label: "$6,000",
    value: "6000",
  },
  {
    label: "$7,000",
    value: "7000",
  },
  {
    label: "$8,000",
    value: "8000",
  },
  {
    label: "$9,000",
    value: "9000",
  },
  {
    label: "$10,000",
    value: "10000",
  },
  {
    label: "$15,000",
    value: "15000",
  },
  {
    label: "$20,000",
    value: "20000",
  },
  {
    label: "$25,000",
    value: "25000",
  },
  {
    label: "$30,000",
    value: "30000",
  },
];

const SALARY_MAX_FILTER_OPTIONS = [
  {
    label: "$1000",
    value: "1000",
  },
  {
    label: "$2,000",
    value: "2000",
  },
  {
    label: "$3,000",
    value: "3000",
  },
  {
    label: "$4,000",
    value: "4000",
  },
  {
    label: "$5,000",
    value: "5000",
  },
  {
    label: "$6,000",
    value: "6000",
  },
  {
    label: "$7,000",
    value: "7000",
  },
  {
    label: "$8,000",
    value: "8000",
  },
  {
    label: "$9,000",
    value: "9000",
  },
  {
    label: "$10,000",
    value: "10000",
  },
  {
    label: "$15,000",
    value: "15000",
  },
  {
    label: "$20,000",
    value: "20000",
  },
  {
    label: "$25,000",
    value: "25000",
  },
  {
    label: "$30,000",
    value: "30000",
  },
  {
    label: "$30,000+",
    value: Infinity,
  },
];

export {
  JOB_TYPES_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
  NAV_OPTIONS,
  PROFILE_MENU_OPTIONS,
  SALARY_MIN_FILTER_OPTIONS,
  SALARY_MAX_FILTER_OPTIONS,
};
