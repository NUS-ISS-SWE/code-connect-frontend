import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
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
import { getProfileById } from "../api/ProfileApi";

// Dummy reducer for toast messages
const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, message: action.payload.message, isOpen: action.payload.isOpen };
    default:
      return state;
  }
};

const ProfilePage = () => {
  const { id } = useParams(); // Get profile ID from URL
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastState, dispatch] = useReducer(toastReducer, { message: "", isOpen: false });

  useEffect(() => {
    if (!id) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({
        fullName: "",
        jobTitle: "",
        currentCompany: "",
        location: "",
        email: "",
        phone: "",
        aboutMe: "",
        programmingLanguages: "",
        education: "",
        experience: "",
      });
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await getProfileById({ id }, dispatch);
        if (error) throw new Error(error);

        console.log("Profile Data2:", data);
        const profileData = await data.json();

        setFormData(profileData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]); // Runs when the ID changes

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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
      {id && (
        <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="View" />
        <Tab label="Edit" />
      </Tabs>
      )}

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

        {id && tabIndex === 0 ? (
          // View Mode (when an ID is provided)
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
