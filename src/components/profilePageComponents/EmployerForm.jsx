/* eslint-disable react/prop-types */
import { Stack, TextField, Button, Box } from "@mui/material";
import { createRef } from "react";
import { useParams } from "react-router-dom";

import { EMPLOYER_DETAILS } from "../../constants/employerDetails";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const EmployerForm = ({ fields, formData, onSkip, onSubmit, setFormData }) => {
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

    if (!formData.companyName)
      newErrors.companyName = "This field is required!";

    // if (!formData.companyEmail)
    //   newErrors.companyEmail = "This field is required!";
    // else if (!/\S+@\S+\.\S+/.test(formData.companyEmail))
    //   newErrors.companyEmail = "Invalid email format";

    setErrors(newErrors);

    return Object.keys(newErrors)[0];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnClickSubmit = async () => {
    const firstErrorField = validate();

    if (!firstErrorField) {
      onSubmit();
    }
  };

  const handleOnClickSkip = () => {
    onSkip();
  };

  return (
    <Stack className="flex flex-1 items-start justify-start py-4 space-y-10 w-full">
      <Stack className="flex items-start justify-start space-y-6 w-full">
        {/* Company Name */}
        <TextField
          error={!!errors[EMPLOYER_DETAILS.get("companyName").key]}
          fullWidth
          helperText={errors[EMPLOYER_DETAILS.get("companyName").key]}
          inputRef={fieldRefs[EMPLOYER_DETAILS.get("companyName").key]}
          label={EMPLOYER_DETAILS.get("companyName").label}
          name={EMPLOYER_DETAILS.get("companyName").key}
          onChange={handleChange}
          size="small"
          value={formData?.[EMPLOYER_DETAILS.get("companyName").key]}
        />

        {/* Company Description */}
        <TextField
          error={!!errors[EMPLOYER_DETAILS.get("companyDescription").key]}
          fullWidth
          helperText={errors[EMPLOYER_DETAILS.get("companyDescription").key]}
          inputRef={fieldRefs[EMPLOYER_DETAILS.get("companyDescription").key]}
          label={EMPLOYER_DETAILS.get("companyDescription").label}
          multiline
          name={EMPLOYER_DETAILS.get("companyDescription").key}
          onChange={handleChange}
          rows={3}
          size="small"
          value={formData?.[EMPLOYER_DETAILS.get("companyDescription").key]}
        />

        {/* <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full"> */}
        {/* Company Email */}
        {/* <TextField
            error={!!errors[EMPLOYER_DETAILS.get("companyEmail").key]}
            fullWidth
            helperText={errors[EMPLOYER_DETAILS.get("companyEmail").key]}
            inputRef={fieldRefs[EMPLOYER_DETAILS.get("companyEmail").key]}
            label={EMPLOYER_DETAILS.get("companyEmail").label}
            name={EMPLOYER_DETAILS.get("companyEmail").key}
            onChange={handleChange}
            size="small"
            type="email"
            value={formData?.[EMPLOYER_DETAILS.get("companyEmail").key]}
          /> */}

        {/* Company Phone */}
        {/* <TextField
            error={!!errors[EMPLOYER_DETAILS.get("companyPhone").key]}
            fullWidth
            helperText={errors[EMPLOYER_DETAILS.get("companyPhone").key]}
            inputRef={fieldRefs[EMPLOYER_DETAILS.get("companyPhone").key]}
            label={EMPLOYER_DETAILS.get("companyPhone").label}
            name={EMPLOYER_DETAILS.get("companyPhone").key}
            onChange={handleChange}
            size="small"
            value={formData?.[EMPLOYER_DETAILS.get("companyPhone").key]}
          /> */}
        {/* </Box> */}

        <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full">
          {/* Company Location */}
          <TextField
            error={!!errors[EMPLOYER_DETAILS.get("companyLocation").key]}
            fullWidth
            helperText={errors[EMPLOYER_DETAILS.get("companyLocation").key]}
            inputRef={fieldRefs[EMPLOYER_DETAILS.get("companyLocation").key]}
            label={EMPLOYER_DETAILS.get("companyLocation").label}
            name={EMPLOYER_DETAILS.get("companyLocation").key}
            onChange={handleChange}
            size="small"
            value={formData?.[EMPLOYER_DETAILS.get("companyLocation").key]}
          />

          {/* Company Industry */}
          <TextField
            error={!!errors[EMPLOYER_DETAILS.get("companyIndustry").key]}
            fullWidth
            helperText={errors[EMPLOYER_DETAILS.get("companyIndustry").key]}
            inputRef={fieldRefs[EMPLOYER_DETAILS.get("companyIndustry").key]}
            label={EMPLOYER_DETAILS.get("companyIndustry").label}
            name={EMPLOYER_DETAILS.get("companyIndustry").key}
            onChange={handleChange}
            size="small"
            value={formData?.[EMPLOYER_DETAILS.get("companyIndustry").key]}
          />
        </Box>

        {/* Company Size */}
        <TextField
          error={!!errors[EMPLOYER_DETAILS.get("companySize").key]}
          fullWidth
          helperText={errors[EMPLOYER_DETAILS.get("companySize").key]}
          inputRef={fieldRefs[EMPLOYER_DETAILS.get("companySize").key]}
          label={EMPLOYER_DETAILS.get("companySize").label}
          name={EMPLOYER_DETAILS.get("companySize").key}
          onChange={handleChange}
          size="small"
          type="number"
          value={formData?.[EMPLOYER_DETAILS.get("companySize").key]}
        />
      </Stack>

      <Box className="flex items-center justify-end space-x-2 w-full">
        {/* {!id && (
          <Button
            className="btn"
            disabled={loading.isOpen}
            onClick={handleOnClickSkip}
          >
            Skip this step
          </Button>
        )} */}

        <Button
          className="btn btn-primary"
          disabled={loading.isOpen}
          onClick={handleOnClickSubmit}
        >
          {id ? "Save" : "Continue"}
        </Button>
      </Box>
    </Stack>
  );
};

export default EmployerForm;
