import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import Icon from "../constants/Icon";
import Navbar from "../components/Navbar";
import UploadResume from "../components/profilePageComponents/UploadResume";

import {
  createProfile,
  getProfileById,
  retrieveResume,
  updateProfile,
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

  useEffect(() => {
    if (!user) return;

    // fetch resume if user has resume-related data
    if (user.resumeData?.resumeContent) {
      fetchResume();
    } else {
      setResume(null);
    }
  }, [user]);

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

  const fetchResume = async () => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const { data, error } = await retrieveResume(
      {
        id,
        fileName: user.resumeData?.resumeFileName, // pass uploaded resume file name from user data
      },
      dispatch
    );

    if (data) {
      setResume(data);
    }

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              {id && <UploadResume />}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
