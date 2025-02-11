const Tabs = ({ tabOptions }) => {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(
    Array.from(tabOptions).find(
      ([key, value]) => value.path === location.pathname
    )[0]
  );

  return (
    <Box className="flex h-[34px] justify-start !pl-0 !pr-0 space-y-0 relative w-full">
      <Box className="absolute bottom-[-1px]">
        {Array.from(tabOptions).map(([key, value], index) => {
          return (
            <Button
              className={` ${
                currentTab === key
                  ? "!bg-white !border-gray-300 !text-gray-900"
                  : "!border-transparent"
              }
              absolute
              !border-l !border-r !border-t !border-solid
              !capitalize !duration-0 flex !ease-in-out !font-normal gap-x-2 items-center !pb-2 !pl-4 !pr-4 !pt-2 !rounded-none !rounded-tl !rounded-tr !text-sm !text-accent !transition-all`}
              component={Link}
              key={index}
              onClick={() => setCurrentTab(key)}
              to={value.path}
            >
              {value.title}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tabs;
