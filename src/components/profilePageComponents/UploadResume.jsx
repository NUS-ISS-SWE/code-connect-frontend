import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import {
  deleteEmployeeResume,
  retrieveEmployeeResume,
  uploadEmployeeResume,
} from "../../api/EmployeeProfilesApi";
import Icon from "../../constants/Icon";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const UploadResume = () => {
  const {
    state: { loading, profileResume },
    dispatch,
  } = useGlobalContext();

  const fetchResume = async () => {
    const { data, status } = await retrieveEmployeeResume(dispatch);

    if (status === 200) {
      dispatch({
        type: "PROFILE_RESUME",
        payload: data,
      });
    }
  };

  const handleRemoveResume = async () => {
    const { status } = await deleteEmployeeResume(dispatch);

    if (status === 204) {
      dispatch({
        type: "PROFILE_RESUME",
        payload: "",
      });

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: "Resume deleted.",
          isOpen: true,
          variant: "success",
        },
      });
    }
  };

  const handleAddResume = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const { status } = await uploadEmployeeResume(file, dispatch);

      if (status === 200) {
        fetchResume();

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
  };

  return (
    <Stack className="flex flex-1 items-start justify-start py-4 space-y-10 w-full">
      {profileResume ? (
        <Stack className="flex justify-start space-y-1 w-[100%]">
          <Box className="flex items-center justify-start relative space-x-2 !text-sm text-gray-500 w-[100%]">
            <Icon name="File" size={"1.1rem"} />

            <Typography
              className={`!text-sm text-gray-700`}
              // className={`!text-sm text-accent hover:underline`}
            >
              {profileResume?.resumeFileName}
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
