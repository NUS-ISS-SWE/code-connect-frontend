import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import Icon from "../constants/Icon";
import Navbar from "../components/Navbar";

import {
  createProfile,
  getProfileById,
  retrieveResume,
  updateProfile,
  uploadResume,
} from "../api/ProfileApi";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const ProfilePage = () => {
  const { state, dispatch } = useGlobalContext();
  const { setUser, user } = useAuthContext();

  const navigate = useNavigate();
  const { id } = useParams(); // Get profile ID from URL

  const [resume, setResume] = useState(null);
  const [draftUploadedResume, setDraftUploadedResume] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    currentCompany: "",
    location: "",
    email: "",
    phone: "",
    aboutMe: "",
    programmingLanguages: "",
    education: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const createUpdateProfile = async () => {
    if (id) {
      const { data, error } = await updateProfile(
        { id, ...formData },
        dispatch
      );
      if (error) {
        console.error("Error updated profile:", error);
        return;
      }

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: "Profile updated successfully",
          isOpen: true,
          variant: "success",
        },
      });
    } else {
      const { data, error } = await createProfile(formData, dispatch);

      if (error) {
        console.error("Error creating profile:", error);
        return;
      }

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: "Profile created successfully",
          isOpen: true,
          variant: "success",
        },
      });
      // Redirect to the new profile page
      navigate(`${paths.get("PROFILE").PATH}/${data.id}`);
    }
  };

  useEffect(() => {
    // If no ID is provided, show an empty form for creating a profile
    if (!id) return;

    //TODO: fetch user profile should happen on login
    fetchProfile();
  }, [id]); // Runs when the ID changes

  const fetchProfile = async () => {
    try {
      const { data, error } = await getProfileById({ id }, dispatch);
      if (error) throw new Error(error);

      const profileData = await data.json();

      setFormData(profileData);
      setUser({ ...user, ...profileData });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.resumeData?.resumeContent) {
      fetchResume();
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchResume = async () => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const { data, error } = await retrieveResume(
      { id, fileName: user.resumeData?.resumeFileName },
      dispatch
    );

    if (data) {
      setResume(data);
    }

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  const handleAddResume = async (event) => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const file = event.target.files[0];

    if (file) {
      setDraftUploadedResume(file);
    }

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  const handleRemoveResume = () => {
    setDraftUploadedResume(null);
  };

  const handleUpdateResume = async () => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const formData = new FormData();
    formData.append("file", draftUploadedResume);

    const { data, error } = await uploadResume({ id, formData }, dispatch);

    if (error) {
      console.error("Error uploading resume:", error);
      return;
    }

    setResume({
      file: draftUploadedResume,
      fileUrl: URL.createObjectURL(draftUploadedResume),
    });

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: "Resume uploaded successfully",
        isOpen: true,
        variant: "success",
      },
    });

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          {id ? "Profile" : "Create Profile"}
        </Typography>

        <Divider flexItem />

        {/* Tabs for View / Edit */}
        {id && (
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="View" />
            <Tab label="Edit" />
          </Tabs>
        )}

        {/* Profile Section */}
        <Stack className="flex items-start justify-start py-4 space-y-4 w-full">
          {/* Profile Picture */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" />
            <Typography variant="h6">
              {formData?.fullName || "New User"}
            </Typography>
          </Stack>

          {id && tabIndex === 0 ? (
            // View Mode (when an ID is provided)
            <Stack className="flex items-start justify-start space-y-6 w-full">
              <Typography>
                <strong>Job Title:</strong> {formData?.jobTitle}
              </Typography>
              <Typography>
                <strong>Company:</strong> {formData?.currentCompany}
              </Typography>
              <Typography>
                <strong>Location:</strong> {formData?.location}
              </Typography>
              <Typography>
                <strong>Email:</strong> {formData?.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {formData?.phone}
              </Typography>
              <Typography>
                <strong>About Me:</strong> {formData?.aboutMe}
              </Typography>
              <Typography>
                <strong>Programming Languages:</strong>
                {formData?.programmingLanguages}
              </Typography>
              <Typography>
                <strong>Education:</strong> {formData?.education}
              </Typography>
              <Typography>
                <strong>Work Experience:</strong> {formData?.experience}
              </Typography>

              {resume && (
                <Stack className="flex justify-start space-y-1 w-full">
                  <Typography className={`!capitalize !font-semibold !text-md`}>
                    Resume:
                  </Typography>

                  <Box className="flex items-center justify-start relative space-x-2 !text-sm text-gray-500 w-[100%]">
                    <Icon name="File" size={"1.1rem"} />

                    <Typography
                      className={`cursor-pointer !text-sm text-primary hover:underline`}
                      component={Link}
                      rel="noopener noreferrer"
                      target="_blank"
                      to={resume.fileUrl}
                    >
                      {`${resume?.file?.name}`}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Stack>
          ) : (
            // Edit / Create Mode
            <Stack className="flex items-start justify-start space-y-6 w-full">
              <TextField
                size="small"
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData?.fullName}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData?.jobTitle}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Current Company"
                name="currentCompany"
                value={formData?.currentCompany}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Location"
                name="location"
                value={formData?.location}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData?.phone}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="About Me"
                name="aboutMe"
                multiline
                rows={3}
                value={formData?.aboutMe}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Programming Languages"
                name="programmingLanguages"
                value={formData?.programmingLanguages}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Education"
                name="education"
                value={formData?.education}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="Work Experience"
                name="experience"
                value={formData?.experience}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={createUpdateProfile}
              >
                {id ? "Save Changes" : "Create Profile"}
              </Button>

              {/* Upload Resume */}
              {id && (
                <Stack className="flex justify-start pt-4 space-y-4 w-[100%]">
                  <Stack className="space-y-1">
                    <Typography className={`!capitalize !font-medium !text-lg`}>
                      Upload Resume
                    </Typography>

                    <Divider />
                  </Stack>

                  {draftUploadedResume ? (
                    <Stack className="flex justify-start space-y-1 w-[100%]">
                      <Box className="flex items-center justify-start relative space-x-2 !text-sm text-gray-500 w-[100%]">
                        <Icon name="File" size={"1.1rem"} />

                        <Typography
                          className={`!text-sm text-gray-700`}
                          // className={`!text-sm text-accent hover:underline`}
                        >
                          {`${draftUploadedResume.name}`}
                        </Typography>
                        <IconButton
                          className="h-fit !rounded-md"
                          onClick={handleRemoveResume}
                        >
                          <Icon name="Close" size={"1.1rem"} />
                        </IconButton>
                      </Box>
                    </Stack>
                  ) : (
                    <Stack className="flex justify-start space-y-1 w-[100%]">
                      <Box className="flex justify-start space-x-2 w-[100%]">
                        <Box
                          className="!bg-white !border !border-gray-300 !border-solid  cursor-pointer !duration-500 !ease-in-out !font-normal !flex !gap-2 items-center !justify-start !pb-0.5 !pl-0.5 !pr-1.5 !pt-0.5 !rounded-md !shadow-none !text-sm !text-gray-900 !tracking-normal !transition-all w-[100%] hover:!border-gray-900"
                          disabled={loading}
                          component="label"
                        >
                          <Button
                            className="!bg-gray-100 !border !border-gray-300 !border-solid !capitalize !duration-500 !ease-in-out !font-semibold !pb-1.5 !pl-3 !pr-3 !pt-1.5 !shadow-none !text-sm !text-gray-900 !tracking-normal !transition-all w-fit hover:!bg-gray-200"
                            disabled={loading}
                            component="label"
                          >
                            Choose File
                            <input
                              accept=".pdf"
                              type="file"
                              hidden
                              onChange={handleAddResume}
                            />
                          </Button>
                          No file chosen
                          <input
                            accept=".pdf"
                            type="file"
                            hidden
                            onChange={handleAddResume}
                          />
                        </Box>
                      </Box>

                      <Typography className={`!text-xs text-gray-700 `}>
                        Allowed types: pdf.
                      </Typography>
                    </Stack>
                  )}

                  <Button
                    className="!bg-black !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !shadow-none !text-sm !text-white !tracking-normal !transition-all w-fit hover:!bg-primary-100"
                    disabled={loading}
                    onClick={handleUpdateResume}
                    variant="contained"
                  >
                    {loading ? (
                      <CircularProgress size={20} className="!text-white" />
                    ) : (
                      "Update Resume"
                    )}
                  </Button>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
