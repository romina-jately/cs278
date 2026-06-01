import type { CSSProperties, ReactNode, MouseEventHandler } from "react";
import type { BadgeTone } from "../../types";

type ButtonVariant = "primary" | "iris" | "secondary" | "ghost" | "danger" | "light";
type ButtonSize = "sm" | "md" | "lg";

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  full = false,
  style = {},
  type = "button",
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  full?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit";
}) {
  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: { background: "var(--ink-1)", color: "var(--bone)" },
    iris: { background: "var(--iris)", color: "var(--bone)" },
    secondary: { background: "var(--parchment)", color: "var(--ink-1)" },
    ghost: { background: "transparent", color: "var(--ink-1)" },
    danger: { background: "var(--danger-bg)", color: "#7E382E" },
    light: { background: "var(--bone)", color: "var(--ink-1)", boxShadow: "var(--shadow-1)" },
  };
  const sizes: Record<ButtonSize, CSSProperties> = {
    sm: { padding: "8px 14px", fontSize: 13, borderRadius: 10 },
    md: { padding: "12px 18px", fontSize: 15, borderRadius: 12 },
    lg: { padding: "16px 22px", fontSize: 17, borderRadius: 14 },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        border: 0,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: full ? "100%" : "auto",
        transition: "transform .16s var(--ease-out), filter .16s var(--ease-out)",
        cursor: "pointer",
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon}
      {children}
    </button>
  );
}

export function Pill({
  children,
  on = false,
  onClick,
}: {
  children: ReactNode;
  on?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: 0,
        padding: "7px 14px",
        fontSize: 13,
        fontWeight: 500,
        borderRadius: 999,
        background: on ? "var(--ink-1)" : "transparent",
        color: on ? "var(--bone)" : "var(--ink-3)",
        transition: "background .16s var(--ease-out), color .16s var(--ease-out)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "iris",
  icon,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
}) {
  const tones: Record<BadgeTone, CSSProperties> = {
    iris: { background: "var(--lavender-bg)", color: "var(--iris-deep)" },
    success: { background: "var(--success-bg)", color: "#3F6249" },
    warning: { background: "var(--warning-bg)", color: "#7A551E" },
    danger: { background: "var(--danger-bg)", color: "#7E382E" },
    gold: { background: "var(--gold-bg)", color: "var(--gold-deep)" },
    exec: { background: "var(--navy)", color: "var(--bone)", letterSpacing: ".08em", fontSize: 10 },
    ink: { background: "var(--ink-1)", color: "var(--bone)" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        fontSize: 12,
        fontWeight: 600,
        ...tones[tone],
      }}
    >
      {icon}
      {children}
    </span>
  );
}

export function LogoMark({ size = 64, radius }: { size?: number; radius?: number }) {
  const r = radius ?? Math.round(size * 0.28);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`ares-iris-${size}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8C7AE2"/>
          <stop offset="0.6" stopColor="#6B5BCB"/>
          <stop offset="1" stopColor="#4F3FA8"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx={(r * 64) / size} fill={`url(#ares-iris-${size})`}/>
      <path d="M14 48 L30 16 H34 L50 48" stroke="#FBF7EE" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M21 36 H43" stroke="#FBF7EE" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
