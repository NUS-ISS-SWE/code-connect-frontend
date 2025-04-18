/* eslint-disable react/prop-types */
import {
  Button,
  Divider,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { createJob } from "../../api/JobPostingsApi";
import Icon from "../../constants/Icon";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import paths from "../../routes/paths";
import {
  JOB_TYPES_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
} from "../../utils/filterOptionsUtils";
import { deleteJob } from "../../api/JobPostingsApi";

const EditJob = ({ formData, fieldRefs, setFormData }) => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  let navigate = useNavigate();
  const { jobId } = useParams();

  const [errors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const deleteJobListing = async () => {
    const { status } = await deleteJob(jobId, dispatch);
    if (status === 204) {
      navigate(paths.get("JOBS_MANAGEMENT").PATH);

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: `Job deleted successfully`,
          isOpen: true,
          variant: "success",
        },
      });
    }
  };

  const createUpdateJob = async () => {
    const { data, status } = await createJob(formData, dispatch);

    if (status === 200) {
      navigate(`${paths.get("JOB").PATH}/${data.id}`);

      dispatch({
        type: "JOB_DETAILS",
        payload: data,
      });

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
    <Stack className="space-y-2 w-full">
      <Stack className="px-3 py-2 space-y-1">
        <Typography className="!font-semibold text-left !text-3xl">
          {jobId ? formData?.jobTitle : "Create Job"}
        </Typography>

        {jobId && (
          <Box className="flex items-center justify-start space-x-1">
            <Typography className="!font-medium !text-gray-900 !text-xs">
              {`Created on: ${new Date(
                formData?.postedDate
              ).toLocaleDateString()}`}
            </Typography>

            <Icon name={"Dot"} size={"1em"} />

            <Typography className="!font-medium !text-gray-900 !text-xs">
              {`Last edited: ${new Date(
                formData?.postedDate
              ).toLocaleDateString()}`}
            </Typography>
          </Box>
        )}
      </Stack>

      <Divider flexItem />

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

        <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full">
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
              className="btn btn-secondary !text-error"
              disabled={loading.isOpen}
              onClick={deleteJobListing}
            >
              Delete
            </Button>

            <Button
              className="btn btn-primary"
              disabled={loading.isOpen}
              onClick={createUpdateJob}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Button
            className="btn btn-primary self-end"
            disabled={loading.isOpen}
            onClick={createUpdateJob}
          >
            Create Job
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default EditJob;
