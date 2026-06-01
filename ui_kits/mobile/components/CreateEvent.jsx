/* global React, Frame, TopNav, Icon, Avatar, AvatarStack, Button, Badge, Field, PickerRow, Segmented, Toggle, SettingRow, TaskRow */
const { useState: useStateCe } = React;

const CE_COVERS = [
  { id: "retreat", c: "linear-gradient(135deg,#E6C788 0%,#C9A86B 50%,#7E382E 100%)" },
  { id: "formal", c: "linear-gradient(135deg,#1B2447 0%,#4F3FA8 100%)" },
  { id: "rose", c: "linear-gradient(135deg,#E8B5B5 0%,#C77B7B 60%,#7E382E 100%)" },
  { id: "iris", c: "linear-gradient(135deg,#8C7AE2 0%,#6B5BCB 60%,#4F3FA8 100%)" },
  { id: "beach", c: "linear-gradient(155deg,#E6C788 0%,#7E9DBE 100%)" },
];

/* sheet footer */
const SheetFooter = ({ children }) => (
  <div style={{ flex: "0 0 auto", padding: "12px 20px calc(20px + env(safe-area-inset-bottom))", background: "var(--cream)", borderTop: "1px solid var(--hairline-2)" }}>
    {children}
  </div>
);

const SubHead = ({ children, top = 24 }) => (
  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: top, marginBottom: 10 }}>{children}</div>
);

/* ────────────────────────────────────────────────────────────────────
   C1) NEW EVENT — compose sheet. Cover, title, when, where, about, who.
   ──────────────────────────────────────────────────────────────────── */
window.CreateEventScreen = function CreateEventScreen({ onCancel, onNext }) {
  const [cover, setCover] = useStateCe("retreat");
  const [title, setTitle] = useStateCe("Sisterhood retreat");
  const [about, setAbout] = useStateCe("Lake house weekend — bring a swimsuit, we'll handle dinner. Carpools leave the house at 6:30.");
  const [vis, setVis] = useStateCe("chapter");
  const cur = CE_COVERS.find(c => c.id === cover);
  return (
    <Frame screenName="Create · New event">
      {/* sheet grabber + header */}
      <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", paddingTop: 6 }}>
        <span style={{ width: 38, height: 5, borderRadius: 999, background: "var(--ink-4)" }}/>
      </div>
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 12px" }}>
        <button onClick={onCancel} style={{ border: 0, background: "transparent", fontSize: 15, color: "var(--ink-3)", fontWeight: 500, cursor: "pointer" }}>Cancel</button>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)", whiteSpace: "nowrap" }}>New event</span>
        <span style={{ fontSize: 15, color: "var(--ink-4)", fontWeight: 600 }}>Draft</span>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        {/* live cover preview with title overlaid */}
        <div style={{ height: 168, borderRadius: 20, background: cur.c, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-1)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 45%,rgba(28,26,38,.6) 100%)" }}/>
          <button style={{ position: "absolute", right: 12, top: 12, border: 0, background: "rgba(251,247,238,.92)", color: "var(--ink-1)", borderRadius: 999, padding: "7px 12px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", boxShadow: "var(--shadow-1)" }}>
            <Icon name="image" size={14}/> Photo
          </button>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.05, letterSpacing: "-.01em", textShadow: "0 1px 12px rgba(28,26,38,.3)" }}>{title || "Event title"}</div>
          </div>
        </div>

        {/* cover swatches */}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {CE_COVERS.map(c => (
            <button key={c.id} onClick={() => setCover(c.id)} style={{
              flex: 1, height: 38, borderRadius: 10, background: c.c, border: 0, cursor: "pointer",
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
        <Segmented value={vis} onChange={setVis} options={[["chapter","Whole chapter"],["pledge","Pledge class"],["committee","Committee"]]}/>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.45 }}>
          {vis === "chapter" ? "All 60 sisters will see it on the calendar and get a heads-up." : vis === "pledge" ? "Only Spring '26 will see this one." : "Only the committee you pick next."}
        </div>
      </div>

      <SheetFooter>
        <Button variant="iris" size="lg" full onClick={onNext} icon={<Icon name="arrow" size={17} color="var(--bone)"/>}>Next — tasks &amp; RSVP</Button>
      </SheetFooter>
    </Frame>
  );
};

/* small +/- points stepper */
const PointsStepper = ({ value, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--cream)", borderRadius: 999, padding: 3, boxShadow: "var(--shadow-inset)" }}>
    <button onClick={() => onChange(Math.max(0, value - 5))} style={{ width: 30, height: 30, borderRadius: 999, border: 0, background: "var(--bone)", color: "var(--ink-1)", fontSize: 18, fontWeight: 600, cursor: "pointer", boxShadow: "var(--shadow-1)", lineHeight: 1 }}>−</button>
    <span style={{ minWidth: 52, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500, color: "var(--ink-1)" }}>{value} pts</span>
    <button onClick={() => onChange(value + 5)} style={{ width: 30, height: 30, borderRadius: 999, border: 0, background: "var(--ink-1)", color: "var(--bone)", fontSize: 18, fontWeight: 600, cursor: "pointer", lineHeight: 1 }}>+</button>
  </div>
);

/* ────────────────────────────────────────────────────────────────────
   C2) TASKS & RSVP — the operationally-useful half. Exec controls.
   ──────────────────────────────────────────────────────────────────── */
window.EventDetailsScreen = function EventDetailsScreen({ onBack, onPublish }) {
  const [rsvp, setRsvp] = useStateCe(true);
  const [mandatory, setMandatory] = useStateCe(false);
  const [points, setPoints] = useStateCe(25);
  const [plusOne, setPlusOne] = useStateCe(false);
  const [tasks, setTasks] = useStateCe([
    { label: "Sign liability waiver", req: true },
    { label: "Pay $35 retreat fee", req: true },
  ]);
  return (
    <Frame screenName="Create · Tasks & RSVP">
      <TopNav title="Tasks & RSVP" leftIcon={<Icon name="back" size={18}/>} onLeft={onBack} serif={false}/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 24px" }}>
        <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.45, marginTop: 8 }}>How sisters respond — and what they owe before Friday.</div>

        <SubHead top={20}>Responses</SubHead>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="check" title="Collect RSVPs" sub="Going · Maybe · Can't" control={<Toggle on={rsvp} onChange={setRsvp}/>}/>
          <SettingRow icon="users" title="Allow +1 guests" sub="Sisters can bring a date" control={<Toggle on={plusOne} onChange={setPlusOne}/>}/>
          <SettingRow icon="pin" title="Mark as mandatory" sub={mandatory ? "Counts against attendance" : "Optional for everyone"} control={<Toggle on={mandatory} onChange={setMandatory} tone="danger"/>} last/>
        </div>

        <SubHead>Points</SubHead>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="sparkle" title="Award points" sub="Verified at check-in" control={<PointsStepper value={points} onChange={setPoints}/>} last/>
        </div>

        <SubHead>Tasks for attendees</SubHead>
        <div style={{ background: "var(--bone)", borderRadius: 20, padding: "4px 16px", boxShadow: "var(--shadow-1)" }}>
          {tasks.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--hairline)" }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, border: "1.5px solid var(--ink-4)", flexShrink: 0 }}/>
              <span style={{ flex: 1, fontSize: 15, color: "var(--ink-1)" }}>{t.label}</span>
              {t.req && <Badge tone="iris">required</Badge>}
              <button onClick={() => setTasks(a => a.filter((_, j) => j !== i))} style={{ border: 0, background: "transparent", color: "var(--ink-4)", cursor: "pointer", padding: 4 }}><Icon name="trash" size={16}/></button>
            </div>
          ))}
          <button onClick={() => setTasks(a => [...a, { label: "New task", req: false }])} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 0", border: 0, background: "transparent", cursor: "pointer", color: "var(--iris)" }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: "var(--lavender-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="plus" size={14} color="var(--iris)"/></span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Add task</span>
          </button>
        </div>

        <div style={{ marginTop: 18, display: "flex", alignItems: "flex-start", gap: 10, background: "var(--lavender-bg)", borderRadius: 16, padding: "12px 14px" }}>
          <span style={{ color: "var(--iris-deep)", marginTop: 1 }}><Icon name="sms" size={16}/></span>
          <span style={{ fontSize: 13, color: "var(--iris-deep)", lineHeight: 1.4 }}>Posting texts the chapter once. Reminders for unfinished tasks go out automatically — you don't have to nag.</span>
        </div>
      </div>
      <SheetFooter>
        <Button variant="iris" size="lg" full onClick={onPublish}>Post to chapter</Button>
      </SheetFooter>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   C3) PUBLISHED — confirmation + the SMS dispatch moment.
   ──────────────────────────────────────────────────────────────────── */
window.EventPublishedScreen = function EventPublishedScreen({ onView, onDone }) {
  return (
    <Frame screenName="Create · Published">
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 36 }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="check" size={38} color="var(--success)"/>
          </div>
          <div style={{ width: "100%", fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)", marginTop: 20 }}>Posted to chapter</div>
          <div style={{ width: "100%", maxWidth: 280, fontSize: 15, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.45 }}>It's live on the May calendar. Here's what just went out.</div>
        </div>

        {/* finished event card */}
        <div style={{ marginTop: 28, background: "var(--bone)", borderRadius: 24, boxShadow: "var(--shadow-2)", overflow: "hidden" }}>
          <div style={{ height: 130, background: "linear-gradient(135deg,#E6C788 0%,#C9A86B 50%,#7E382E 100%)", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 45%,rgba(28,26,38,.6) 100%)" }}/>
            <div style={{ position: "absolute", left: 14, top: 14 }}><Badge tone="ink">Just posted</Badge></div>
            <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>Fri May 9 · 7pm</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, marginTop: 2 }}>Sisterhood retreat</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
            <AvatarStack names={["Maya P", "Lily K", "Nora T"]} extra={0}/>
            <span style={{ fontSize: 12, color: "var(--ink-3)" }}>RSVPs opening…</span>
          </div>
        </div>

        {/* dispatch summary */}
        <div style={{ marginTop: 14, background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="bell" title="60 sisters notified" sub="Pushed to everyone with Ares open"
            control={<span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-1)", fontWeight: 500 }}>60</span>}/>
          <SettingRow icon="sms" title="12 texted" sub="The ones who haven't opened today — via SMS" last
            control={<span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-1)", fontWeight: 500 }}>12</span>}/>
        </div>
      </div>

      <div style={{ flex: "0 0 auto", padding: "12px 20px calc(20px + env(safe-area-inset-bottom))", background: "var(--cream)", display: "flex", flexDirection: "column", gap: 10 }}>
        <Button variant="iris" size="lg" full onClick={onView}>View event</Button>
        <Button variant="ghost" size="md" full onClick={onDone}>Back to calendar</Button>
      </div>
    </Frame>
  );
};

Object.assign(window, {
  CreateEventScreen: window.CreateEventScreen,
  EventDetailsScreen: window.EventDetailsScreen,
  EventPublishedScreen: window.EventPublishedScreen,
});
