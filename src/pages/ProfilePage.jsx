/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */

import {
  getProfileById,
  createProfile,
  updateProfile,
} from "../api/ProfileApi";
import { PATHS } from "../paths";

// Dummy reducer for toast messages
const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        message: action.payload.message,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get profile ID from URL
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastState, dispatch] = useReducer(toastReducer, {
    message: "",
    isOpen: false,
  });

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
      const { data, error } = await createProfile({ ...formData }, dispatch);
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
      navigate(`${PATHS.get("PROFILE").PATH}/${data.id}`);
    }
  };

  useEffect(() => {
    if (!id) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({
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
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await getProfileById({ id }, dispatch);
        if (error) throw new Error(error);

        const profileData = await data.json();
        setFormData(profileData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]); // Runs when the ID changes

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "left", mb: 2 }}>
        {id ? "Profile" : "Create Profile"}
      </Typography>
      <Divider sx={{ borderBottom: "1px solid #ccc", mb: 2 }} />

      {/* Tabs for View / Edit */}
      {id && (
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="View" />
          <Tab label="Edit" />
        </Tabs>
      )}

      {/* Profile Section */}
      <Stack spacing={3} sx={{ mt: 3 }}>
        {/* Profile Picture */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" />
          <Typography variant="h6">
            {formData.fullName || "New User"}
          </Typography>
        </Stack>

        {id && tabIndex === 0 ? (
          // View Mode (when an ID is provided)
          <Stack spacing={2}>
            <Typography>
              <strong>Job Title:</strong> {formData.jobTitle}
            </Typography>
            <Typography>
              <strong>Company:</strong> {formData.currentCompany}
            </Typography>
            <Typography>
              <strong>Location:</strong> {formData.location}
            </Typography>
            <Typography>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {formData.phone}
            </Typography>
            <Typography>
              <strong>About Me:</strong> {formData.aboutMe}
            </Typography>
            <Typography>
              <strong>Programming Languages:</strong>{" "}
              {formData.programmingLanguages}
            </Typography>
            <Typography>
              <strong>Education:</strong> {formData.education}
            </Typography>
            <Typography>
              <strong>Work Experience:</strong> {formData.experience}
            </Typography>
          </Stack>
        ) : (
          // Edit / Create Mode
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Current Company"
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="About Me"
              name="aboutMe"
              multiline
              rows={3}
              value={formData.aboutMe}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Programming Languages"
              name="programmingLanguages"
              value={formData.programmingLanguages}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Work Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={createUpdateProfile}
            >
              {id ? "Save Changes" : "Create Profile"}
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default ProfilePage;
