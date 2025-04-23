/* eslint-disable react/prop-types */
import { Stack, TextField, Button, Chip, Box } from "@mui/material";
import { createRef } from "react";
import { useParams } from "react-router-dom";

import { EMPLOYEE_DETAILS } from "../../constants/employeeDetails";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const EmployeeForm = ({ fields, formData, onSkip, onSubmit, setFormData }) => {
  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const { id } = useParams();

  const [errors, setErrors] = useState({});

  const fieldRefs = Object.fromEntries(
    fields.map((field) => [field, createRef()])
  );

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

    if (!formData.certification || formData.certification[0] == "")
      newErrors.certification = "Please enter your certifications!";

    if (!formData.aboutMe) newErrors.aboutMe = "Please enter your about me!";

    if (!formData.programmingLanguage)
      newErrors.programmingLanguage =
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

  const createUpdateProfile = async () => {
    var isValid = validate();

    if (isValid) {
      onSubmit();
    }
  };

  const handleOnClickSkip = () => {
    onSkip();
  };

  return (
    // Edit Mode
    <Stack className="flex flex-1 items-start justify-start py-4 space-y-10 w-full">
      <Stack className="flex items-start justify-start space-y-6 w-full">
        {/* Full Name */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("fullName").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("fullName").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("fullName").key]}
          label={EMPLOYEE_DETAILS.get("fullName").label}
          name={EMPLOYEE_DETAILS.get("fullName").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("fullName").key]}
        />

        {/* Job Title */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("jobTitle").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("jobTitle").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("jobTitle").key]}
          label={EMPLOYEE_DETAILS.get("jobTitle").label}
          name={EMPLOYEE_DETAILS.get("jobTitle").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("jobTitle").key]}
        />

        {/* Current Company */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("currentCompany").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("currentCompany").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("currentCompany").key]}
          label={EMPLOYEE_DETAILS.get("currentCompany").label}
          name={EMPLOYEE_DETAILS.get("currentCompany").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("currentCompany").key]}
        />

        {/* Experience */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("experience").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("experience").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("experience").key]}
          label={EMPLOYEE_DETAILS.get("experience").label}
          name={EMPLOYEE_DETAILS.get("experience").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("experience").key]}
        />

        {/* Location */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("location").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("location").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("location").key]}
          label={EMPLOYEE_DETAILS.get("location").label}
          name={EMPLOYEE_DETAILS.get("location").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("location").key]}
        />

        <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full">
          {/* Email */}
          <TextField
            error={!!errors[EMPLOYEE_DETAILS.get("email").key]}
            fullWidth
            helperText={errors[EMPLOYEE_DETAILS.get("email").key]}
            inputRef={fieldRefs[EMPLOYEE_DETAILS.get("email").key]}
            label={EMPLOYEE_DETAILS.get("email").label}
            name={EMPLOYEE_DETAILS.get("email").key}
            onChange={handleChange}
            size="small"
            value={formData?.[EMPLOYEE_DETAILS.get("email").key]}
          />

          {/* Phone */}
          <TextField
            error={!!errors[EMPLOYEE_DETAILS.get("phone").key]}
            fullWidth
            helperText={errors[EMPLOYEE_DETAILS.get("phone").key]}
            inputRef={fieldRefs[EMPLOYEE_DETAILS.get("phone").key]}
            label={EMPLOYEE_DETAILS.get("phone").label}
            name={EMPLOYEE_DETAILS.get("phone").key}
            onChange={handleChange}
            size="small"
            value={formData?.[EMPLOYEE_DETAILS.get("phone").key]}
          />
        </Box>

        {/* About Me */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("aboutMe").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("aboutMe").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("aboutMe").key]}
          label={EMPLOYEE_DETAILS.get("aboutMe").label}
          multiline
          name={EMPLOYEE_DETAILS.get("aboutMe").key}
          onChange={handleChange}
          rows={3}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("aboutMe").key]}
        />

        {/* Programming Languages */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("programmingLanguages").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("programmingLanguages").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("programmingLanguages").key]}
          label={EMPLOYEE_DETAILS.get("programmingLanguages").label}
          name={EMPLOYEE_DETAILS.get("programmingLanguages").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("programmingLanguages").key]}
        />

        {/* Skill Set */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("skillSet").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("skillSet").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("skillSet").key]}
          label={EMPLOYEE_DETAILS.get("skillSet").label}
          name={EMPLOYEE_DETAILS.get("skillSet").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("skillSet").key]}
        />

        {/* Education */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("education").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("education").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("education").key]}
          label={EMPLOYEE_DETAILS.get("education").label}
          name={EMPLOYEE_DETAILS.get("education").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("education").key]}
        />

        {/* Certifications */}
        <TextField
          error={!!errors[EMPLOYEE_DETAILS.get("certifications").key]}
          fullWidth
          helperText={errors[EMPLOYEE_DETAILS.get("certifications").key]}
          inputRef={fieldRefs[EMPLOYEE_DETAILS.get("certifications").key]}
          label={EMPLOYEE_DETAILS.get("certifications").label}
          name={EMPLOYEE_DETAILS.get("certifications").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYEE_DETAILS.get("certifications").key]}
        />
      </Stack>

      <Box className="flex items-center justify-end space-x-2 w-full">
        <Button
          className="btn btn-primary"
          disabled={loading.isOpen}
          onClick={createUpdateProfile}
        >
          {id ? "Save" : "Create Profile"}
        </Button>
      </Box>
    </Stack>
  );
};

export default EmployeeForm;
