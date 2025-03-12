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
    "CREATEJOB",
    {
      ID: "_createjob",
      LABEL: "Create Job",
      PATH: "/job/create",
      IS_PROTECTED: false,
    },
  ],
  [
    "GETJOB",
    {
      ID: "_getjob",
      LABEL: "Get Job",
      PATH: "/job/:id",
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
    "GETPROFILE",
    {
      ID: "_getprofile",
      LABEL: "GetProfile",
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
]);

export default paths;