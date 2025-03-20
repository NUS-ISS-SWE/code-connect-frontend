/* eslint-disable react/prop-types */
import { FaHome } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdEmail, MdPeopleAlt, MdSettings } from "react-icons/md";
import {
  RiAddFill,
  RiAiGenerate2,
  RiAiGenerateText,
  RiArrowDownSFill,
  RiArrowRightSFill,
  RiBarChartFill,
  RiBriefcase4Fill,
  RiCloseFill,
  RiEyeLine,
  RiEyeOffLine,
  RiFile3Fill,
  RiLockLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiShakeHandsFill,
  RiSearchLine,
  RiSettings3Line,
  RiToolsFill,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import { RxDotFilled } from "react-icons/rx";

const ICONS_MAP = {
  Add: RiAddFill,
  AiGenerate: RiAiGenerate2,
  AiGenerateText: RiAiGenerateText,
  ArrowDown: RiArrowDownSFill,
  ArrowLeftCircle: IoIosArrowDropleftCircle,
  ArrowRight: RiArrowRightSFill,
  BarChart: RiBarChartFill,
  Briefcase: RiBriefcase4Fill,
  Cog: MdSettings,
  Close: RiCloseFill,
  Dot: RxDotFilled,
  Email: MdEmail,
  Eye: RiEyeLine,
  EyeOff: RiEyeOffLine,
  File: RiFile3Fill,
  Home: FaHome,
  Lock: RiLockLine,
  Logout: RiLogoutBoxLine,
  Menu: RiMenuLine,
  People: MdPeopleAlt,
  Search: RiSearchLine,
  Settings: RiSettings3Line,
  ShakeHands: RiShakeHandsFill,
  Tools: RiToolsFill,
  User: RiUserFill,
  UserLine: RiUserLine,
};

const Icon = ({ name, size = 24, color = "inherit", ...props }) => {
  const SelectedIcon = ICONS_MAP[name];

  if (!SelectedIcon) {
    console.error(`Icon "${name}" does not exist in the Icons map.`);
    return null;
  }

  return <SelectedIcon size={size} color={color} {...props} />;
};

export default Icon;
