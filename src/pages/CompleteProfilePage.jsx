import { Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EmployerForm from "../components/profilePageComponents/EmployerForm";
import Footer from "../components/Footer";

import useContent from "../hooks/useContent";
import paths from "../routes/paths";

const CompleteProfilePage = () => {
  const content = useContent();
  const navigate = useNavigate();

  const handleOnSuccess = () => {
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

        {/* {user.role === ROLES.get("jobSeeker").value ? (
        <EmployeeForm onSubmit={handleSubmit} onSkip={handleSkip} />
        ) : ( */}
        <EmployerForm onSuccess={handleOnSuccess} />
        {/* )} */}

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
