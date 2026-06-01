import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Badge, Button } from "../components/primitives/atoms";
import { SettingRow, Toggle } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { api } from "../api";
import { useCreateEvent } from "./createEventState";

function PointsStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4,
      background: "var(--cream)", borderRadius: 999, padding: 3, boxShadow: "var(--shadow-inset)",
    }}>
      <button onClick={() => onChange(Math.max(0, value - 5))} style={{
        width: 30, height: 30, borderRadius: 999, border: 0,
        background: "var(--bone)", color: "var(--ink-1)",
        fontSize: 18, fontWeight: 600, cursor: "pointer",
        boxShadow: "var(--shadow-1)", lineHeight: 1,
      }}>−</button>
      <span style={{
        minWidth: 52, textAlign: "center", fontFamily: "var(--font-mono)",
        fontSize: 14, fontWeight: 500, color: "var(--ink-1)",
      }}>{value} pts</span>
      <button onClick={() => onChange(value + 5)} style={{
        width: 30, height: 30, borderRadius: 999, border: 0,
        background: "var(--ink-1)", color: "var(--bone)",
        fontSize: 18, fontWeight: 600, cursor: "pointer", lineHeight: 1,
      }}>+</button>
    </div>
  );
}

export default function EventDetailsScreen() {
  const navigate = useNavigate();
  const { draft, setDraft } = useCreateEvent();
  const [rsvp, setRsvp] = useState(draft.rsvp);
  const [mandatory, setMandatory] = useState(draft.mandatory);
  const [points, setPoints] = useState(draft.points);
  const [plusOne, setPlusOne] = useState(draft.plusOne);
  const [tasks, setTasks] = useState(draft.tasks);

  async function publish() {
    const merged = { ...draft, rsvp, mandatory, points, plusOne, tasks };
    setDraft(() => merged);
    const result = await api.publishEvent(merged);
    navigate("/create/done", {
      state: {
        eventId: result.eventId,
        title: merged.title,
        date: merged.date,
        time: merged.time,
        cover: merged.cover,
        notified: result.notified,
        texted: result.texted,
      },
    });
  }

  return (
    <Frame screenName="Create · Tasks & RSVP">
      <TopNav title="Tasks & RSVP" leftIcon={<Icon name="back" size={18}/>} onLeft={() => navigate("/create")} serif={false}/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 24px" }}>
        <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.45, marginTop: 8 }}>
          How sisters respond — and what they owe before Friday.
        </div>

        <SubHead top={20}>Responses</SubHead>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="check" title="Collect RSVPs" sub="Going · Maybe · Can't" control={<Toggle on={rsvp} onChange={setRsvp}/>}/>
          <SettingRow icon="users" title="Allow +1 guests" sub="Sisters can bring a date" control={<Toggle on={plusOne} onChange={setPlusOne}/>}/>
          <SettingRow
            icon="pin"
            title="Mark as mandatory"
            sub={mandatory ? "Counts against attendance" : "Optional for everyone"}
            control={<Toggle on={mandatory} onChange={setMandatory} tone="danger"/>}
            last
          />
        </div>

        <SubHead>Points</SubHead>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="sparkle" title="Award points" sub="Verified at check-in" control={<PointsStepper value={points} onChange={setPoints}/>} last/>
        </div>

        <SubHead>Tasks for attendees</SubHead>
        <div style={{ background: "var(--bone)", borderRadius: 20, padding: "4px 16px", boxShadow: "var(--shadow-1)" }}>
          {tasks.map((t, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
              borderBottom: "1px solid var(--hairline)",
            }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, border: "1.5px solid var(--ink-4)", flexShrink: 0 }}/>
              <span style={{ flex: 1, fontSize: 15, color: "var(--ink-1)" }}>{t.label}</span>
              {t.required && <Badge tone="iris">required</Badge>}
              <button onClick={() => setTasks(a => a.filter((_, j) => j !== i))} style={{
                border: 0, background: "transparent", color: "var(--ink-4)", cursor: "pointer", padding: 4,
              }}>
                <Icon name="trash" size={16}/>
              </button>
            </div>
          ))}
          <button onClick={() => setTasks(a => [...a, { label: "New task", required: false }])} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "13px 0", border: 0, background: "transparent", cursor: "pointer", color: "var(--iris)",
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999, background: "var(--lavender-bg)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon name="plus" size={14} color="var(--iris)"/>
            </span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Add task</span>
          </button>
        </div>

        <div style={{
          marginTop: 18, display: "flex", alignItems: "flex-start", gap: 10,
          background: "var(--lavender-bg)", borderRadius: 16, padding: "12px 14px",
        }}>
          <span style={{ color: "var(--iris-deep)", marginTop: 1 }}><Icon name="sms" size={16}/></span>
          <span style={{ fontSize: 13, color: "var(--iris-deep)", lineHeight: 1.4 }}>
            Posting texts the chapter once. Reminders for unfinished tasks go out automatically — you don't have to nag.
          </span>
        </div>
      </div>
      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)", borderTop: "1px solid var(--hairline-2)",
      }}>
        <Button variant="iris" size="lg" full onClick={publish}>Post to chapter</Button>
      </div>
    </Frame>
  );
}

function SubHead({ children, top = 24 }: { children: React.ReactNode; top?: number }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
      color: "var(--ink-3)", marginTop: top, marginBottom: 10,
    }}>{children}</div>
  );
}
