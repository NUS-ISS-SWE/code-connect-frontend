import { Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/profilePageComponents/EmployeeForm";
import EmployerForm from "../components/profilePageComponents/EmployerForm";
import Footer from "../components/Footer";

import { EMPLOYEE_DETAILS } from "../constants/employeeDetails";
import { EMPLOYER_DETAILS } from "../constants/employerDetails";
import { ROLES } from "../constants/roles";
import { useAuthContext } from "../hooks/useAuthContext";
import useContent from "../hooks/useContent";
import paths from "../routes/paths";

const CompleteProfilePage = () => {
  const { user } = useAuthContext();

  const content = useContent();
  const navigate = useNavigate();

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

  const handleOnSubmit = () => {
    console.log("formData", formData);
    // TODO: Integrate with API to create / update company profile
    navigate(paths.get("PROFILE").PATH);
  };

  const handleOnSkip = () => {
    navigate(paths.get("PROFILE").PATH);
  };

  return (
    <Stack className="bg-white flex h-full items-center justify-end min-h-[100vh] w-full">
      <Stack className="flex items-start justify-center max-w-3xl py-8 space-y-4 w-[95vw] lg:w-[70vw]">
        <Stack className="items-start space-y-2 w-full">
          <Typography className="!font-semibold text-left !text-3xl">
            {content.completeProfile.header}
          </Typography>

          <Typography className="!font-medium !text-gray-500 !text-sm">
            {content.completeProfile.subheader}
          </Typography>
        </Stack>

        {user?.role === ROLES.get("employee").value ? (
          <EmployeeForm
            fields={fields}
            formData={formData}
            onSkip={handleOnSkip}
            onSubmit={handleOnSubmit}
            setFormData={setFormData}
          />
        ) : (
          <EmployerForm
            fields={fields}
            formData={formData}
            onSkip={handleOnSkip}
            onSubmit={handleOnSubmit}
            setFormData={setFormData}
          />
        )}

        <img
          alt={content.completeProfile.header}
          className="w-[400px] h-auto"
          src={content.completeProfile.image}
        />
      </Stack>

      <Footer />
    </Stack>
  );
};

export default CompleteProfilePage;
