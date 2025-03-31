/* eslint-disable react/prop-types */
import {
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { createJob } from "../../api/JobPostingsApi";
import styles from "../../constants/styles";
import paths from "../../routes/paths";
import {
  JOB_TYPES_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
} from "../../utils/filterOptionsUtils";

const EditJob = ({ formData, fieldRefs, setFormData, dispatch }) => {
  let navigate = useNavigate();
  const { jobId } = useParams();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createUpdateJob = async () => {
    const { data, status } = await createJob(formData, dispatch);

    if (status === 200) {
      navigate(`${paths.get("JOB").PATH}/${data.id}`);

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: `Job ${jobId ? "saved" : "created"} successfully`,
          isOpen: true,
          variant: "success",
        },
      });
    }
  };

  return (
    <Stack className="flex items-start justify-start py-4 space-y-6 w-full">
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
        error={!!errors.jobDescription}
        fullWidth
        helperText={errors.jobDescription}
        inputRef={fieldRefs.jobDescription}
        label="Job Description"
        multiline
        name="jobDescription"
        onChange={handleChange}
        rows={3}
        size="small"
        value={formData?.jobDescription}
      />

      <FormControl fullWidth size="small" error={!!errors.jobType}>
        <InputLabel className="bg-white" id="job-type-label">
          Job Type
        </InputLabel>
        <Select
          inputRef={fieldRefs.jobType}
          labelId="job-type-label"
          name="jobType"
          onChange={handleChange}
          value={formData?.jobType ?? ""}
        >
          {JOB_TYPES_FILTER_OPTIONS.map((type, index) => (
            <MenuItem key={index} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" error={!!errors.jobLocation}>
        <InputLabel className="bg-white" id="job-location-label">
          Job Location
        </InputLabel>
        <Select
          inputRef={fieldRefs.jobLocation}
          labelId="job-location-label"
          name="jobLocation"
          onChange={handleChange}
          value={formData?.jobLocation ?? ""}
        >
          {LOCATION_FILTER_OPTIONS.map((location, index) => (
            <MenuItem key={index} value={location.value}>
              {location.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box className="flex items-start justify-start space-x-2 w-full">
        <TextField
          error={!!errors.salaryRangeMin}
          fullWidth
          helperText={errors.salaryRangeMin}
          inputRef={fieldRefs.salaryRangeMin}
          label="Salary Range (Min)"
          name="salaryRangeMin"
          onChange={handleChange}
          size="small"
          type="number"
          value={formData?.salaryRangeMin}
        />

        <TextField
          error={!!errors.salaryRangeMin}
          fullWidth
          helperText={errors.salaryRangeMin}
          inputRef={fieldRefs.salaryRangeMin}
          label="Salary Range (Max)"
          name="salaryRangeMax"
          onChange={handleChange}
          size="small"
          type="number"
          value={formData?.salaryRangeMax}
        />
      </Box>

      <TextField
        size="small"
        fullWidth
        label="Company Name"
        name="companyName"
        error={!!errors.companyName}
        helperText={errors.companyName}
        inputRef={fieldRefs.companyName}
        value={formData?.companyName}
        onChange={handleChange}
      />

      <TextField
        error={!!errors.companyDescription}
        fullWidth
        helperText={errors.companyDescription}
        inputRef={fieldRefs.companyDescription}
        label="Company Description"
        multiline
        name="companyDescription"
        onChange={handleChange}
        rows={3}
        size="small"
        value={formData?.companyDescription}
      />

      <TextField
        size="small"
        fullWidth
        label="Required Skills"
        name="requiredSkills"
        error={!!errors.requiredSkills}
        helperText={errors.requiredSkills}
        inputRef={fieldRefs.requiredSkills}
        value={formData?.requiredSkills}
        onChange={handleChange}
      />

      <TextField
        size="small"
        fullWidth
        label="Preferred Skills"
        name="preferredSkills"
        error={!!errors.preferredSkills}
        helperText={errors.preferredSkills}
        inputRef={fieldRefs.preferredSkills}
        value={formData?.preferredSkills}
        onChange={handleChange}
      />

      <TextField
        size="small"
        fullWidth
        label="Required Certifications"
        name="requiredCertifications"
        error={!!errors.requiredCertifications}
        helperText={errors.requiredCertifications}
        inputRef={fieldRefs.requiredCertifications}
        value={formData?.requiredCertifications}
        onChange={handleChange}
      />

      {jobId ? (
        <Box className="flex items-center justify-end space-x-1 w-full">
          <Button
            className={`${styles.buttonStyles} !bg-gray-100 !font-semibold !text-error !w-fit hover:!bg-gray-200`}
            variant="contained"
            // onClick={deleteJob}
          >
            Delete
          </Button>

          <Button
            className={`${styles.buttonStyles} !bg-primary-main !font-semibold !text-white !w-fit hover:!bg-primary-100`}
            variant="contained"
            onClick={createUpdateJob}
          >
            Save
          </Button>
        </Box>
      ) : (
        <Button
          className={`${styles.buttonStyles} !bg-primary-main !font-semibold self-end !text-white !w-fit hover:!bg-primary-100`}
          variant="contained"
          onClick={createUpdateJob}
        >
          Create Job
        </Button>
      )}
    </Stack>
  );
};

export default EditJob;
