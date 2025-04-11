/* eslint-disable react/prop-types */
import { Stack, TextField, Button, Box } from "@mui/material";
import { createRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { COMPANY_DETAILS } from "../../constants/companyDetails";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import paths from "../../routes/paths";

const EmployerForm = () => {
  const fields = Array.from(COMPANY_DETAILS).map(([key, value]) => value.key);

  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map((key) => [key, ""]))
  );
  const [errors, setErrors] = useState({});

  const fieldRefs = Object.fromEntries(
    fields.map((field) => [field, createRef()])
  );

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName)
      newErrors.companyName = "This field is required!";

    if (!formData.companyEmail)
      newErrors.companyEmail = "This field is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.companyEmail))
      newErrors.companyEmail = "Invalid email format";

    setErrors(newErrors);

    return Object.keys(newErrors)[0];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnClickSubmit = async () => {
    const firstErrorField = validate();

    if (!firstErrorField) {
      // TODO: Integrate with API to create / update company profile
    }
  };

  const handleOnClickSkip = () => {
    navigate(paths.get("PROFILE").PATH);
  };

  return (
    <Stack className="flex flex-1 items-start justify-start py-4 space-y-10 w-full">
      <Stack className="flex items-start justify-start space-y-6 w-full">
        {/* Company Name */}
        <TextField
          error={!!errors[COMPANY_DETAILS.get("companyName").key]}
          fullWidth
          helperText={errors[COMPANY_DETAILS.get("companyName").key]}
          inputRef={fieldRefs[COMPANY_DETAILS.get("companyName").key]}
          label={COMPANY_DETAILS.get("companyName").label}
          name={COMPANY_DETAILS.get("companyName").key}
          onChange={handleChange}
          size="small"
          value={formData?.[COMPANY_DETAILS.get("companyName").key]}
        />

        {/* Company Description */}
        <TextField
          error={!!errors[COMPANY_DETAILS.get("companyDescription").key]}
          fullWidth
          helperText={errors[COMPANY_DETAILS.get("companyDescription").key]}
          inputRef={fieldRefs[COMPANY_DETAILS.get("companyDescription").key]}
          label={COMPANY_DETAILS.get("companyDescription").label}
          multiline
          name={COMPANY_DETAILS.get("companyDescription").key}
          onChange={handleChange}
          rows={3}
          size="small"
          value={formData?.[COMPANY_DETAILS.get("companyDescription").key]}
        />

        <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full">
          {/* Company Email */}
          <TextField
            error={!!errors[COMPANY_DETAILS.get("companyEmail").key]}
            fullWidth
            helperText={errors[COMPANY_DETAILS.get("companyEmail").key]}
            inputRef={fieldRefs[COMPANY_DETAILS.get("companyEmail").key]}
            label={COMPANY_DETAILS.get("companyEmail").label}
            name={COMPANY_DETAILS.get("companyEmail").key}
            onChange={handleChange}
            size="small"
            type="email"
            value={formData?.[COMPANY_DETAILS.get("companyEmail").key]}
          />

          {/* Company Phone */}
          <TextField
            error={!!errors[COMPANY_DETAILS.get("companyPhone").key]}
            fullWidth
            helperText={errors[COMPANY_DETAILS.get("companyPhone").key]}
            inputRef={fieldRefs[COMPANY_DETAILS.get("companyPhone").key]}
            label={COMPANY_DETAILS.get("companyPhone").label}
            name={COMPANY_DETAILS.get("companyPhone").key}
            onChange={handleChange}
            size="small"
            value={formData?.[COMPANY_DETAILS.get("companyPhone").key]}
          />
        </Box>

        {/* Company Location */}
        <TextField
          error={!!errors[COMPANY_DETAILS.get("companyLocation").key]}
          fullWidth
          helperText={errors[COMPANY_DETAILS.get("companyLocation").key]}
          inputRef={fieldRefs[COMPANY_DETAILS.get("companyLocation").key]}
          label={COMPANY_DETAILS.get("companyLocation").label}
          name={COMPANY_DETAILS.get("companyLocation").key}
          onChange={handleChange}
          size="small"
          value={formData?.[COMPANY_DETAILS.get("companyLocation").key]}
        />

        {/* Company Size */}
        <TextField
          error={!!errors[COMPANY_DETAILS.get("companySize").key]}
          fullWidth
          helperText={errors[COMPANY_DETAILS.get("companySize").key]}
          inputRef={fieldRefs[COMPANY_DETAILS.get("companySize").key]}
          label={COMPANY_DETAILS.get("companySize").label}
          name={COMPANY_DETAILS.get("companySize").key}
          onChange={handleChange}
          size="small"
          value={formData?.[COMPANY_DETAILS.get("companySize").key]}
        />
      </Stack>

      <Box className="flex items-center justify-end space-x-2 w-full">
        {!id && (
          <Button
            className="btn"
            disabled={loading.isOpen}
            onClick={handleOnClickSkip}
          >
            Skip this step
          </Button>
        )}

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
