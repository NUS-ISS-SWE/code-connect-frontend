import {
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

import { createJob, updateJob } from "../../api/JobApi";

const EditJob = ({formData, fieldRefs, setFormData, setLoading, dispatch }) => {
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const createUpdateJob = async () => {
      setLoading(true);
  
      formData.postedDate = date.toISOString();
      const { data, error } = await createJob({ ...formData }, dispatch);
  
    if (error) {
      console.error(`Error creating job:`, error);
      return;
    }
  
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: `Job created successfully`,
        isOpen: true,
        variant: "success",
      },
    });
  
      setLoading(false);
    };

return (
<Stack className="flex items-start justify-start py-4 space-y-4 w-full">
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
      size="large"
      fullWidth
      label="Company Description"
      name="companyDescription"
      error={!!errors.companyDescription}
      helperText={errors.companyDescription}
      inputRef={fieldRefs.companyDescription}
      value={formData?.companyDescription}
      onChange={handleChange}
    />
    <TextField
      size="small"
      fullWidth
      label="Salary Range"
      name="salaryRange"
      error={!!errors.salaryRange}
      helperText={errors.salaryRange}
      inputRef={fieldRefs.salaryRange}
      value={formData?.salaryRange}
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
    <FormControl fullWidth size="small" error={!!errors.jobType}>
      <InputLabel id="job-type-label">Job Type</InputLabel>
      <Select
        labelId="job-type-label"
        name="jobType"
        value={formData?.jobType}
        onChange={handleChange}
        inputRef={fieldRefs.jobType}
      >
        {["Full-time", "Part-time", "Contract", "Temporary", "Internship", "Remote"].map((jobType) => (
          <MenuItem key={jobType} value={jobType}>
            {jobType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      size="small"
      fullWidth
      label="Location"
      name="jobLocation"
      error={!!errors.jobLocation}
      helperText={errors.jobLocation}
      inputRef={fieldRefs.jobLocation}
      value={formData?.jobLocation}
      onChange={handleChange}
    />
    <TextField
      size="large"
      fullWidth
      label="Job Description"
      name="jobDescription"
      error={!!errors.jobDescription}
      helperText={errors.jobDescription}
      inputRef={fieldRefs.jobDescription}
      value={formData?.jobDescription}
      onChange={handleChange}
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
    <Button
      variant="contained"
      color="primary"
      onClick={createUpdateJob}>
      Create Job
    </Button>
  </Stack>
)
};

export default EditJob;