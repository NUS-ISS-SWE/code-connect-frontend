import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { intervalToDuration } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { retrieveJob } from "../api/JobPostingsApi";
import dummyThumbnail from "../assets/dummy/dummy_icon_1.png";
import Icon from "../constants/Icon";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";
import { renderIntervalDuration } from "../utils/stringUtils";

const JOB_APPLY_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "resume",
  "education",
  "certifications",
  "coverLetter",
];

const JobApplyPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const { user } = useAuthContext();
  let navigate = useNavigate();
  const { jobId } = useParams();

  const [formData, setFormData] = useState(
    Object.fromEntries(JOB_APPLY_FIELDS.map((key) => [key, user[key] ?? ""]))
  );
  const [errors, setErrors] = useState({});
  const [jobData, setJobData] = useState({});

  const fieldRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    resume: useRef(null),
    education: useRef(null),
    certifications: useRef(null),
    coverLetter: useRef(null),
  };

  useEffect(() => {
    if (!jobId) {
      // If no ID is provided, show an empty form for creating a profile
      setJobData({});

      return;
    }

    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      setJobData(data);
    } else {
      navigate(paths.get("HOME").PATH);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddResume = async (event) => {
    setErrors({ ...errors, resume: null });
    const file = event.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        resume: {
          file: file,
          fileUrl: URL.createObjectURL(file),
        },
      });
    }
  };

  const handleRemoveResume = () => {
    setFormData({ ...formData, resume: null });
    setErrors({ ...errors, resume: null });
  };

  const handleSubmitApplication = async () => {
    const firstErrorField = validate();

    if (!firstErrorField) {
      // TODO: Integrate with API to submit application
      // const { data, status } = await submitApplication(formData, dispatch);
      // if (status === 200) {
      // navigate(`${paths.get("JOBAPPLICATIONS").PATH}`);
      // }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "This field is required!";
    if (!formData.lastName) newErrors.lastName = "This field is required!";

    if (!formData.email) newErrors.email = "This field is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    const sgPhonePattern =
      /^(?:\+65\s?)?(?:6\d{7}|8\d{7}|9\d{7}|1800\d{6}|800\d{7})$/;
    if (!formData.phone) newErrors.phone = "This field is required!";
    else if (!sgPhonePattern.test(formData.phone))
      newErrors.phone = "Invalid phone number format";

    setErrors(newErrors);

    // Return first key in error object
    return Object.keys(newErrors)[0];
  };

  return (
    <Stack className="bg-gray-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[95vw] lg:w-[70vw]">
        <Stack className="px-0 py-2 space-y-1">
          <Typography className="!font-medium !text-gray-400 !text-xs">
            {`Posted ${renderIntervalDuration(
              jobData.postedDate,
              intervalToDuration
            )}`}
          </Typography>

          <Typography className="!font-semibold text-left !text-3xl">
            {jobData.jobTitle}
          </Typography>

          <Box className="flex items-center justify-start space-x-1">
            <Typography className="!capitalize !font-medium !text-xs">
              {jobData.jobType}
            </Typography>

            <Icon name={"Dot"} size={"1em"} />

            <Typography className="!capitalize !font-medium !text-xs">
              {jobData.jobLocation}
            </Typography>

            <Icon name={"Dot"} size={"1em"} />

            <Typography className="!capitalize !font-medium !text-xs">
              {jobData.salaryRange}
            </Typography>
          </Box>
        </Stack>

        <Divider flexItem />

        <Stack className="flex items-start justify-start py-4 space-y-6 w-full">
          <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full">
            <TextField
              size="small"
              fullWidth
              label="First Name*"
              name="firstName"
              error={errors.firstName}
              helperText={errors.firstName}
              inputRef={fieldRefs.firstName}
              value={formData?.firstName}
              onChange={handleChange}
            />

            <TextField
              size="small"
              fullWidth
              label="Last Name*"
              name="lastName"
              error={errors.lastName}
              helperText={errors.lastName}
              inputRef={fieldRefs.lastName}
              value={formData?.lastName}
              onChange={handleChange}
            />
          </Box>

          <Box className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-2 w-full">
            <TextField
              size="small"
              fullWidth
              label="Email*"
              name="email"
              error={errors.email}
              helperText={errors.email}
              inputRef={fieldRefs.email}
              value={formData?.email}
              onChange={handleChange}
            />

            <TextField
              size="small"
              fullWidth
              label="Phone Number*"
              name="phone"
              error={errors.phone}
              helperText={errors.phone}
              inputRef={fieldRefs.phone}
              value={formData?.phone}
              onChange={handleChange}
            />
          </Box>

          <TextField
            size="small"
            fullWidth
            label="Highest Education"
            name="education"
            error={errors.education}
            helperText={errors.education}
            inputRef={fieldRefs.education}
            value={formData?.education}
            onChange={handleChange}
          />

          <TextField
            size="small"
            fullWidth
            label="Certifications"
            name="certifications"
            error={errors.certifications}
            helperText={errors.certifications}
            inputRef={fieldRefs.certifications}
            value={formData?.certifications}
            onChange={handleChange}
          />

          <TextField
            error={!!errors.coverLetter}
            fullWidth
            helperText={errors.coverLetter}
            inputRef={fieldRefs.coverLetter}
            label="Cover letter"
            multiline
            name="coverLetter"
            onChange={handleChange}
            rows={4}
            size="small"
            value={formData?.coverLetter}
          />

          {formData.resume ? (
            <Stack className="flex justify-start space-y-1 w-[100%]">
              <Box className="bg-gray-100 flex items-center justify-start px-4 py-4 relative space-x-2 !text-sm text-gray-500 w-[100%]">
                <Icon name="File" size={"1.1rem"} />

                <Typography className={`flex-1 !text-sm text-gray-700`}>
                  {`${formData.resume?.file?.name}`}
                </Typography>
                <IconButton
                  className="h-fit !rounded-md"
                  onClick={handleRemoveResume}
                >
                  <Icon name="Close" size={"1.1rem"} />
                </IconButton>
              </Box>
            </Stack>
          ) : (
            <Stack className="flex justify-start space-y-1 w-[100%]">
              <Box
                className="!bg-white !border !border-gray-300 !border-solid  cursor-pointer !duration-500 !ease-in-out !font-normal !flex !gap-2 items-center !justify-start px-4 py-6 !rounded-md !shadow-none !text-sm !text-gray-900 !tracking-normal !transition-all w-[100%] hover:!border-gray-900"
                disabled={loading.isOpen}
                component="label"
              >
                <Stack className="flex flex-col items-center justify-start space-y-5 w-full">
                  <Stack className="flex flex-col items-center justify-start space-y-2 w-full">
                    <Typography className="!font-semibold !text-md text-gray-700">
                      Upload Resume*
                    </Typography>

                    <Button
                      className="btn btn-secondary"
                      disabled={loading.isOpen}
                      component="label"
                    >
                      Choose File
                      <input
                        accept=".pdf"
                        type="file"
                        hidden
                        onChange={handleAddResume}
                      />
                    </Button>
                  </Stack>

                  <Typography className={`!text-xs text-gray-600 `}>
                    Allowed types: pdf.
                  </Typography>
                </Stack>

                <input
                  accept=".pdf"
                  type="file"
                  hidden
                  onChange={handleAddResume}
                />
              </Box>
            </Stack>
          )}
        </Stack>

        <Button
          className="btn btn-primary !px-6 self-end"
          disabled={loading.isOpen}
          onClick={handleSubmitApplication}
        >
          {loading.isOpen ? (
            <CircularProgress size={20} className="!text-black" />
          ) : (
            "Submit"
          )}
        </Button>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default JobApplyPage;
