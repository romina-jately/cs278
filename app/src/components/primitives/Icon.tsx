import type { CSSProperties, ReactNode } from "react";

export type IconName =
  | "home" | "calendar" | "chat" | "user" | "trophy" | "search" | "bell"
  | "plus" | "check" | "chev" | "back" | "pin" | "wallet" | "map" | "send"
  | "sms" | "flame" | "sparkle" | "options" | "alumnae" | "camera" | "heart"
  | "pulse" | "location" | "briefcase" | "coffee" | "arrow" | "pinFilled"
  | "phone" | "image" | "clock" | "eye" | "lock" | "globe" | "users" | "x"
  | "trash" | "type" | "list";

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

const PATHS: Record<IconName, ReactNode> = {
  home: <><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  chat: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  trophy: <><path d="M6 2v6a6 6 0 0 0 12 0V2"/><path d="M4 22h16"/><path d="M10 14v6"/><path d="M14 14v6"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
  bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  check: <><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></>,
  chev: <path d="M9 6l6 6-6 6"/>,
  back: <path d="M15 6l-6 6 6 6"/>,
  pin: <><path d="M12 17v5"/><path d="M5 17h14"/><path d="M9 6 5 17h14L15 6"/><path d="M9 6V2h6v4"/></>,
  wallet: <><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/></>,
  map: <><path d="M9 6 3 4v14l6 2 6-2 6 2V6l-6-2-6 2Z"/><path d="M9 6v14M15 4v14"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4z"/></>,
  sms: <><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M7 22l3-4"/></>,
  flame: <path d="M12 3.2c2.4 3.4 4.6 5.6 4.6 8.6 0 1.8-.8 3.6-2.2 4.4 0-1.8-.8-2.8-2-3.4 0 1.6-1 2.6-2 3 .4-2.2-1-3.6-1.8-4.8C7.6 9.6 8 6.6 12 3.2Z"/>,
  sparkle: <path d="M12 2 13.6 9.4 21 11 13.6 12.6 12 20 10.4 12.6 3 11 10.4 9.4 Z"/>,
  options: <><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></>,
  alumnae: <><path d="M22 10v6"/><path d="M2 10 12 4l10 6-10 6L2 10z"/><path d="M6 12.5V17a4 4 0 0 0 8 0v0a4 4 0 0 0 6 0v-4.5"/></>,
  camera: <><path d="M3 7h3l2-3h8l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="4"/></>,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  location: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
  coffee: <><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></>,
  arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  pinFilled: <path d="M12 2 9 9H4l4 3-2 8 6-4 6 4-2-8 4-3h-5z"/>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-1z"/>,
  image: <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 16-5-5L5 21"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></>,
  users: <><circle cx="9" cy="8" r="3.5"/><path d="M3 21a6 6 0 0 1 12 0"/><path d="M16 5a3.5 3.5 0 0 1 0 7M21 21a6 6 0 0 0-4-5.6"/></>,
  x: <path d="M6 6l12 12M18 6 6 18"/>,
  trash: <><path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></>,
  type: <><path d="M5 6h14M5 6v-.5h14V6M12 6v13"/></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></>,
};

export function Icon({ name, size = 22, color = "currentColor", strokeWidth = 2, style }: Props) {
  const isFill = name === "flame" || name === "sparkle" || name === "pinFilled";
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={isFill ? color : "none"}
      stroke={isFill ? "none" : color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={style}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
