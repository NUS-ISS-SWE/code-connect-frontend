import { Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

import EmployeeForm from "../components/profilePageComponents/EmployeeForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePictureUpload from "../components/profilePageComponents/ProfilePictureUpload";
import ViewProfile from "../components/profilePageComponents/ViewProfile";

import { RetrieveResume, retrieveUserProfile } from "../api/ProfileApi";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ProfilePage = () => {
  const { state, dispatch } = useGlobalContext();

  const { setUser, user } = useAuthContext();
  const { id } = useParams(); // Get profile ID from URL

  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({
        aboutMe: "",
        certifications: "",
        currentCompany: "",
        education: "",
        email: "",
        experience: "",
        fullName: "",
        jobTitle: "",
        location: "",
        phone: "",
        programmingLanguages: "",
        skillSet: "",
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
    const { data, status } = await retrieveUserProfile(id, dispatch);

    if (status === 200) {
      setFormData(data);
      setUser({ ...user, ...data });
    }
  };

  const fetchResume = async () => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const { data } = await RetrieveResume(
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

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[95vw] lg:w-[70vw]">
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
          <ProfilePictureUpload
            formData={formData}
            setFormData={setFormData}
            showSelectButton={tabIndex === 1 && id}
          />
          {id && tabIndex === 0 ? (
            <ViewProfile formData={formData} resume={resume} />
          ) : (
            <EmployeeForm
              formData={formData}
              id={id}
              setFormData={setFormData}
              setLoading={setLoading}
              dispatch={dispatch}
            />
          )}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default ProfilePage;
