import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/profilePageComponents/EmployeeForm";
import EmployerForm from "../components/profilePageComponents/EmployerForm";
import Footer from "../components/Footer";

import { registerUser } from "../api/UserApi";
import { EMPLOYEE_DETAILS } from "../constants/employeeDetails";
import { EMPLOYER_DETAILS } from "../constants/employerDetails";
import { ROLES } from "../constants/roles";
import useContent from "../hooks/useContent";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";
import { useEffect } from "react";

const CompleteProfilePage = () => {
  const {
    state: { registerDraft },
    dispatch,
  } = useGlobalContext();

  const content = useContent();
  const navigate = useNavigate();
  const detailsMap =
    registerDraft?.role === ROLES.get("employee").value
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

  useEffect(() => {
    if (!registerDraft) {
      navigate(`${paths.get("SIGNUP").PATH}`);
    } else {
      const { email, ...rest } = formData;
      setFormData({
        email: registerDraft.email,
        ...rest,
      });
    }
  }, []);

  const handleOnSubmit = async () => {
    const { username, password, role, email } = registerDraft;

    const responseBody = {
      username,
      password,
      role,
      email,
      ...formData,
    };

    const { status } = await registerUser(responseBody, dispatch);

    if (status === 200) {
      navigate(`${paths.get("ACCOUNT_REGISTER_SUCCESS").PATH}`);
    }
  };

  const handleOnSkip = () => {};

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

        {registerDraft?.role === ROLES.get("employee").value ? (
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
