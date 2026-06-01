import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { AvatarStack } from "../components/primitives/Avatar";
import { Badge } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { PhotoTile } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";
import type { DayCell } from "../types";

export default function CalendarScreen() {
  const navigate = useNavigate();
  const week = useApi(() => api.getWeekStrip()) ?? [];
  const events = useApi(() => api.getEvents()) ?? [];

  const today = week.find(d => d.today)?.dayOfMonth ?? 7;
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (selected === null) return events;
    return events.filter(e => e.dayOfMonth === selected);
  }, [events, selected]);

  return (
    <Frame screenName="02 Calendar">
      <TopNav
        title="May"
        subtitle={selected ? `Filtered to May ${selected}` : "14 events · 5 happening"}
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
        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginRight: -20, paddingRight: 20, marginBottom: 12 }}>
          {week.map(d => (
            <DayButton
              key={d.dayOfMonth}
              cell={d}
              isSelected={selected === d.dayOfMonth || (selected === null && d.today)}
              isToday={d.dayOfMonth === today}
              onClick={() => setSelected(prev => prev === d.dayOfMonth ? null : d.dayOfMonth)}
            />
          ))}
        </div>

        {selected !== null && (
          <button
            onClick={() => setSelected(null)}
            style={{
              border: 0, background: "var(--bone)", color: "var(--iris)",
              borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600,
              boxShadow: "var(--shadow-1)", cursor: "pointer", marginBottom: 12,
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
          >
            <Icon name="x" size={13}/> Clear filter
          </button>
        )}

        {filtered.length === 0 ? (
          <div style={{
            background: "var(--bone)", borderRadius: 20, padding: 24, marginTop: 4,
            boxShadow: "var(--shadow-1)", textAlign: "center", color: "var(--ink-3)",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-2)" }}>Nothing on May {selected}</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Tap the day again to clear, or hit <span style={{ color: "var(--iris)" }}>+</span> to plan something.</div>
          </div>
        ) : filtered.map(e => (
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

function DayButton({
  cell, isSelected, isToday, onClick,
}: {
  cell: DayCell;
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
}) {
  const filled = isSelected;
  return (
    <button
      onClick={onClick}
      style={{
        flex: "0 0 44px", textAlign: "center", padding: "8px 4px", borderRadius: 14,
        background: filled ? "var(--ink-1)" : "transparent",
        color: filled ? "var(--bone)" : "var(--ink-1)",
        border: 0, cursor: "pointer",
        boxShadow: !filled && isToday ? "inset 0 0 0 1.5px var(--ink-4)" : "none",
        transition: "background .16s var(--ease-out)",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, opacity: filled ? .8 : .55, textTransform: "uppercase", letterSpacing: ".06em" }}>{cell.day}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1, marginTop: 4 }}>{cell.dayOfMonth}</div>
      <div style={{ height: 6, marginTop: 6, display: "flex", justifyContent: "center" }}>
        {cell.dot && (
          <span style={{
            width: 5, height: 5, borderRadius: 999,
            background: cell.dot === "iris" ? "var(--iris)" : "var(--gold)",
          }}/>
        )}
      </div>
    </button>
  );
}
