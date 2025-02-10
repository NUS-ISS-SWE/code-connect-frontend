import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider
} from "@mui/material";

const ProfilePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "Test User",
    jobTitle: "Software Engineer",
    currentCompany: "Tech Corp",
    location: "Singapore",
    email: "testuser@example.com",
    phone: "12345678",
    aboutMe: "Passionate developer currently doing their masters in SWE at NUS-ISS.",
    programmingLanguages: "React.JS, SpringBoot",
    education: "NUS ISS SWE",
    experience: "work experience"
  });
  

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "left", mb: 2 }}>
        Profile
      </Typography>
      <Divider sx={{ borderBottom: "1px solid #ccc", mb: 2 }} />

      {/* Tabs for View / Edit */}
      <Tabs value={tabIndex} onChange={handleTabChange} left>
        <Tab label="View" />
        <Tab label="Edit" />
      </Tabs>

      {/* Profile Section */}
      <Stack spacing={3} sx={{ mt: 3 }}>
        {/* Profile Picture */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src="https://via.placeholder.com/100"
            alt="Profile Picture"
          />
          <Typography variant="h6">{formData.fullName}</Typography>
        </Stack>

        {tabIndex === 0 ? (
          // View Mode
          <Stack spacing={2}>
            <Typography>
              <strong>Job Title:</strong> {formData.jobTitle}
            </Typography>
            <Typography>
              <strong>Company:</strong> {formData.currentCompany}
            </Typography>
            <Typography>
              <strong>Location:</strong> {formData.location}
            </Typography>
            <Typography>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography>
              <strong>Phone Number:</strong> {formData.phone}
            </Typography>
            <Typography>
              <strong>About Me:</strong> {formData.aboutMe}
            </Typography>
            <Typography>
              <strong>Programming Languages:</strong> {formData.programmingLanguages}
            </Typography>
            <Typography>
              <strong>Education:</strong> {formData.education}
            </Typography>
            <Typography>
              <strong>Work Experience:</strong> {formData.experience}
            </Typography>
          </Stack>
        ) : (
          // Edit Mode
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Current Company"
              name="company"
              value={formData.currentCompany}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="About Me"
              name="aboutMe"
              multiline
              rows={3}
              value={formData.aboutMe}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Programming Languages"
              name="programmingLanguages"
              value={formData.programmingLanguages}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Work Experience"
              name="workExperience"
              value={formData.experience}
              onChange={handleChange}
            />

            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default ProfilePage;
