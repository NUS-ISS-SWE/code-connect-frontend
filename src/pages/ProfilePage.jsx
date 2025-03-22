import {
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import EditProfile from "../components/profilePageComponents/EditProfile";
import ViewProfile from "../components/profilePageComponents/ViewProfile";
import Navbar from "../components/Navbar";
import ProfilePictureUpload from "../components/profilePageComponents/ProfilePictureUpload";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { GetDataByIdAPI } from "../api/GeneralAPI";

const ProfilePage = () => {
  const { state, dispatch } = useGlobalContext();
  const { setUser, user } = useAuthContext();
  const { id } = useParams(); // Get profile ID from URL
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const uri = "profiles";

  useEffect(() => {
    if (!id) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({
        fullName: "",
        jobTitle: "",
        profilePicture: "",
        currentCompany: "",
        location: "",
        email: "",
        phone: "",
        certifications: "",
        skillSet: "",
        aboutMe: "",
        programmingLanguages: "",
        education: "",
        experience: "",
      });
      setLoading(false);
      return;
    }

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
      const { data, error } = await GetDataByIdAPI(id, uri, dispatch);
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

    const { data } = await retrieveResume(
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

  // {loading ? (
  //   <CircularProgress size={20} className="!text-white" />
  // ) : (
  //   "Sign up"
  // )}

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
        <Typography className="!font-medium flex-1 text-left !text-2xl">
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
          <ProfilePictureUpload formData={formData} setFormData={setFormData} showSelectButton={tabIndex === 1 && id} />
          {id && tabIndex === 0 ? (
            <ViewProfile formData={formData} resume={resume}/>
          ) : (
            <EditProfile formData={formData} id={id} setFormData={setFormData} setLoading={setLoading} dispatch={dispatch} />
          )}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default ProfilePage;
