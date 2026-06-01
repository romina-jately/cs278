import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame } from "../components/Frame";
import { Button } from "../components/primitives/atoms";
import { Field, PickerRow, Segmented } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { COVER_SWATCHES } from "../api";
import type { CoverKey, EventVisibility } from "../types";
import { useCreateEvent } from "./createEventState";

const SubHead = ({ children, top = 24 }: { children: React.ReactNode; top?: number }) => (
  <div style={{
    fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
    color: "var(--ink-3)", marginTop: top, marginBottom: 10,
  }}>{children}</div>
);

export default function CreateEventScreen() {
  const navigate = useNavigate();
  const { draft, setDraft } = useCreateEvent();

  const [cover, setCover] = useState<CoverKey>(draft.cover);
  const [title, setTitle] = useState(draft.title);
  const [about, setAbout] = useState(draft.about);
  const [vis, setVis] = useState<EventVisibility>(draft.visibility);

  const current = COVER_SWATCHES.find(c => c.id === cover) ?? COVER_SWATCHES[0];

  function next() {
    setDraft(d => ({ ...d, cover, title, about, visibility: vis }));
    navigate("/create/details");
  }

  return (
    <Frame screenName="Create · New event">
      <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", paddingTop: 6 }}>
        <span style={{ width: 38, height: 5, borderRadius: 999, background: "var(--ink-4)" }}/>
      </div>
      <div style={{
        flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 20px 12px",
      }}>
        <button onClick={() => navigate("/calendar")} style={{
          border: 0, background: "transparent", fontSize: 15, color: "var(--ink-3)", fontWeight: 500, cursor: "pointer",
        }}>Cancel</button>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)", whiteSpace: "nowrap" }}>New event</span>
        <span style={{ fontSize: 15, color: "var(--ink-4)", fontWeight: 600 }}>Draft</span>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div style={{
          height: 168, borderRadius: 20, background: current.gradient,
          position: "relative", overflow: "hidden", boxShadow: "var(--shadow-1)",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 45%,rgba(28,26,38,.6) 100%)" }}/>
          <button style={{
            position: "absolute", right: 12, top: 12, border: 0,
            background: "rgba(251,247,238,.92)", color: "var(--ink-1)",
            borderRadius: 999, padding: "7px 12px", fontSize: 12, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6, cursor: "pointer", boxShadow: "var(--shadow-1)",
          }}>
            <Icon name="image" size={14}/> Photo
          </button>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.05,
              letterSpacing: "-.01em", textShadow: "0 1px 12px rgba(28,26,38,.3)",
            }}>{title || "Event title"}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {COVER_SWATCHES.map(c => (
            <button key={c.id} onClick={() => setCover(c.id)} style={{
              flex: 1, height: 38, borderRadius: 10, background: c.gradient, border: 0, cursor: "pointer",
              boxShadow: cover === c.id ? "0 0 0 2px var(--cream), 0 0 0 4px var(--iris)" : "var(--shadow-1)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {cover === c.id && <Icon name="check" size={16} color="var(--bone)"/>}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <Field label="Title" value={title} onChange={setTitle} serif big placeholder="Event title"/>
        </div>

        <SubHead>When &amp; where</SubHead>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PickerRow icon="calendar" label="Date" value="Fri, May 9" accent/>
          <PickerRow icon="clock" label="Time" value="7:00 – 10:00 PM"/>
          <PickerRow icon="location" label="Where" value="Maya's house — Lake Geneva"/>
        </div>

        <SubHead>About</SubHead>
        <Field value={about} onChange={setAbout} multiline rows={4} placeholder="What should sisters know?"/>

        <SubHead>Who can see this</SubHead>
        <Segmented
          value={vis}
          onChange={setVis}
          options={[
            ["chapter", "Whole chapter"],
            ["pledge", "Pledge class"],
            ["committee", "Committee"],
          ]}
        />
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.45 }}>
          {vis === "chapter"
            ? "All 60 sisters will see it on the calendar and get a heads-up."
            : vis === "pledge"
              ? "Only Spring '26 will see this one."
              : "Only the committee you pick next."}
        </div>
      </div>

      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)", borderTop: "1px solid var(--hairline-2)",
      }}>
        <Button variant="iris" size="lg" full onClick={next} icon={<Icon name="arrow" size={17} color="var(--bone)"/>}>
          Next — tasks &amp; RSVP
        </Button>
      </div>
    </Frame>
  );
}
