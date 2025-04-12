/* eslint-disable react/prop-types */
import { Stack, TextField, Button, Chip } from "@mui/material";

import UploadResume from "./UploadResume";

import { UpdateAPI } from "../../api/GeneralAPI";
import { createProfile, UploadProfilePicture } from "../../api/ProfileApi";
import paths from "../../routes/paths";

const EditProfile = ({ formData, id, setFormData, setLoading, dispatch }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const uri = "profiles";

  const fieldRefs = {
    fullName: useRef(null),
    jobTitle: useRef(null),
    profilePicture: useRef(null),
    currentCompany: useRef(null),
    location: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    aboutMe: useRef(null),
    programmingLanguages: useRef(null),
    certifications: useRef(null),
    skillSet: useRef(null),
    education: useRef(null),
    experience: useRef(null),
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Please enter your name!";

    if (!formData.jobTitle) newErrors.jobTitle = "Please enter a job title!";

    if (!formData.currentCompany)
      newErrors.currentCompany = "Please enter your company!";

    if (!formData.location) newErrors.location = "Please enter your location!";

    if (!formData.email) newErrors.email = "Please enter your email!";

    if (!formData.phone) newErrors.phone = "Please enter your phone number!";

    if (!formData.skillSet || formData.skillSet[0] == "")
      newErrors.skillSet = "Please enter your skillset!";

    if (!formData.certifications || formData.certifications[0] == "")
      newErrors.certifications = "Please enter your certifications!";

    if (!formData.aboutMe) newErrors.aboutMe = "Please enter your about me!";

    if (!formData.programmingLanguages)
      newErrors.programmingLanguages =
        "Please enter your programming languages!";

    if (!formData.education || formData.education[0] == "")
      newErrors.education = "Please enter your education!";

    if (!formData.experience || formData.experience[0] == "")
      newErrors.experience = "Please enter your experience!";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email))
      newErrors.email = "Please enter a valid email!";

    const sgPhonePattern =
      /^(?:\+65\s?)?(?:6\d{7}|8\d{7}|9\d{7}|1800\d{6}|800\d{7})$/;

    if (!sgPhonePattern.test(formData.phone))
      newErrors.phone = "Please enter a valid Singapore phone number!";

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors)[0];

    if (firstErrorField) {
      setLoading(false);
      if (fieldRefs[firstErrorField]) {
        fieldRefs[firstErrorField]?.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: splitValueAndMap(value), // Convert comma-separated input to array
    }));
  };

  const splitValueAndMap = (value) => {
    return value.split(",").map((item) => item.trim());
  };

  const handleEducationChange = handleInputChange("education");
  const handleExperienceChange = handleInputChange("experience");
  const handleSkillsetChange = handleInputChange("skillSet");
  const handleCertificationsChange = handleInputChange("certifications");

  const createUpdateProfile = async () => {
    setLoading(true);

    var isCreate = id ? false : true;

    var isValid = validate();

    if (isValid) {
      if (formData.profilePicture instanceof File) {
        // Upload only if it's a new file
        const uploadedProfilePicture = await UploadProfilePicture(
          formData.profilePicture,
          id,
          dispatch
        );
        formData.profilePicture = uploadedProfilePicture.data;
      }

      const { data, error } = isCreate
        ? await createProfile(formData, dispatch)
        : await UpdateAPI(formData, uri, dispatch);

      if (error) {
        console.error(
          `Error ${isCreate ? "creating" : "updating"} profile:`,
          error
        );
        return;
      }

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: `Profile ${isCreate ? "created" : "updated"} successfully`,
          isOpen: true,
          variant: "success",
        },
      });

      if (isCreate) {
        // Redirect to the new profile page
        navigate(`${paths.get("PROFILE").PATH}/${data.id}`);
      }
    }

    setLoading(false);
  };

  return (
    // Edit / Create Mode
    <Stack className="flex items-start justify-start space-y-6 w-full">
      <TextField
        size="small"
        fullWidth
        label="Full Name"
        name="fullName"
        error={!!errors.fullName}
        helperText={errors.fullName}
        inputRef={fieldRefs.fullName}
        value={formData?.fullName}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Job Title"
        name="jobTitle"
        error={!!errors.jobTitle}
        helperText={errors.jobTitle}
        inputRef={fieldRefs.jobTitle}
        value={formData?.jobTitle}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Current Company"
        name="currentCompany"
        error={!!errors.currentCompany}
        helperText={errors.currentCompany}
        inputRef={fieldRefs.currentCompany}
        value={formData?.currentCompany}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Work Experience"
        name="experience"
        error={!!errors.experience}
        helperText={errors.experience}
        inputRef={fieldRefs.experience}
        value={
          Array.isArray(formData?.experience)
            ? formData.experience.join(", ")
            : ""
        }
        onChange={handleExperienceChange}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {(Array.isArray(formData?.experience) ? formData.experience : [])
          .filter((item) => item != "")
          .map((exp, index) => (
            <Chip key={index} label={exp} />
          ))}
      </Stack>
      <TextField
        size="small"
        fullWidth
        label="Location"
        name="location"
        error={!!errors.location}
        helperText={errors.location}
        inputRef={fieldRefs.location}
        value={formData?.location}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Email"
        name="email"
        error={!!errors.email}
        helperText={errors.email}
        inputRef={fieldRefs.email}
        value={formData?.email}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Phone Number"
        name="phone"
        error={!!errors.phone}
        helperText={errors.phone}
        inputRef={fieldRefs.phone}
        value={formData?.phone}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="About Me"
        name="aboutMe"
        multiline
        rows={3}
        error={!!errors.aboutMe}
        helperText={errors.aboutMe}
        inputRef={fieldRefs.aboutMe}
        value={formData?.aboutMe}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Programming Languages"
        name="programmingLanguages"
        error={!!errors.programmingLanguages}
        helperText={errors.programmingLanguages}
        inputRef={fieldRefs.programmingLanguages}
        value={formData?.programmingLanguages}
        onChange={handleChange}
      />
      <TextField
        size="small"
        fullWidth
        label="Skills"
        name="skills"
        error={!!errors.skillSet}
        helperText={errors.skillSet}
        inputRef={fieldRefs.skillSet}
        value={
          Array.isArray(formData?.skillSet) ? formData.skillSet.join(", ") : ""
        }
        onChange={handleSkillsetChange}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {(Array.isArray(formData?.skillSet) ? formData.skillSet : [])
          .filter((item) => item != "")
          .map((skill, index) => (
            <Chip key={index} label={skill} />
          ))}
      </Stack>

      <TextField
        size="small"
        fullWidth
        label="Education"
        name="education"
        error={!!errors.education}
        helperText={errors.education}
        inputRef={fieldRefs.education}
        value={
          Array.isArray(formData?.education)
            ? formData.education.join(", ")
            : ""
        }
        onChange={handleEducationChange}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {(Array.isArray(formData?.education) ? formData.education : [])
          .filter((item) => item != "")
          .map((edu, index) => (
            <Chip key={index} label={edu} />
          ))}
      </Stack>
      <TextField
        size="small"
        fullWidth
        label="Certifications"
        name="certifications"
        error={!!errors.certifications}
        helperText={errors.certifications}
        inputRef={fieldRefs.certifications}
        value={
          Array.isArray(formData?.certifications)
            ? formData.certifications.join(", ")
            : ""
        }
        onChange={handleCertificationsChange}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {(Array.isArray(formData?.certifications)
          ? formData.certifications
          : []
        )
          .filter((item) => item != "")
          .map((cert, index) => (
            <Chip key={index} label={cert} />
          ))}
      </Stack>
      {/* Upload Resume */}
      {id && <UploadResume />}
      <Button className="btn btn-primary" onClick={createUpdateProfile}>
        {id ? "Save Changes" : "Create Profile"}
      </Button>
    </Stack>
  );
};

export default EditProfile;
