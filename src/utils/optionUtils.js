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
  SALARY_MIN_FILTER_OPTIONS,
  SALARY_MAX_FILTER_OPTIONS,
};
