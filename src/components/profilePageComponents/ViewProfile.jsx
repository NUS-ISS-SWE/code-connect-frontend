import { Box, Icon, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { EMPLOYER_DETAILS } from "../../constants/employerDetails";
import { ROLES } from "../../constants/roles";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewProfile = ({ resume }) => {
  const { user } = useAuthContext();

  return user?.role === ROLES.get("employee").value ? (
    // Employee Profile
    <Stack className="flex items-start justify-start space-y-6 w-full">
      <Typography>
        <strong>Job Title:</strong> {user?.jobTitle}
      </Typography>
      <Typography>
        <strong>Company:</strong> {user?.currentCompany}
      </Typography>
      <Typography>
        <strong>Work Experience:</strong> {user?.experience}
      </Typography>
      <Typography>
        <strong>Location:</strong> {user?.location}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user?.email}
      </Typography>
      <Typography>
        <strong>Phone:</strong> {user?.phone}
      </Typography>
      <Typography>
        <strong>About Me:</strong> {user?.aboutMe}
      </Typography>
      <Typography>
        <strong>Programming Languages:</strong>
        {user?.programmingLanguages}
      </Typography>
      <Typography>
        <strong>Skillset:</strong> {user?.skillSet}
      </Typography>
      <Typography>
        <strong>Education:</strong> {user?.education}
      </Typography>
      <Typography>
        <strong>Certifications:</strong> {user?.certifications}
      </Typography>

      {resume && (
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
  ) : (
    // Employee Profile
    <Stack className="flex items-start justify-start space-y-6 w-full">
      <Typography>
        <strong>Company Name:</strong>
        {user?.[EMPLOYER_DETAILS.get("companyName").key]}
      </Typography>

      <Typography>
        <strong>Company Description:</strong>
        {user?.[EMPLOYER_DETAILS.get("companyDescription").key]}
      </Typography>

      <Typography>
        <strong>Company Location:</strong>
        {user?.[EMPLOYER_DETAILS.get("companyLocation").key]}
      </Typography>

      <Typography>
        <strong>Company Industry:</strong>
        {user?.[EMPLOYER_DETAILS.get("companyIndustry").key]}
      </Typography>

      <Typography>
        <strong>Company Size:</strong>
        {user?.[EMPLOYER_DETAILS.get("companySize").key]}
      </Typography>
    </Stack>
  );
};

export default ViewProfile;
