import { Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import useContent from "../hooks/useContent";
import paths from "../routes/paths";

const AccountRegisterSuccessPage = () => {
  const content = useContent();

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-center justify-center mx-auto max-w-3xl py-8 space-y-10 lg:space-y-12 w-[95vw] lg:w-[70vw]">
        <img
          src={content.accountRegisterSuccess.image}
          alt={content.accountRegisterSuccess.header}
          className="w-[240px] h-[240px] lg:w-[360px] lg:h-[360px]"
        />

        <Stack className="items-center space-y-2 text-center w-full">
          <Typography className="!font-bold text-left !text-3xl">
            {content.accountRegisterSuccess.header}
          </Typography>

          <Typography className="!font-medium !text-gray-500 !text-sm">
            {content.accountRegisterSuccess.subheader}
          </Typography>
        </Stack>

        <Button
          className="btn btn-primary"
          component={Link}
          to={paths.get("HOME").PATH}
        >
          {content.accountRegisterSuccess.action}
        </Button>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default AccountRegisterSuccessPage;
