import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { AvatarStack } from "../components/primitives/Avatar";
import { Badge } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { PhotoTile } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";

const WEEK = [
  { d: "Mon", n: 5 }, { d: "Tue", n: 6 }, { d: "Wed", n: 7, today: true }, { d: "Thu", n: 8 },
  { d: "Fri", n: 9, dot: "iris" as const }, { d: "Sat", n: 10 }, { d: "Sun", n: 11 }, { d: "Mon", n: 12, dot: "iris" as const },
  { d: "Tue", n: 13 }, { d: "Wed", n: 14, dot: "gold" as const },
];

export default function CalendarScreen() {
  const navigate = useNavigate();
  const events = useApi(() => api.getEvents()) ?? [];

  return (
    <Frame screenName="02 Calendar">
      <TopNav
        title="May"
        subtitle="14 events · 5 happening"
        rightIcons={[
          <button key="s" style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-1)", color: "var(--ink-1)", cursor: "pointer",
          }}>
            <Icon name="search" size={18}/>
          </button>,
          <button key="p" onClick={() => navigate("/create")} style={{
            background: "var(--ink-1)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--bone)", cursor: "pointer",
          }}>
            <Icon name="plus" size={18}/>
          </button>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginRight: -20, paddingRight: 20, marginBottom: 20 }}>
          {WEEK.map((d, i) => (
            <div key={i} style={{
              flex: "0 0 44px", textAlign: "center", padding: "8px 4px", borderRadius: 14,
              background: d.today ? "var(--ink-1)" : "transparent",
              color: d.today ? "var(--bone)" : "var(--ink-1)",
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: d.today ? .8 : .55, textTransform: "uppercase", letterSpacing: ".06em" }}>{d.d}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1, marginTop: 4 }}>{d.n}</div>
              <div style={{ height: 6, marginTop: 6, display: "flex", justifyContent: "center" }}>
                {d.dot && <span style={{ width: 5, height: 5, borderRadius: 999, background: d.dot === "iris" ? "var(--iris)" : "var(--gold)" }}/>}
              </div>
            </div>
          ))}
        </div>

        {events.map(e => (
          <button key={e.id} onClick={() => navigate(`/events/${e.id}`)} style={{
            width: "100%", border: 0, padding: 0, background: "var(--bone)", borderRadius: 24,
            boxShadow: "var(--shadow-1)", overflow: "hidden", textAlign: "left", cursor: "pointer",
            marginBottom: 14, flexShrink: 0,
          }}>
            <PhotoTile cover={COVERS[e.cover]} h={150} style={{ borderRadius: "24px 24px 0 0", boxShadow: "none" }}>
              {e.tag && (
                <div style={{ position: "absolute", left: 14, top: 14 }}>
                  <Badge tone={e.tag.tone}>{e.tag.label}</Badge>
                </div>
              )}
              <div style={{ position: "absolute", left: 14, bottom: 12, right: 14, color: "var(--bone)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>{e.date} · {e.time}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, letterSpacing: "-.01em", marginTop: 4 }}>{e.title}</div>
                <div style={{ fontSize: 12, opacity: .85, marginTop: 2 }}>{e.location}</div>
              </div>
            </PhotoTile>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
              <AvatarStack names={e.attendees} extra={Math.max(0, e.going - e.attendees.length)}/>
              <div style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--ink-3)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                  <Icon name="heart" size={14} color="var(--rose)"/>{e.reactions}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                  <Icon name="chat" size={14}/>{e.comments}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <TabBar active="calendar"/>
    </Frame>
  );
}
