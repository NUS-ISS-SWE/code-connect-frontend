/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Icon from "../../constants/Icon";
import { ROLES } from "../../constants/roles";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewProfile = ({ image, resume, roleDetails }) => {
  const { user } = useAuthContext();

  return (
    <Stack className="flex items-start justify-start py-4 space-y-6 w-full">
      {!image ? (
        <Box className="bg-gray-100 flex h-36 items-start justify-center overflow-hidden rounded-full !text-gray-300 w-36">
          <Icon name={"User"} size={"117%"} />
        </Box>
      ) : (
        <img
          alt="profile"
          src={image}
          className="border border-gray-300 h-36 object-cover rounded-full w-36"
        />
      )}

      {Array.from(roleDetails).map(([key, value]) => (
        <Typography key={key}>
          <strong>{value.label}:</strong> {user?.[value.key]}
        </Typography>
      ))}

      {user?.role === ROLES.get("employee").value && resume && (
        <Stack className="flex justify-start space-y-1 w-full">
          <Typography className={`!capitalize !font-semibold !text-md`}>
            Resume:
          </Typography>

          <Box className="flex items-center justify-start relative space-x-2 !text-sm text-gray-500 w-[100%]">
            <Icon name="File" size={"1.1rem"} />

            <Typography
              className={`cursor-pointer !text-sm text-primary hover:underline`}
              component={Link}
              rel="noopener noreferrer"
              target="_blank"
              to={resume.fileUrl}
            >
              {`${resume?.file?.name}`}
            </Typography>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default ViewProfile;
