/* global React */
const { useState } = React;

/* ────────── Avatars / common ────────── */
window.Avatar = function Avatar({ name = "?", size = 36, gradient = 0, ring = false }) {
  const grads = [
    "linear-gradient(135deg,#E8B5B5,#C77B7B)",
    "linear-gradient(135deg,#B8A6E8,#6B5BCB)",
    "linear-gradient(135deg,#7E9DBE,#1B2447)",
    "linear-gradient(135deg,#E6C788,#9A7D3F)",
    "linear-gradient(135deg,#C9A86B,#7E382E)",
    "linear-gradient(135deg,#8C7AE2,#4F3FA8)",
  ];
  const initials = name.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: grads[gradient % grads.length],
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#FBF7EE", fontWeight: 600, fontSize: Math.max(10, size * 0.36),
      flex: `0 0 ${size}px`,
      boxShadow: ring ? "0 0 0 2px var(--bone), 0 0 0 4px var(--iris)" : "none",
    }}>{initials}</div>
  );
};

window.AvatarStack = function AvatarStack({ names = [], extra = 0, size = 26 }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {names.map((n, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -size * 0.32 }}>
          <div style={{
            width: size, height: size, borderRadius: 999,
            background: ["linear-gradient(135deg,#E8B5B5,#C77B7B)","linear-gradient(135deg,#B8A6E8,#6B5BCB)","linear-gradient(135deg,#7E9DBE,#1B2447)","linear-gradient(135deg,#E6C788,#9A7D3F)"][i % 4],
            border: "2px solid var(--bone)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FBF7EE", fontSize: 10, fontWeight: 600,
          }}>{n.split(" ").map(s => s[0]).join("").slice(0,1)}</div>
        </div>
      ))}
      {extra > 0 && <span style={{ marginLeft: 8, fontSize: 12, color: "var(--ink-3)", whiteSpace: "nowrap" }}>+{extra} going</span>}
    </div>
  );
};

/* ────────── Buttons / pills / badges ────────── */
window.Button = function Button({ children, variant = "primary", size = "md", icon, onClick, full = false, style = {} }) {
  const variants = {
    primary: { background: "var(--ink-1)", color: "var(--bone)" },
    iris: { background: "var(--iris)", color: "var(--bone)" },
    secondary: { background: "var(--parchment)", color: "var(--ink-1)" },
    ghost: { background: "transparent", color: "var(--ink-1)" },
    danger: { background: "var(--danger-bg)", color: "#7E382E" },
    light: { background: "var(--bone)", color: "var(--ink-1)", boxShadow: "var(--shadow-1)" },
  };
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13, borderRadius: 10 },
    md: { padding: "12px 18px", fontSize: 15, borderRadius: 12 },
    lg: { padding: "16px 22px", fontSize: 17, borderRadius: 14 },
  };
  return (
    <button onClick={onClick} style={{
      border: 0, fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1,
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      width: full ? "100%" : "auto",
      transition: "transform .16s var(--ease-out), filter .16s var(--ease-out)",
      cursor: "pointer",
      ...variants[variant], ...sizes[size], ...style,
    }}
    onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      {icon}{children}
    </button>
  );
};

window.Pill = function Pill({ children, on = false, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: 0,
      padding: "7px 14px", fontSize: 13, fontWeight: 500,
      borderRadius: 999,
      background: on ? "var(--ink-1)" : "transparent",
      color: on ? "var(--bone)" : "var(--ink-3)",
      transition: "background .16s var(--ease-out), color .16s var(--ease-out)",
      cursor: "pointer",
    }}>{children}</button>
  );
};

window.Badge = function Badge({ children, tone = "iris", icon }) {
  const tones = {
    iris: { background: "var(--lavender-bg)", color: "var(--iris-deep)" },
    success: { background: "var(--success-bg)", color: "#3F6249" },
    warning: { background: "var(--warning-bg)", color: "#7A551E" },
    danger: { background: "var(--danger-bg)", color: "#7E382E" },
    gold: { background: "var(--gold-bg)", color: "var(--gold-deep)" },
    exec: { background: "var(--navy)", color: "var(--bone)", letterSpacing: ".08em", fontSize: 10 },
    ink: { background: "var(--ink-1)", color: "var(--bone)" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap",
      fontSize: 12, fontWeight: 600, ...tones[tone]
    }}>{icon}{children}</span>
  );
};

/* ────────── Lucide-style inline icons (just the ones we use) ────────── */
window.Icon = function Icon({ name, size = 22, color = "currentColor", strokeWidth = 2 }) {
  const paths = {
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
  const isFill = name === "flame" || name === "sparkle";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={isFill ? color : "none"}
      stroke={isFill ? "none" : color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

/* ────────── Form primitives (used by onboarding + create-event flows) ────────── */

/* A labeled field. Renders a bone surface with inset shadow; iris ring when focused.
   `serif` makes the value Instrument Serif (for event titles); `big` enlarges it. */
window.Field = function Field({ label, value, placeholder, onChange, icon, prefix, hint, serif = false, big = false, multiline = false, rows = 3, inputMode, align = "left" }) {
  const [focus, setFocus] = useState(false);
  const shared = {
    border: 0, outline: "none", background: "transparent", width: "100%",
    fontFamily: serif ? "var(--font-display)" : "var(--font-body)",
    fontSize: big ? (serif ? 28 : 22) : 16,
    fontWeight: serif ? 400 : 500, color: "var(--ink-1)",
    letterSpacing: serif ? "-0.01em" : "0", lineHeight: multiline ? 1.45 : 1.2,
    textAlign: align, resize: "none", padding: 0, margin: 0,
  };
  return (
    <label style={{ display: "block" }}>
      {label && <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>{label}</div>}
      <div style={{
        display: "flex", alignItems: multiline ? "flex-start" : "center", gap: 10,
        background: "var(--bone)", borderRadius: 12, padding: big ? "16px 16px" : "13px 14px",
        boxShadow: focus ? "var(--shadow-inset), 0 0 0 2px var(--iris)" : "var(--shadow-inset)",
        transition: "box-shadow .16s var(--ease-out)",
      }}>
        {icon && <span style={{ color: "var(--ink-3)", flexShrink: 0, marginTop: multiline ? 2 : 0 }}><Icon name={icon} size={18}/></span>}
        {prefix && <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink-2)", fontWeight: 500, flexShrink: 0 }}>{prefix}</span>}
        {multiline
          ? <textarea rows={rows} value={value} placeholder={placeholder} onChange={e => onChange?.(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={shared}/>
          : <input value={value} placeholder={placeholder} inputMode={inputMode} onChange={e => onChange?.(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={shared}/>}
      </div>
      {hint && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 7, lineHeight: 1.4 }}>{hint}</div>}
    </label>
  );
};

/* A tappable row — value-on-the-right, chevron. For date/time/location pickers. */
window.PickerRow = function PickerRow({ icon, label, value, placeholder, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", border: 0, background: "var(--bone)", borderRadius: 12,
      padding: "13px 14px", display: "flex", alignItems: "center", gap: 12,
      boxShadow: "var(--shadow-inset)", cursor: "pointer", textAlign: "left",
    }}>
      {icon && <span style={{ color: accent ? "var(--iris)" : "var(--ink-3)", flexShrink: 0 }}><Icon name={icon} size={18}/></span>}
      <span style={{ fontSize: 16, color: "var(--ink-2)", flexShrink: 0 }}>{label}</span>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: value ? "var(--ink-1)" : "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--font-body)" }}>{value || placeholder}</span>
        <Icon name="chev" size={15} color="var(--ink-4)"/>
      </span>
    </button>
  );
};

/* Segmented control (generalized from the event RSVP toggle). */
window.Segmented = function Segmented({ options, value, onChange, dense = false }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--cream)", borderRadius: 999, boxShadow: "var(--shadow-inset)" }}>
      {options.map(([k, l]) => (
        <button key={k} onClick={() => onChange?.(k)} style={{
          flex: 1, border: 0, padding: dense ? "8px 0" : "10px 0", borderRadius: 999,
          fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)",
          background: value === k ? "var(--ink-1)" : "transparent",
          color: value === k ? "var(--bone)" : "var(--ink-3)",
          cursor: "pointer", transition: "all .16s var(--ease-out)", whiteSpace: "nowrap",
        }}>{l}</button>
      ))}
    </div>
  );
};

/* iOS-style switch. */
window.Toggle = function Toggle({ on, onChange, tone = "iris" }) {
  const colors = { iris: "var(--iris)", danger: "var(--danger)", success: "var(--success)" };
  return (
    <button onClick={() => onChange?.(!on)} style={{
      width: 50, height: 30, borderRadius: 999, border: 0, padding: 3, flexShrink: 0,
      background: on ? colors[tone] : "var(--ink-4)", cursor: "pointer",
      transition: "background .2s var(--ease-out)", display: "flex",
      justifyContent: on ? "flex-end" : "flex-start", alignItems: "center",
    }}>
      <span style={{ width: 24, height: 24, borderRadius: 999, background: "var(--bone)", boxShadow: "0 1px 3px rgba(28,26,38,.3)", transition: "all .2s var(--ease-out)" }}/>
    </button>
  );
};

/* A settings row with title/sub on the left and arbitrary control on the right. */
window.SettingRow = function SettingRow({ icon, title, sub, control, last }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: last ? 0 : "1px solid var(--hairline)" }}>
      {icon && <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)", flexShrink: 0 }}><Icon name={icon} size={18}/></div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 1, lineHeight: 1.35 }}>{sub}</div>}
      </div>
      {control}
    </div>
  );
};

/* Progress dots for a linear flow. */
window.ProgressDots = function ProgressDots({ count, active }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{
          height: 6, borderRadius: 999,
          width: i === active ? 22 : 6,
          background: i <= active ? "var(--iris)" : "var(--ink-4)",
          transition: "all .24s var(--ease-out)",
        }}/>
      ))}
    </div>
  );
};

/* OTP code boxes — `filled` digits shown, caret on the next. */
window.OTPBoxes = function OTPBoxes({ value = "", length = 6 }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {Array.from({ length }).map((_, i) => {
        const digit = value[i];
        const active = i === value.length;
        return (
          <div key={i} style={{
            flex: 1, maxWidth: 50, height: 60, borderRadius: 14,
            background: "var(--bone)",
            boxShadow: active ? "var(--shadow-inset), 0 0 0 2px var(--iris)" : "var(--shadow-inset)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 500, color: "var(--ink-1)",
            transition: "box-shadow .16s var(--ease-out)",
          }}>
            {digit || (active ? <span style={{ width: 2, height: 26, background: "var(--iris)", borderRadius: 2, animation: "ares-caret 1s steps(2) infinite" }}/> : "")}
          </div>
        );
      })}
    </div>
  );
};

/* The Ares logo mark (iris-gradient "A"). */
window.LogoMark = function LogoMark({ size = 64, radius }) {
  const r = radius ?? Math.round(size * 0.28);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={"ares-iris-" + size} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8C7AE2"/><stop offset="0.6" stopColor="#6B5BCB"/><stop offset="1" stopColor="#4F3FA8"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx={r * 64 / size} fill={`url(#ares-iris-${size})`}/>
      <path d="M14 48 L30 16 H34 L50 48" stroke="#FBF7EE" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M21 36 H43" stroke="#FBF7EE" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
};

Object.assign(window, { Avatar: window.Avatar, AvatarStack: window.AvatarStack, Button: window.Button, Pill: window.Pill, Badge: window.Badge, Icon: window.Icon, Field: window.Field, PickerRow: window.PickerRow, Segmented: window.Segmented, Toggle: window.Toggle, SettingRow: window.SettingRow, ProgressDots: window.ProgressDots, OTPBoxes: window.OTPBoxes, LogoMark: window.LogoMark });
