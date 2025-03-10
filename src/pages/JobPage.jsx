/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { getJobById, createJob, updateJob } from "../api/JobApi";

const JobPage = () => {
  const { state, dispatch } = useGlobalContext();
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const fieldRefs = {
    jobTitle: useRef(null),
  };
  const [formData, setFormData] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUpdateJob = async () => {
    setLoading(true);

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

  //Account for thumbnail and numberApplied for viewing?

  return (
    <Stack className="bg-gray-100 flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />
      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          Create Job
        </Typography>
        <Divider flexItem />
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          <b>{formData?.jobTitle}</b>
        </Typography>
        <Typography variant="h8" sx={{ textAlign: "left" }}>
          Posted On: {date.toLocaleDateString()}
        </Typography>
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
      </Stack>
      <Footer />
    </Stack>
  );
};

export default JobPage;
