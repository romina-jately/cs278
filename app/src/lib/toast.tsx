import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Toast = { id: number; message: string };
type ToastCtx = { show: (message: string) => void };

const ToastContext = createContext<ToastCtx>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string) => {
    const id = ++nextId;
    setToasts(t => [...t, { id, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{
        position: "fixed", top: 24, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        zIndex: 1000, pointerEvents: "none",
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            pointerEvents: "auto",
            background: "var(--ink-1)", color: "var(--bone)",
            padding: "12px 18px", borderRadius: 999,
            fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)",
            boxShadow: "var(--shadow-3)",
            maxWidth: 360, textAlign: "center",
            animation: "toast-in .24s var(--ease-out)",
          }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
