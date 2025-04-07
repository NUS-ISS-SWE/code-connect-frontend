import paths from "../routes/paths";

const JOB_DETAILS_TAB_OPTIONS = (jobId) => [
  {
    path: `${paths.get("JOB").PATH}/${jobId}`,
    title: paths.get("GETJOB").LABEL,
    value: 0,
  },

  {
    path: `${paths.get("JOB").PATH}/${jobId}/edit`,
    title: paths.get("EDITJOB").LABEL,
    value: 1,
  },
];

export { JOB_DETAILS_TAB_OPTIONS };
