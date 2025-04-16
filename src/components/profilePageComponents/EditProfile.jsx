/* eslint-disable react/prop-types */
import { Box, Divider, Stack, Typography } from "@mui/material";

import EmployeeForm from "./EmployeeForm";
import EmployerForm from "./EmployerForm";
import ProfilePictureUpload from "./ProfilePictureUpload";
import UploadResume from "./UploadResume";

import { ROLES } from "../../constants/roles";
import { useAuthContext } from "../../hooks/useAuthContext";

const EditProfile = ({ roleDetails }) => {
  const { user } = useAuthContext();

  const fields = Array.from(roleDetails).map(([key, value]) => key);
  const [formData, setFormData] = useState(
    Object.fromEntries(
      fields.map((key) => [
        roleDetails.get(key).key,
        roleDetails.get(key).type === "number" ? 0 : "",
      ])
    )
  );

  useEffect(() => {
    if (!user) return;

    setFormData(user);
  }, [user]);

  const handleOnSubmit = () => {
    console.log("formData", formData);
  };

  return user?.role === ROLES.get("employee").value ? (
    <Stack className="flex items-start justify-start py-4 space-y-12 w-full">
      {/* Employee Picture */}
      <Stack className="items-start space-y-2 w-full">
        <Box className="flex items-center justify-start w-full">
          <Typography className="!font-medium flex-1 text-left !text-2xl">
            Profile Image
          </Typography>
        </Box>

        <Divider flexItem />

        <ProfilePictureUpload formData={formData} setFormData={setFormData} />
      </Stack>

      {/* Employee Details */}
      <Stack className="space-y-2 w-full">
        <Box className="flex items-center justify-start w-full">
          <Typography className="!font-medium flex-1 text-left !text-2xl">
            Profile Details
          </Typography>
        </Box>

        <Divider flexItem />

        <EmployeeForm
          fields={fields}
          formData={formData}
          onSubmit={handleOnSubmit}
          setFormData={setFormData}
        />
      </Stack>

      {/* Employee Resume */}
      <Stack className="space-y-2 w-full">
        <Box className="flex items-center justify-start w-full">
          <Typography className="!font-medium flex-1 text-left !text-2xl">
            Upload Resume
          </Typography>
        </Box>

        <Divider flexItem />

        <UploadResume />
      </Stack>
    </Stack>
  ) : (
    <Stack className="flex items-start justify-start py-4 space-y-12 w-full">
      {/* Employer Picture */}
      <Stack className="items-start space-y-2 w-full">
        <Box className="flex items-center justify-start w-full">
          <Typography className="!font-medium flex-1 text-left !text-2xl">
            Company Logo
          </Typography>
        </Box>

        <Divider flexItem />

        <ProfilePictureUpload formData={formData} setFormData={setFormData} />
      </Stack>

      {/* Employer Details */}
      <Stack className="space-y-2 w-full">
        <Box className="flex items-center justify-start w-full">
          <Typography className="!font-medium flex-1 text-left !text-2xl">
            Company Details
          </Typography>
        </Box>

        <Divider flexItem />

        <EmployerForm
          fields={fields}
          formData={formData}
          onSubmit={handleOnSubmit}
          setFormData={setFormData}
        />
      </Stack>
    </Stack>
  );
};

export default EditProfile;
