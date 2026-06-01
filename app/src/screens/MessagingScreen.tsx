import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Icon } from "../components/primitives/Icon";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";

export default function MessagingScreen() {
  const navigate = useNavigate();
  const threads = useApi(() => api.getThreads()) ?? [];

  return (
    <Frame screenName="04 Chat">
      <TopNav
        title="Messages"
        subtitle="3 unread"
        rightIcons={[
          <button key="b" style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-1)", color: "var(--ink-1)", cursor: "pointer",
          }}>
            <Icon name="search" size={18}/>
          </button>,
          <button key="p" style={{
            background: "var(--ink-1)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)", cursor: "pointer",
          }}>
            <Icon name="plus" size={18}/>
          </button>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        <button onClick={() => navigate("/threads/chapter")} style={{
          width: "100%", border: 0, background: "var(--grad-iris)", borderRadius: 22,
          padding: 16, color: "var(--bone)", boxShadow: "var(--shadow-2)",
          textAlign: "left", cursor: "pointer", marginBottom: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, background: "rgba(251,247,238,.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="sparkle" size={22} color="var(--bone)"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Chapter</div>
              <div style={{ fontSize: 11, opacity: .85 }}>60 sisters</div>
            </div>
            <span style={{
              background: "var(--bone)", color: "var(--ink-1)",
              fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999,
            }}>3</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.4, opacity: .9 }}>
            <b style={{ fontWeight: 600 }}>Maya:</b> heads up — retreat moved to 7pm
          </div>
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {threads.map(m => (
            <button
              key={m.id}
              onClick={() => navigate(`/threads/${m.id}`)}
              style={{
                width: "100%", border: 0, background: "var(--bone)", borderRadius: 16,
                padding: 12, boxShadow: "var(--shadow-1)",
                display: "flex", gap: 12, alignItems: "center", cursor: "pointer", textAlign: "left",
              }}
            >
              {m.isEvent ? (
                <div style={{ width: 42, height: 42, borderRadius: 12, background: COVERS.retreat, position: "relative", overflow: "hidden", flex: "0 0 42px" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0),rgba(28,26,38,.4))" }}/>
                </div>
              ) : (
                <Avatar name={m.name} size={42} gradient={m.gradient}/>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.last}</div>
              </div>
              {m.unread > 0 && (
                <div style={{
                  background: "var(--iris)", color: "var(--bone)",
                  fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999,
                  minWidth: 22, textAlign: "center",
                }}>{m.unread}</div>
              )}
            </button>
          ))}
        </div>
      </div>
      <TabBar active="chat"/>
    </Frame>
  );
}
