const paths = new Map([
  [
    "ERROR",
    {
      ID: "_error",
      LABEL: "Error",
      PATH: "/error",
      IS_PROTECTED: false,
    },
  ],
  [
    "ACCOUNT",
    {
      ID: "_account",
      LABEL: "Account",
      PATH: "/account",
      IS_PROTECTED: true,
    },
  ],
  [
    "ACCOUNT_REGISTER_SUCCESS",
    {
      ID: "_registration_success",
      LABEL: "",
      PATH: "/registration-success",
      IS_PROTECTED: false,
    },
  ],
  [
    "ACCOUNT_VERIFIED",
    {
      ID: "_verification_success",
      LABEL: "",
      PATH: "/verification-success",
      IS_PROTECTED: false,
    },
  ],
  [
    "ADMIN",
    {
      ID: "_admin",
      LABEL: "Admin",
      PATH: "/admin",
      IS_PROTECTED: true,
    },
  ],
  [
    "CONTENT",
    {
      ID: "_content",
      LABEL: "Content",
      PATH: "content",
      IS_PROTECTED: true,
    },
  ],
  [
    "COMPLETE_PROFILE",
    {
      ID: "_complete_profile",
      LABEL: "Complete Profile",
      PATH: "/complete-profile",
      IS_PROTECTED: false,
    },
  ],
  [
    "HOME",
    {
      ID: "_home",
      LABEL: "Home",
      PATH: "/",
      IS_PROTECTED: false,
    },
  ],
  [
    "JOBS",
    {
      ID: "_jobs",
      LABEL: "Jobs",
      PATH: "/jobs",
      IS_PROTECTED: false,
    },
  ],
  [
    "JOBAPPLICATIONS",
    {
      ID: "_jobapplications",
      LABEL: "Job Applications",
      PATH: "/jobapplications",
      IS_PROTECTED: false,
    },
  ],
  [
    "JOBS_MANAGEMENT",
    {
      ID: "_jobs",
      LABEL: "Manage Jobs",
      PATH: "/jobs-management",
      IS_PROTECTED: true,
    },
  ],
  [
    "CREATEJOB",
    {
      ID: "_createjob",
      LABEL: "Create Job",
      PATH: "/job/create",
      IS_PROTECTED: true,
    },
  ],
  [
    "APPLY_JOB",
    {
      ID: "_apply_job",
      LABEL: "Apply Job",
      PATH: "/job/:jobId/apply",
      IS_PROTECTED: true,
    },
  ],
  [
    "VIEW_JOB_APPLICATION",
    {
      ID: "_view_job_application",
      LABEL: "View Job Application",
      PATH: "/job/:jobId/view-application/:applicationId",
      IS_PROTECTED: true,
    },
  ],
  [
    "APPLY_JOB_SUCCESS",
    {
      ID: "_apply_job_success",
      LABEL: "",
      PATH: "/job/application-success",
      IS_PROTECTED: true,
    },
  ],
  [
    "EDITJOB",
    {
      ID: "_edit_job",
      LABEL: "Edit",
      PATH: "/job/:jobId/edit",
      IS_PROTECTED: true,
    },
  ],
  [
    "GETJOB",
    {
      ID: "_getjob",
      LABEL: "View",
      PATH: "/job/:jobId",
      IS_PROTECTED: false,
    },
  ],
  [
    "JOB",
    {
      ID: "_job",
      LABEL: "Job",
      PATH: "/job",
      IS_PROTECTED: false,
    },
  ],
  [
    "LOGIN",
    {
      ID: "_login",
      LABEL: "Login",
      PATH: "/login",
      IS_PROTECTED: false,
    },
  ],
  [
    "PROFILE",
    {
      ID: "_profile",
      LABEL: "Profile",
      PATH: "/profile",
      IS_PROTECTED: false,
    },
  ],
  [
    "PROFILE_VIEW",
    {
      ID: "_profile_view",
      LABEL: "Profile",
      PATH: "/profile/:id",
      IS_PROTECTED: false,
    },
  ],
  [
    "SIGNUP",
    {
      ID: "_signup",
      LABEL: "Sign Up",
      PATH: "/signup",
      IS_PROTECTED: false,
    },
  ],
  [
    "USER_MANAGEMENT",
    {
      ID: "_user_management",
      LABEL: "Manage Users",
      PATH: "/user-management",
      IS_PROTECTED: true,
    },
  ],
]);

export default paths;
