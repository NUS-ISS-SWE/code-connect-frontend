/* eslint-disable react-hooks/exhaustive-deps */
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
import { createRef } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import { retrieveJob } from "../../api/JobPostingsApi";
import dummy from "../../assets/dummy/index.js";
import Icon from "../../constants/Icon";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import paths from "../../routes/paths";
import { renderIntervalDuration } from "../../utils/stringUtils";
import { RetrieveResume } from "../../api/ProfileApi";
import {
  createJobApplication,
  retrieveJobApplication,
  deleteJobApplication
} from "../../api/JobApplicationsApi.js";

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
  const { jobDetails, loading } = state;

  const { user } = useAuthContext();
  let navigate = useNavigate();
  const { jobId, applicationId } = useParams();

  const fullName = user?.fullName ?? "";
  const [firstName, ...rest] = fullName.trim().split(" ");
  const lastName = rest.join(" ");

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    resume: "",
    education: user?.education ?? "",
    certifications: user?.certification ?? "",
    coverLetter: "",
  });

  useEffect(() => {
    fetchResume();
    //fetchImage();
  }, [user]);

  const fetchResume = async () => {
    const { data } = await RetrieveResume(
      {
        id: user?.id,
        fileName: user.resumeData?.resumeFileName, // pass uploaded resume file name from user data
      },
      dispatch
    );
    if (data) {
      dispatch({
        type: "PROFILE_RESUME",
        payload: data,
      });
      setFormData((prev) => ({
        ...prev,
        resume: {
          file: data.file,
          fileUrl: data.fileUrl,
        },
      }));
    }
  };

  const fetchJobApplication = async () => {
    const { data, status } = await retrieveJobApplication(
      applicationId,
      dispatch
    );

    if (status === 200) {
      const [firstName, ...rest] = data.applicantName.trim().split(" ");
      const lastName = rest.join(" ");
      
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: data.applicantEmail,
        phone: data.phone,
      }));
    }
  }

  const handleDeleteJobApplication = async () => {
    const data = await deleteJobApplication(
      applicationId,
      dispatch
    );

    if (data.status === 204) {
      navigate(`${paths.get("JOBAPPLICATIONS").PATH}`);
    }
  }

  const [errors, setErrors] = useState({});

  const fieldRefs = Object.fromEntries(
    JOB_APPLY_FIELDS.map((key) => [key, createRef()])
  );

  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      dispatch({
        type: "JOB_DETAILS",
        payload: data,
      });
    } else {
      navigate(paths.get("HOME").PATH);
    }
  };

  useEffect(() => {
    if (!jobDetails || jobDetails?.id !== Number(jobId)) {
      fetchJob();
    }
  }, [jobDetails, jobId]);

  useEffect(() => {
    if (applicationId) {
      fetchJobApplication();
    }
  }, [applicationId]);

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
      formData["status"] = "Applied";
      const { status } = await createJobApplication(jobId, formData, dispatch);
      if (status === 200) {
        navigate(`${paths.get("APPLY_JOB_SUCCESS").PATH}`);
      }
    } else {
      // Scroll to the first error field
      const errorFieldRef = fieldRefs[firstErrorField];
      if (errorFieldRef.current) {
        errorFieldRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
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

    if (!formData.resume) newErrors.resume = "This field is required!";

    setErrors(newErrors);

    // Return first key in error object
    return Object.keys(newErrors)[0];
  };

  return (
    <Stack className="bg-gray-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[95vw] lg:w-[70vw]">
        <Stack className="px-0 py-2 space-y-1">
          <Box className="flex items-center justify-start space-x-1">
            {/* !!!TODO: Add company logo */}
            <Box className="bg-white !border !border-gray-300 !border-solid h-4 min-w-4 overflow-hidden w-4 !rounded-2xl">
              <img
                alt={jobDetails?.companyName}
                src={jobDetails?.companyLogo ?? dummy.jobListings[0].thumbnail}
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>

            <Typography className="!capitalize !font-semibold !text-xs">
              {jobDetails?.companyName}
            </Typography>

            <Icon name={"Dot"} size={"1em"} />

            <Typography className="!font-medium !text-gray-400 !text-xs">
              {`Posted ${renderIntervalDuration(
                jobDetails?.postedDate,
                intervalToDuration
              )}`}
            </Typography>
          </Box>

          <Typography className="!font-semibold text-left !text-3xl">
            {jobDetails?.jobTitle}
          </Typography>

          <Box className="flex items-center justify-start space-x-1">
            <Typography className="!capitalize !font-medium !text-xs">
              {jobDetails?.jobType}
            </Typography>

            <Icon name={"Dot"} size={"1em"} />

            <Typography className="!capitalize !font-medium !text-xs">
              {jobDetails?.jobLocation}
            </Typography>

            <Icon name={"Dot"} size={"1em"} />

            <Typography className="!capitalize !font-medium !text-xs">
              {jobDetails?.salaryRange}
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
              error={!!errors.firstName}
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
              error={!!errors.lastName}
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
              error={!!errors.email}
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
              error={!!errors.phone}
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
            error={!!errors.education}
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
            error={!!errors.certifications}
            helperText={errors.certifications}
            inputRef={fieldRefs.certifications}
            value={formData?.certifications}
            onChange={handleChange}
          />

          {formData.resume ? (
            <Stack className="flex justify-start space-y-1 w-[100%]">
              <Box className="bg-gray-100 border border-gray-300 flex items-center justify-start px-4 py-4 relative !rounded-md space-x-2 !text-sm text-gray-900 w-[100%]">
                <Icon name="File" size={"1.1rem"} />

                <Typography className={`flex-1 !text-sm text-gray-600`}>
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
            <Stack className="flex justify-start space-y-2 w-[100%]">
              <Box
                className={`!bg-white !border ${
                  errors.resume
                    ? "border-error hover:border-error"
                    : "border-gray-300 hover:border-gray-900"
                } !border-solid  cursor-pointer !duration-500 !ease-in-out !font-normal !flex !gap-2 items-center !justify-start px-4 py-7 !rounded-md !shadow-none !text-sm !text-gray-900 !tracking-normal !transition-all w-[100%] `}
                disabled={loading.isOpen}
                ref={fieldRefs.resume}
              >
                <Stack className="flex flex-col items-center justify-start space-y-4 w-full">
                  <Stack className="flex flex-col items-center justify-start space-y-0 w-full">
                    <Typography className="!font-semibold !text-md text-gray-700">
                      Resume*
                    </Typography>
                    <Typography className="!font-regular !text-sm text-gray-500">
                      Upload your resume here
                    </Typography>
                  </Stack>

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

                  <Typography className={`!text-xs text-gray-500 `}>
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
              <Typography className="!font-regular px-4 !text-xs text-error">
                {errors.resume}
              </Typography>
            </Stack>
          )}

          <TextField
            error={!!errors.coverLetter}
            fullWidth
            helperText={errors.coverLetter}
            inputRef={fieldRefs.coverLetter}
            label="Cover letter"
            multiline
            name="coverLetter"
            onChange={handleChange}
            rows={5}
            size="small"
            value={formData?.coverLetter}
          />
        </Stack>

{
  !applicationId && 
  <Button
  className="btn btn-primary !px-6 self-end !w-full lg:!w-fit"
  disabled={loading.isOpen}
  onClick={handleSubmitApplication}
>
  {loading.isOpen ? (
    <CircularProgress size={20} className="!text-black" />
  ) : (
    "Submit"
  )}
</Button>
}
{
  applicationId && 
  <Button
  className="btn btn-secondary !text-error"
  disabled={loading.isOpen}
  //TODO: Delete job application API
  onClick={handleDeleteJobApplication}
>
  {loading.isOpen ? (
    <CircularProgress size={20} className="!text-black" />
  ) : (
    "Delete Job Application"
  )}
</Button>
}

      </Stack>
      <Footer />
    </Stack>
  );
};

export default JobApplyPage;
