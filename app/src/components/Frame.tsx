import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon, type IconName } from "./primitives/Icon";

export function Frame({ children, screenName }: { children: ReactNode; screenName?: string }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 56,
      background: "var(--cream)",
      boxShadow: "0 0 0 12px #1C1A26, 0 40px 100px rgba(28,26,38,.25)",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        height: 54, padding: "16px 32px 0", display: "flex", justifyContent: "space-between",
        alignItems: "center", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--ink-1)",
        flex: "0 0 54px",
      }}>
        <span>9:41</span>
        <div style={{
          position: "absolute", left: "50%", top: 11, transform: "translateX(-50%)",
          width: 124, height: 36, background: "#1C1A26", borderRadius: 999,
        }}/>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="9" width="3" height="3" rx="0.5"/>
            <rect x="5" y="6" width="3" height="6" rx="0.5"/>
            <rect x="10" y="3" width="3" height="9" rx="0.5"/>
            <rect x="15" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor">
            <rect x="0.5" y="0.5" width="22" height="11" rx="2.5"/>
            <rect x="2" y="2" width="17" height="8" rx="1" fill="currentColor"/>
            <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <div data-screen-label={screenName} style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

export function TopNav({
  title,
  subtitle,
  leftIcon,
  rightIcons = [],
  serif = true,
  onLeft,
  transparent = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  leftIcon?: ReactNode;
  rightIcons?: ReactNode[];
  serif?: boolean;
  onLeft?: () => void;
  transparent?: boolean;
}) {
  return (
    <div style={{
      flex: "0 0 auto",
      padding: "12px 20px 14px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      background: transparent ? "transparent" : "rgba(246,240,228,.78)",
      backdropFilter: transparent ? "none" : "saturate(180%) blur(20px)",
      WebkitBackdropFilter: transparent ? "none" : "saturate(180%) blur(20px)",
      borderBottom: transparent ? "0" : "1px solid var(--hairline-2)",
      position: "relative", zIndex: 4,
    }}>
      {leftIcon && (
        <button onClick={onLeft} style={{
          background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "var(--shadow-1)", color: "var(--ink-1)", cursor: "pointer",
        }}>
          {leftIcon}
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0, textAlign: leftIcon ? "center" : "left" }}>
        <div style={{
          fontFamily: serif ? "var(--font-display)" : "var(--font-body)",
          fontSize: serif ? 22 : 17, fontWeight: serif ? 400 : 600,
          letterSpacing: serif ? "-0.01em" : "-0.005em", color: "var(--ink-1)",
          lineHeight: 1.1,
        }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>{rightIcons}</div>
    </div>
  );
}

type TabId = "home" | "calendar" | "chat" | "alumnae" | "me";

const TABS: Array<{ id: TabId; icon: IconName; label: string; path: string }> = [
  { id: "home", icon: "home", label: "Home", path: "/home" },
  { id: "calendar", icon: "calendar", label: "Calendar", path: "/calendar" },
  { id: "chat", icon: "chat", label: "Chat", path: "/chat" },
  { id: "alumnae", icon: "alumnae", label: "Alumnae", path: "/alumnae" },
  { id: "me", icon: "user", label: "Profile", path: "/me" },
];

export function TabBar({ active }: { active?: TabId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const current = active ?? deriveActive(location.pathname);
  return (
    <div style={{
      position: "absolute", left: 12, right: 12, bottom: 14, zIndex: 10,
      background: "rgba(246,240,228,.78)",
      backdropFilter: "saturate(180%) blur(24px)", WebkitBackdropFilter: "saturate(180%) blur(24px)",
      borderRadius: 28, padding: "10px 4px",
      boxShadow: "var(--shadow-2)",
      border: "1px solid var(--hairline)",
      display: "flex", justifyContent: "space-around", alignItems: "center",
    }}>
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => navigate(t.path)}
          style={{
            background: "transparent", border: 0,
            color: current === t.id ? "var(--ink-1)" : "var(--ink-3)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            padding: "4px 6px", flex: 1, cursor: "pointer",
          }}
        >
          <Icon name={t.icon} size={22} strokeWidth={current === t.id ? 2.2 : 1.8}/>
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: current === t.id ? "var(--iris)" : "var(--ink-3)",
          }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function deriveActive(path: string): TabId | undefined {
  if (path.startsWith("/home")) return "home";
  if (path.startsWith("/calendar") || path.startsWith("/events")) return "calendar";
  if (path.startsWith("/chat") || path.startsWith("/threads")) return "chat";
  if (path.startsWith("/alumnae")) return "alumnae";
  if (path.startsWith("/me")) return "me";
  return undefined;
}
