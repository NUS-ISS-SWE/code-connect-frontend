import {
    Stack,
    Typography,
    Box,
    Icon
  } from "@mui/material";

const ViewProfile = ({formData,resume}) => {
    return (
            // View Mode (when an ID is provided)
            <Stack className="flex items-start justify-start space-y-6 w-full">
              <Typography>
                <strong>Job Title:</strong> {formData?.jobTitle}
              </Typography>
              <Typography>
                <strong>Company:</strong> {formData?.currentCompany}
              </Typography>
              <Typography>
                <strong>Work Experience:</strong> {formData?.experience}
              </Typography>
              <Typography>
                <strong>Location:</strong> {formData?.location}
              </Typography>
              <Typography>
                <strong>Email:</strong> {formData?.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {formData?.phone}
              </Typography>
              <Typography>
                <strong>About Me:</strong> {formData?.aboutMe}
              </Typography>
              <Typography>
                <strong>Programming Languages:</strong>
                {formData?.programmingLanguages}
              </Typography>
              <Typography>
                <strong>Skillset:</strong> {formData?.skillSet}
              </Typography>
              <Typography>
                <strong>Education:</strong> {formData?.education}
              </Typography>
              <Typography>
                <strong>Certifications:</strong> {formData?.certifications}
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
    );
};

export default ViewProfile;