import { Box, Stack, Tab, Tabs } from "@mui/material";

import EditProfile from "../components/profilePageComponents/EditProfile";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ViewProfile from "../components/profilePageComponents/ViewProfile";

import { RetrieveResume } from "../api/ProfileApi";
import { EMPLOYEE_DETAILS } from "../constants/employeeDetails";
import { EMPLOYER_DETAILS } from "../constants/employerDetails";
import { ROLES } from "../constants/roles";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ProfilePage = () => {
  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const { user } = useAuthContext();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const roleDetails =
    user?.role === ROLES.get("employee").value
      ? EMPLOYEE_DETAILS
      : EMPLOYER_DETAILS;

  useEffect(() => {
    if (user?.role === ROLES.get("employee").value) {
      fetchResume();
    }

    fetchImage();
  }, [user]);

  const fetchImage = async () => {
    //TODO: Integrate with API to fetch profile picture
  };

  const fetchResume = async () => {
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
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[95vw] lg:w-[70vw]">
        <Stack className="space-y-4 w-full">
          {/* Tabs for View / Edit */}
          <Box className="border-b border-gray-300">
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="View" />
              <Tab label="Edit" />
            </Tabs>
          </Box>

          {/* Profile Section */}
          {id && tabIndex === 0 ? (
            <ViewProfile image={image} resume={resume} roleDetails={roleDetails} />
          ) : (
            <EditProfile roleDetails={roleDetails} />
          )}
        </Stack>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default ProfilePage;
