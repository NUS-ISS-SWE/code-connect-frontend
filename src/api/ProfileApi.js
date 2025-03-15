import { apiWrapper } from "../utils/apiUtils";

const UploadProfilePicture = async (file, id, dispatch) => {
const formData = new FormData();
formData.append("file", file);

try {
    const response = await apiWrapper({
      body: formData,
      dispatch,
      endpoint: `/profiles/${id}/profilePicture`, // API endpoint for image upload
      headers: {
      },
      method: "POST",
    });

    return { data: response?.data?.profilePicture, error: "", status: response.status };
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  } 
}  

const DeleteResume = async ({ id }, dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `/profiles/${id}/deleteResume`,
    method: "DELETE",
  });

  return response;
};

const RetrieveResume = async ({ id, fileName }, dispatch) => {
  try {
    const response = await fetch(`/profiles/${id}/resume`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const file = new File([blob], fileName || "Resume.pdf", {
      type: "application/pdf",
    });
    const fileUrl = URL.createObjectURL(file);

    return { data: { file, fileUrl }, error: "", status: response.status };
  } catch (error) {
    console.error("Error:", error);

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: String(error),
        isOpen: true,
        variant: "error",
      },
    });

    return { data: null, error: error, status: {} };
  }
};

const UploadResumeAPI = async ({ id, formData }, dispatch) => {
  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: `/profiles/${id}/uploadResume`,
    method: "POST",
  });

  return response;
};

export {
  DeleteResume,
  RetrieveResume,
  UploadResumeAPI,
  UploadProfilePicture
};
