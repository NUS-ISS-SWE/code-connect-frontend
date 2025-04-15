import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

import EmployeeForm from "../components/profilePageComponents/EmployeeForm";
import EmployerForm from "../components/profilePageComponents/EmployerForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePictureUpload from "../components/profilePageComponents/ProfilePictureUpload";
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

  const { setUser, user } = useAuthContext();
  const { id } = useParams();

  const detailsMap =
    user?.role === ROLES.get("employee").value
      ? EMPLOYEE_DETAILS
      : EMPLOYER_DETAILS;

  const fields = Array.from(detailsMap).map(([key, value]) => key);

  const [formData, setFormData] = useState(
    Object.fromEntries(
      fields.map((key) => [
        detailsMap.get(key).key,
        detailsMap.get(key).type === "number" ? 0 : "",
      ])
    )
  );
  const [resume, setResume] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!user) return;

    setFormData(user);
  }, [user]);

  // useEffect(() => {
  //   if (user.id === Number(id)) return;

  //   !!!TODO Fetch other user profile
  // }, [id]);

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

  const handleOnSubmit = () => {
    console.log("formData", formData);
  };

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[95vw] lg:w-[70vw]">
        <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Box className="flex items-center justify-start w-full">
              <Typography className="!font-medium flex-1 text-left !text-2xl">
                Profile
              </Typography>
            </Box>

            <Divider flexItem />
          </Stack>

          {/* Tabs for View / Edit */}
          <Box className="border-b border-gray-300">
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="View" />
              <Tab label="Edit" />
            </Tabs>
          </Box>

          {/* Profile Section */}
          {id && tabIndex === 0 ? (
            <ViewProfile formData={formData} resume={resume} />
          ) : user?.role === ROLES.get("employee").value ? (
            <Stack className="flex items-start justify-start py-4 space-y-4 w-full">
              {/* Employee Picture */}
              <ProfilePictureUpload
                formData={formData}
                setFormData={setFormData}
                showSelectButton={tabIndex === 1 && id}
              />

              <EmployeeForm
                fields={fields}
                formData={formData}
                onSubmit={handleOnSubmit}
                setFormData={setFormData}
              />
            </Stack>
          ) : (
            <Stack className="flex items-start justify-start py-4 space-y-4 w-full">
              {/* Employer Picture */}
              <ProfilePictureUpload
                formData={formData}
                setFormData={setFormData}
                showSelectButton={tabIndex === 1 && id}
              />

              <EmployerForm
                fields={fields}
                formData={formData}
                onSubmit={handleOnSubmit}
                setFormData={setFormData}
              />
            </Stack>
          )}
        </Stack>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default ProfilePage;
