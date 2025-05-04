/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { Table } from "rsuite";

import { activateEmployerAccount } from "../../api/AdminApi";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ACCOUNT_STATUS } from "../../constants/accountStatus";

const { Column, HeaderCell, Cell } = Table;

const EmployerTable = ({ data }) => {
  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const activateUser = async (username) => {
    const { status } = await activateEmployerAccount({ username }, dispatch);

    if (status === 200) {
      alert("Activation email has been sent to the user.");
    }
  };

  return data.length > 0 ? (
    <Table height={420} data={data} loading={loading.isOpen}>
      <Column fixed width={50}>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column resizable width={100}>
        <HeaderCell>Username</HeaderCell>
        <Cell dataKey="username" />
      </Column>

      <Column flexGrow={1} resizable>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column resizable width={120}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>

      <Column resizable width={100}>
        <HeaderCell>Industry</HeaderCell>
        <Cell dataKey="industry" />
      </Column>

      <Column align="center" resizable width={100}>
        <HeaderCell>Status</HeaderCell>

        <Cell>
          {(rowData) => {
            if (rowData.status === ACCOUNT_STATUS.get("active").value) {
              return ACCOUNT_STATUS.get("active").label;
            } else {
              return (
                <Button
                  className="btn-primary !capitalize !mt-[-7px] !py-1"
                  onClick={() => activateUser(rowData.username)}
                >
                  {ACCOUNT_STATUS.get("pending").label}
                </Button>
              );
            }
          }}
        </Cell>
      </Column>

      {/* <Column width={80} fixed="right">
        <HeaderCell></HeaderCell>

        <Cell style={{ padding: "6px" }}>
          {(rowData) => (
            <Button
              className="!capitalize !text-error"
              onClick={() => alert(`id:${rowData.id}`)}
            >
              Delete
            </Button>
          )}
        </Cell>
      </Column> */}
    </Table>
  ) : (
    <Box className="bg-gray-100 !border !border-gray-300 !border-solid py-2 flex items-center justify-start min-h-[70px] p-3 rounded-md w-full">
      <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
        No records found
      </Typography>
    </Box>
  );
};

export default EmployerTable;
