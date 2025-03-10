import { apiWrapper } from "../utils/apiUtils";

const getJobById = async ({ id }, dispatch) => {
  try {
    const url = `/jobs/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        //Authorization: `Basic ${credentials}`, // Attach Basic Auth
        //"Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get profile");
    }

    return { data: response, error: "", status: response.status };
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

    return { data: null, error: error.message, status: 500 };
  }
};

const createJob = async (formData, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: "/jobs",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

// const uploadProfilePicture = async (file, id, dispatch) => {
// const formData = new FormData();
// formData.append("file", file);

// try {
//     const response = await apiWrapper({
//       body: formData,
//       dispatch,
//       endpoint: `/profiles/${id}/profilePicture`, // API endpoint for image upload
//       headers: {
//       },
//       method: "POST",
//     });

//     return { data: response?.data?.profilePicture, error: "", status: response.status };
//   } catch (error) {
//     console.error("Error uploading profile picture:", error);
//     return null;
//   } 
// }  

const updateJob = async (formData, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `/jobs/${formData.id}`, // Update specific profile by ID
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT", // Use PUT instead of POST for updates
  });

  return response;
};

// const deleteResume = async ({ id }, dispatch) => {
//   const response = await apiWrapper({
//     dispatch,
//     endpoint: `/profiles/${id}/deleteResume`,
//     method: "DELETE",
//   });

//   return response;
// };

// const retrieveResume = async ({ id, fileName }, dispatch) => {
//   try {
//     const response = await fetch(`/profiles/${id}/resume`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const blob = await response.blob();
//     const file = new File([blob], fileName || "Resume.pdf", {
//       type: "application/pdf",
//     });
//     const fileUrl = URL.createObjectURL(file);

//     return { data: { file, fileUrl }, error: "", status: response.status };
//   } catch (error) {
//     console.error("Error:", error);

//     dispatch({
//       type: "SHOW_TOAST",
//       payload: {
//         message: String(error),
//         isOpen: true,
//         variant: "error",
//       },
//     });

//     return { data: null, error: error, status: {} };
//   }
// };

// const uploadResume = async ({ id, formData }, dispatch) => {
//   const response = await apiWrapper({
//     body: formData,
//     dispatch,
//     endpoint: `/profiles/${id}/uploadResume`,
//     method: "POST",
//   });

//   return response;
// };

export {
  // deleteResume,
  getJobById,
  updateJob,
  createJob,
  // retrieveResume,
  // uploadResume,
  // uploadProfilePicture
};
