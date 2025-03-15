import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  deleteResume,
  retrieveResume,
  uploadResume,
} from "../../api/ProfileApi";
import Icon from "../../constants/Icon";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const UploadResume = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const { setUser, user } = useAuthContext();
  const { id } = useParams();

  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (!user) return;

    // fetch resume if user has resume-related data
    if (user.resumeData?.resumeContent) {
      fetchResume();
    } else {
      setResume(null);
    }
  }, [user]);

  const fetchResume = async () => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const { data } = await retrieveResume(
      { id, fileName: user.resumeData?.resumeFileName },
      dispatch
    );

    if (data) {
      setResume(data);
    }

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  const handleRemoveResume = async () => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const { data } = await deleteResume({ id }, dispatch);

    if (data) {
      setResume(null);

      // Update user profile state
      setUser({
        ...user,
        resumeData: { resumeContent: null, resumeFileName: null },
      });

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: "Resume deleted.",
          isOpen: true,
        },
      });
    }

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  const handleAddResume = async (event) => {
    dispatch({ type: "LOADING", payload: { isOpen: true } });

    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file || "");

      const { data, error } = await uploadResume({ id, formData }, dispatch);

      if (data) {
        setResume({
          file: file,
          fileUrl: URL.createObjectURL(file),
        });

        // Update user profile state
        setUser({
          ...user,
          resumeData: {
            resumeContent: "Resume uploaded",
            resumeFileName: file.name,
          },
        });

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: "Resume uploaded successfully",
            isOpen: true,
            variant: "success",
          },
        });
      }
    }

    dispatch({ type: "LOADING", payload: { isOpen: false } });
  };

  return (
    <Stack className="flex justify-start pt-4 space-y-4 w-[100%]">
      <Stack className="space-y-1">
        <Typography className={`!capitalize !font-medium !text-lg`}>
          Upload Resume
        </Typography>

        <Divider />
      </Stack>

      {resume ? (
        <Stack className="flex justify-start space-y-1 w-[100%]">
          <Box className="flex items-center justify-start relative space-x-2 !text-sm text-gray-500 w-[100%]">
            <Icon name="File" size={"1.1rem"} />

            <Typography
              className={`!text-sm text-gray-700`}
              // className={`!text-sm text-accent hover:underline`}
            >
              {`${resume?.file?.name}`}
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
          <Box className="flex justify-start space-x-2 w-[100%]">
            <Box
              className="!bg-white !border !border-gray-300 !border-solid  cursor-pointer !duration-500 !ease-in-out !font-normal !flex !gap-2 items-center !justify-start !pb-0.5 !pl-0.5 !pr-1.5 !pt-0.5 !rounded-md !shadow-none !text-sm !text-gray-900 !tracking-normal !transition-all w-[100%] hover:!border-gray-900"
              disabled={loading.isOpen}
              component="label"
            >
              <Button
                className="!bg-gray-100 !border !border-gray-300 !border-solid !capitalize !duration-500 !ease-in-out !font-semibold !pb-1.5 !pl-3 !pr-3 !pt-1.5 !shadow-none !text-sm !text-gray-900 !tracking-normal !transition-all w-fit hover:!bg-gray-200"
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
              No file chosen
              <input
                accept=".pdf"
                type="file"
                hidden
                onChange={handleAddResume}
              />
            </Box>
          </Box>

          <Typography className={`!text-xs text-gray-700 `}>
            Allowed types: pdf.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default UploadResume;
