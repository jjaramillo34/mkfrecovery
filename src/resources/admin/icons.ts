import type { IconType } from "react-icons";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineInbox,
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlineFolderOpen,
  HiOutlineHome,
  HiOutlinePhoto,
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineUsers,
} from "react-icons/hi2";

export const adminIconLibrary: Record<string, IconType> = {
  dashboard: HiOutlineSquares2X2,
  home: HiOutlineHome,
  events: HiOutlineCalendarDays,
  testimonials: HiOutlineChatBubbleLeftRight,
  newsletter: HiOutlineEnvelope,
  forms: HiOutlineInbox,
  gallery: HiOutlinePhoto,
  categories: HiOutlineFolderOpen,
  users: HiOutlineUsers,
  security: HiOutlineShieldCheck,
  logout: HiOutlineArrowRightOnRectangle,
};

export type AdminIconName = keyof typeof adminIconLibrary;
