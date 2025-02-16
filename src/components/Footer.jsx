/* eslint-disable react/jsx-no-undef */

const Footer = () => {
  return (
    <Box className="bg-white !border-t !border-gray-300 !border-solid flex justify-start w-full">
      <Box className="flex items-center justify-center mx-auto max-w-7xl space-x-3 !px-3 lg:!px-0 !py-3 lg:!py-4 w-full">
        <Box className="flex w-fit">
          <Typography className="!text-xs text-gray-500">
            {`Copyright ${new Date().getFullYear()} © CodeConnect. All Rights
            Reserved.`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
