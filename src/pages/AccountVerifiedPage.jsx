import { Typography, Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { activateEmployeeAccount } from "../api/EmployeeProfilesApi";
import useContent from "../hooks/useContent";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const AccountVerifiedPage = () => {
  const { state, dispatch } = useGlobalContext();

  const content = useContent();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const verificationToken = searchParams.get("token");

  useEffect(() => {
    if (verificationToken) {
      handleActivateAccount(verificationToken);
    }
  }, [verificationToken]);

  const handleActivateAccount = async (token) => {
    const { status } = await activateEmployeeAccount(token);

    if (status === 200) {
      navigate(`${paths.get("LOGIN").PATH}`);

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: `Account activated successfully`,
          isOpen: true,
          variant: "success",
        },
      });
    }
  };

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-center justify-center mx-auto max-w-3xl py-8 space-y-10 lg:space-y-12 w-[95vw] lg:w-[70vw]">
        <img
          src={content.accountVerified.image}
          alt={content.accountVerified.header}
          className="w-[240px] h-[240px] lg:w-[360px] lg:h-[360px]"
        />

        <Stack className="items-center space-y-2 text-center w-full">
          <Typography className="!font-bold text-left !text-3xl">
            {content.accountVerified.header}
          </Typography>

          <Typography className="!font-medium !text-gray-500 !text-sm">
            {content.accountVerified.subheader}
          </Typography>
        </Stack>

        <Button
          className="btn btn-primary"
          component={Link}
          to={paths.get("LOGIN").PATH}
        >
          {content.accountVerified.action}
        </Button>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default AccountVerifiedPage;
