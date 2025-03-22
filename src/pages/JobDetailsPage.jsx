/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import {
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import EditJob from "../components/jobPageComponents/EditJob";
import ViewJob from "../components/jobPageComponents/ViewJob";
import { GetDataByIdAPI } from "../api/GeneralAPI";

const JobDetailsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { setUser, user } = useAuthContext();
  const { id } = useParams(); // Get profile ID from URL
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const fieldRefs = {
    jobTitle: useRef(null),
  };
  const uri = "jobpostings";
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({

      });
      setLoading(false);
      return;
    }

    fetchJob();
  }, [id]); // Runs when the ID changes
  
  const fetchJob = async () => {
    try {
      const { data, error } = await GetDataByIdAPI(id, uri, dispatch);
      if (error) throw new Error(error);

      const jobData = await data.json();

      setFormData(jobData);
      setUser({ ...user, ...jobData });
    } catch (err) {
      console.error("Error fetching job:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Account for thumbnail and numberApplied for viewing?

  return (
    <Stack className="bg-gray-100 flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />
      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
        <Typography variant="h4" sx={{ textAlign: "left" }}>
        {id ? "View Job" : "Create Job"}
      </Typography>
      <Divider flexItem />
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          <b>{formData?.jobTitle}</b>
        </Typography>
        <Typography variant="h8" sx={{ textAlign: "left" }}>
          <b>Posted On:</b> {formData?.postedDate ? new Date(formData.postedDate).toLocaleDateString() : date.toLocaleDateString()}
        </Typography>
      <Divider flexItem />
      {id ? (
            <ViewJob formData={formData} />
          ) : (
<EditJob formData={formData} fieldRefs={fieldRefs} setFormData={setFormData} setLoading={setLoading} dispatch={dispatch} />
          )}        
      </Stack>
      <Footer />
    </Stack>
  );
};

export default JobDetailsPage;
