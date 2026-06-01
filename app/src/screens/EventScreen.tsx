import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Frame, TabBar } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { MemberRow, PhotoTile, SectionHeader, TaskRow } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";
import type { Task } from "../types";

type Rsvp = "yes" | "maybe" | "no";

export default function EventScreen() {
  const navigate = useNavigate();
  const { id = "evt-retreat" } = useParams();
  const event = useApi(() => api.getEvent(id), [id]);
  const remoteTasks = useApi(() => api.getEventTasks(id), [id]);
  const going = useApi(() => api.getEventGoing(id), [id]) ?? [];

  const [rsvp, setRsvpState] = useState<Rsvp>("yes");
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => { if (remoteTasks) setTasks(remoteTasks); }, [remoteTasks]);

  function chooseRsvp(next: Rsvp) {
    setRsvpState(next);
    api.setRsvp(id, next);
  }

  function toggle(taskId: string) {
    setTasks(arr => arr.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
    const t = tasks.find(t => t.id === taskId);
    if (t) api.toggleTask(id, taskId, !t.done);
  }

  if (!event) return <Frame screenName="03 Event"><div/></Frame>;

  return (
    <Frame screenName="03 Event">
      <div style={{ position: "relative", height: 320, marginTop: -54, paddingTop: 54, background: COVERS[event.cover] }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,.15) 0%,rgba(28,26,38,0) 30%,rgba(28,26,38,.7) 100%)" }}/>
        <div style={{ position: "relative", padding: "16px 20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate(-1)} style={{
            background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-1)", boxShadow: "var(--shadow-1)", cursor: "pointer",
          }}>
            <Icon name="back" size={18}/>
          </button>
          <button style={{
            background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)", cursor: "pointer",
          }}>
            <Icon name="options" size={18}/>
          </button>
        </div>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 22, color: "var(--bone)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .9 }}>{event.date} · {event.time}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 1.05, letterSpacing: "-.02em", marginTop: 6 }}>{event.title}</div>
          <div style={{ fontSize: 14, opacity: .85, marginTop: 4 }}>{event.location}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 140px", marginTop: -28 }}>
        <div style={{ background: "var(--bone)", borderRadius: 24, padding: 16, boxShadow: "var(--shadow-2)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>You're</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, marginTop: 2, color: "var(--ink-1)", whiteSpace: "nowrap" }}>
                {rsvp === "yes" ? "Going" : rsvp === "maybe" ? "Maybe" : "Not going"}
              </div>
            </div>
            <Avatar name="Me" size={40} gradient={1} ring/>
          </div>
          <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--cream)", borderRadius: 999, boxShadow: "var(--shadow-inset)" }}>
            {(["yes","maybe","no"] as Rsvp[]).map(k => (
              <button key={k} onClick={() => chooseRsvp(k)} style={{
                flex: 1, border: 0, padding: "9px 0", borderRadius: 999,
                fontSize: 13, fontWeight: 600,
                background: rsvp === k ? "var(--ink-1)" : "transparent",
                color: rsvp === k ? "var(--bone)" : "var(--ink-3)",
                cursor: "pointer", transition: "all .16s var(--ease-out)",
              }}>{k === "yes" ? "Going" : k === "maybe" ? "Maybe" : "Can't"}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button variant="light" size="sm" icon={<Icon name="calendar" size={16}/>} style={{ whiteSpace: "nowrap" }}>Calendar</Button>
          <Button variant="light" size="sm" icon={<Icon name="map" size={16}/>} style={{ whiteSpace: "nowrap" }}>Directions</Button>
          <Button variant="light" size="sm" icon={<Icon name="send" size={16}/>} style={{ whiteSpace: "nowrap" }}>Share</Button>
        </div>

        <SectionHeader title="Album" action="Add photo" tight/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <PhotoTile cover={COVERS.beach} h={84} style={{ borderRadius: 12 }}/>
          <PhotoTile cover={COVERS.philanthropy} h={84} style={{ borderRadius: 12 }}/>
          <PhotoTile cover={COVERS.formal} h={84} style={{ borderRadius: 12 }}>
            <div style={{
              position: "absolute", inset: 0, background: "rgba(28,26,38,.55)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--bone)", fontFamily: "var(--font-display)", fontSize: 22,
            }}>+18</div>
          </PhotoTile>
        </div>

        <SectionHeader title="Your tasks" tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, padding: "8px 16px", boxShadow: "var(--shadow-1)" }}>
          {tasks.map(t => (
            <TaskRow key={t.id} done={t.done} label={t.label} by={t.by} onToggle={() => toggle(t.id)}/>
          ))}
        </div>

        <SectionHeader title={`Going · ${event.going}/${event.capacity}`} tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, padding: "4px 0", boxShadow: "var(--shadow-1)" }}>
          {going.map((m, i, arr) => (
            <MemberRow key={m.id} name={m.name} sub={m.role} gradient={m.gradient} last={i === arr.length - 1}/>
          ))}
        </div>
      </div>
      <TabBar active="calendar"/>
    </Frame>
  );
}
