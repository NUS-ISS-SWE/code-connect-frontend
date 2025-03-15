import {
    Stack,
    Typography,
    Box,
    Icon
  } from "@mui/material";

const ViewJob = ({formData}) => {
    return (
            // View Mode (when an ID is provided)
            <Stack className="flex items-start justify-start space-y-6 w-full">
              <Typography>
                <strong>Company Name:</strong> {formData?.companyName}
              </Typography>
              <Typography>
                <strong>Company Description:</strong> {formData?.companyDescription}
              </Typography>
              <Typography>
                <strong>Salary Range:</strong> {formData?.salaryRange}
              </Typography>
              <Typography>
                <strong>Job Type:</strong> {formData?.jobType}
              </Typography>
              <Typography>
                <strong>Job Location:</strong> {formData?.jobLocation}
              </Typography>
              <Typography>
                <strong>Job Description:</strong> {formData?.jobDescription}
              </Typography>
              <Typography>
                <strong>Required Skills:</strong>
                {formData?.requiredSkills}
              </Typography>
              <Typography>
                <strong>Preferred Skills:</strong> {formData?.preferredSkills}
              </Typography>
              <Typography>
                <strong>Required Certifications:</strong> {formData?.requiredCertifications}
              </Typography>
            </Stack>
    );
};

export default ViewJob;