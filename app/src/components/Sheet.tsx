import type { ReactNode } from "react";

export function Sheet({
  open, onClose, title, children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, zIndex: 50,
        background: "rgba(28,26,38,.42)",
        display: "flex", alignItems: "flex-end", justifyContent: "stretch",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", background: "var(--cream)",
          borderRadius: "24px 24px 0 0",
          boxShadow: "var(--shadow-3)",
          padding: "10px 20px calc(20px + env(safe-area-inset-bottom))",
          animation: "sheet-in .24s var(--ease-out)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
          <span style={{ width: 38, height: 5, borderRadius: 999, background: "var(--ink-4)" }}/>
        </div>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: 20, color: "var(--ink-1)",
          letterSpacing: "-.005em", margin: "10px 0 14px",
        }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

export function SheetOption({
  label, sub, selected, onClick,
}: {
  label: string;
  sub?: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={{
      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 14px",
      border: 0,
      borderBottom: "1px solid var(--hairline)",
      background: "transparent",
      textAlign: "left", cursor: "pointer",
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>}
      </div>
      {selected && (
        <span style={{
          width: 22, height: 22, borderRadius: 999, background: "var(--iris)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FBF7EE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7"/>
          </svg>
        </span>
      )}
    </button>
  );
}
