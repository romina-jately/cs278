import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Icon, type IconName } from "../components/primitives/Icon";
import { useApi } from "../lib/useApi";
import { api } from "../api";
import type { Notification } from "../types";

const KIND_ICON: Record<Notification["kind"], IconName> = {
  rsvp: "check",
  post: "chat",
  dues: "wallet",
  approval: "sparkle",
  flare: "pulse",
  intro: "send",
};

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const initial = useApi(() => api.getNotifications());
  const [items, setItems] = useState<Notification[]>([]);
  useEffect(() => { if (initial) setItems(initial); }, [initial]);

  function open(n: Notification) {
    setItems(arr => arr.map(x => x.id === n.id ? { ...x, unread: false } : x));
    if (n.link) navigate(n.link);
  }

  async function markAllRead() {
    setItems(arr => arr.map(x => ({ ...x, unread: false })));
    await api.markNotificationsRead();
  }

  const unread = items.filter(n => n.unread).length;

  return (
    <Frame screenName="Notifications">
      <TopNav
        title="Notifications"
        subtitle={unread ? `${unread} unread` : "All caught up"}
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate(-1)}
        serif
        rightIcons={unread ? [
          <button key="m" onClick={markAllRead} style={{
            background: "var(--bone)", border: 0, padding: "8px 12px", borderRadius: 999,
            fontSize: 12, fontWeight: 600, color: "var(--ink-1)", cursor: "pointer",
            boxShadow: "var(--shadow-1)", whiteSpace: "nowrap",
          }}>Mark all read</button>,
        ] : []}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "12px 20px 40px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--ink-3)", padding: 32 }}>
            Nothing new — check back later.
          </div>
        ) : (
          <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)", overflow: "hidden" }}>
            {items.map((n, i, arr) => (
              <button
                key={n.id}
                onClick={() => open(n)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
                  width: "100%", border: 0, background: n.unread ? "var(--lavender-bg)" : "transparent",
                  borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)",
                  cursor: "pointer", textAlign: "left",
                }}
              >
                {n.who ? (
                  <Avatar name={n.who} size={36} gradient={n.whoGradient ?? 0}/>
                ) : (
                  <div style={{
                    width: 36, height: 36, borderRadius: 999,
                    background: "var(--ink-1)", color: "var(--bone)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon name={KIND_ICON[n.kind]} size={16}/>
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: "var(--ink-1)", lineHeight: 1.35 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name={KIND_ICON[n.kind]} size={12}/>
                    <span>{n.time}</span>
                  </div>
                </div>
                {n.unread && (
                  <span style={{
                    width: 8, height: 8, borderRadius: 999, background: "var(--iris)",
                    marginTop: 8, flexShrink: 0,
                  }}/>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </Frame>
  );
}
