import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function Field({
  label,
  value,
  placeholder,
  onChange,
  icon,
  prefix,
  hint,
  serif = false,
  big = false,
  multiline = false,
  rows = 3,
  inputMode,
  align = "left",
}: {
  label?: string;
  value: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  icon?: IconName;
  prefix?: string;
  hint?: string;
  serif?: boolean;
  big?: boolean;
  multiline?: boolean;
  rows?: number;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "search" | "url";
  align?: "left" | "center" | "right";
}) {
  const [focus, setFocus] = useState(false);
  const shared = {
    border: 0,
    outline: "none",
    background: "transparent",
    width: "100%",
    fontFamily: serif ? "var(--font-display)" : "var(--font-body)",
    fontSize: big ? (serif ? 28 : 22) : 16,
    fontWeight: serif ? 400 : 500,
    color: "var(--ink-1)",
    letterSpacing: serif ? "-0.01em" : "0",
    lineHeight: multiline ? 1.45 : 1.2,
    textAlign: align,
    resize: "none" as const,
    padding: 0,
    margin: 0,
  };
  return (
    <label style={{ display: "block" }}>
      {label && (
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>
          {label}
        </div>
      )}
      <div style={{
        display: "flex",
        alignItems: multiline ? "flex-start" : "center",
        gap: 10,
        background: "var(--bone)",
        borderRadius: 12,
        padding: big ? "16px 16px" : "13px 14px",
        boxShadow: focus ? "var(--shadow-inset), 0 0 0 2px var(--iris)" : "var(--shadow-inset)",
        transition: "box-shadow .16s var(--ease-out)",
      }}>
        {icon && (
          <span style={{ color: "var(--ink-3)", flexShrink: 0, marginTop: multiline ? 2 : 0 }}>
            <Icon name={icon} size={18}/>
          </span>
        )}
        {prefix && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink-2)", fontWeight: 500, flexShrink: 0 }}>
            {prefix}
          </span>
        )}
        {multiline ? (
          <textarea
            rows={rows}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={shared}
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            inputMode={inputMode}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={shared}
          />
        )}
      </div>
      {hint && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 7, lineHeight: 1.4 }}>{hint}</div>}
    </label>
  );
}

export function PickerRow({
  icon, label, value, placeholder, onClick, accent,
}: {
  icon?: IconName;
  label: string;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  return (
    <button onClick={onClick} style={{
      width: "100%", border: 0, background: "var(--bone)", borderRadius: 12,
      padding: "13px 14px", display: "flex", alignItems: "center", gap: 12,
      boxShadow: "var(--shadow-inset)", cursor: "pointer", textAlign: "left",
    }}>
      {icon && (
        <span style={{ color: accent ? "var(--iris)" : "var(--ink-3)", flexShrink: 0 }}>
          <Icon name={icon} size={18}/>
        </span>
      )}
      <span style={{ fontSize: 16, color: "var(--ink-2)", flexShrink: 0 }}>{label}</span>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span style={{
          fontSize: 16, fontWeight: 500,
          color: value ? "var(--ink-1)" : "var(--ink-3)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          fontFamily: "var(--font-body)",
        }}>
          {value || placeholder}
        </span>
        <Icon name="chev" size={15} color="var(--ink-4)"/>
      </span>
    </button>
  );
}

export function Segmented<T extends string>({
  options, value, onChange, dense = false,
}: {
  options: Array<[T, string]>;
  value: T;
  onChange?: (v: T) => void;
  dense?: boolean;
}) {
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
}

type ToggleTone = "iris" | "danger" | "success";
export function Toggle({
  on, onChange, tone = "iris",
}: {
  on: boolean;
  onChange?: (v: boolean) => void;
  tone?: ToggleTone;
}) {
  const colors: Record<ToggleTone, string> = {
    iris: "var(--iris)",
    danger: "var(--danger)",
    success: "var(--success)",
  };
  return (
    <button onClick={() => onChange?.(!on)} style={{
      width: 50, height: 30, borderRadius: 999, border: 0, padding: 3, flexShrink: 0,
      background: on ? colors[tone] : "var(--ink-4)", cursor: "pointer",
      transition: "background .2s var(--ease-out)", display: "flex",
      justifyContent: on ? "flex-end" : "flex-start", alignItems: "center",
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 999, background: "var(--bone)",
        boxShadow: "0 1px 3px rgba(28,26,38,.3)", transition: "all .2s var(--ease-out)",
      }}/>
    </button>
  );
}

export function SettingRow({
  icon, title, sub, control, last,
}: {
  icon?: IconName;
  title: string;
  sub?: string;
  control?: ReactNode;
  last?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: last ? 0 : "1px solid var(--hairline)" }}>
      {icon && (
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: "var(--cream)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--ink-2)", flexShrink: 0,
        }}>
          <Icon name={icon} size={18}/>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 1, lineHeight: 1.35 }}>{sub}</div>}
      </div>
      {control}
    </div>
  );
}

export function ProgressDots({ count, active }: { count: number; active: number }) {
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
}

export function OTPBoxes({ value = "", length = 6 }: { value?: string; length?: number }) {
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
            {digit || (active ? (
              <span style={{
                width: 2, height: 26, background: "var(--iris)", borderRadius: 2,
                animation: "ares-caret 1s steps(2) infinite",
              }}/>
            ) : "")}
          </div>
        );
      })}
    </div>
  );
}
