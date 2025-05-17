/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

import EmployeeTable from "../components/userManagementPageComponents/EmployeeTable";
import EmployerTable from "../components/userManagementPageComponents/EmployerTable";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { retrieveAllEmployees, retrieveAllEmployers } from "../api/AdminApi";
import { useGlobalContext } from "../hooks/useGlobalContext";

const TABS = new Map([
  [
    "employer",
    {
      value: 0,
      label: "Employers",
    },
  ],
  [
    "employee",
    {
      value: 1,
      label: "Employees",
    },
  ],
]);

const UserManagementPage = () => {
  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const [employerData, setEmployerData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [tabIndex, setTabIndex] = useState(Array.from(TABS.values())[0].value);

  useEffect(() => {
    fetchAllUserAccounts();
  }, []);

  const fetchAllUserAccounts = async () => {
    const response = await Promise.allSettled([
      fetchAllEmployers(),
      fetchAllEmployees(),
    ]);

    for (const resp of response) {
      if (resp.status === "fulfilled") {
        console.log(
          `Retrieved ${resp.value.role} accounts successfully.`,
          resp
        );
      } else {
        console.error(
          `Failed to retrieved ${resp.reason.role} accounts.`,
          resp
        );
      }
    }
  };

  const fetchAllEmployees = async () => {
    const { data, status, ...rest } = await retrieveAllEmployees(dispatch);

    if (status === 200) {
      setEmployeeData(data);

      return { role: "employee", data, status, ...rest };
    }
  };

  const fetchAllEmployers = async () => {
    const { data, status, ...rest } = await retrieveAllEmployers(dispatch);

    if (status === 200) {
      setEmployerData(data);
      return { role: "employer", data, status, ...rest };
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-12 w-[95vw] lg:w-[70vw]">
        <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Box className="flex items-center justify-start w-full">
              <Typography className="!font-medium flex-1 text-left !text-2xl">
                Manage Users
              </Typography>
            </Box>

            <Divider flexItem />
          </Stack>

          <Stack className="!border-b !border-gray-300 !border-solid w-[100%]">
            <Tabs value={tabIndex} onChange={handleTabChange}>
              {Array.from(TABS).map(([key, value], index) => (
                <Tab className="!capitalize" key={index} label={value.label} />
              ))}
            </Tabs>
          </Stack>

          {tabIndex === TABS.get("employer").value && (
            <EmployerTable data={employerData} />
          )}

          {tabIndex === TABS.get("employee").value && (
            <EmployeeTable data={employeeData} />
          )}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default UserManagementPage;
