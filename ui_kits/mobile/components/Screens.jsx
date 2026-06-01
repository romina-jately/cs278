/* global React, Frame, TopNav, TabBar, Icon, Avatar, AvatarStack, Button, Pill, Badge, EventCard, DuesCard, PointsTile, MemberRow, MessageBubble, TaskRow */
const { useState } = React;

/* ─── small reusable bits used across screens ─── */
const Section = ({ title, action, children, tight }) => (
  <div style={{ marginTop: tight ? 18 : 24 }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10, gap: 12 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.005em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: "1 1 auto", minWidth: 0 }}>{title}</span>
      {action && <span style={{ fontSize: 13, color: "var(--iris)", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>{action}</span>}
    </div>
    {children}
  </div>
);

const COVERS = {
  retreat: "linear-gradient(135deg,#E6C788 0%,#C9A86B 50%,#7E382E 100%)",
  formal:  "linear-gradient(135deg,#1B2447 0%,#4F3FA8 100%)",
  philanthropy: "linear-gradient(135deg,#E8B5B5 0%,#C77B7B 60%,#7E382E 100%)",
  mixer: "linear-gradient(160deg,#7E9DBE 0%,#4F3FA8 100%)",
  alumni: "linear-gradient(135deg,#B8A6E8 0%,#6B5BCB 100%)",
  beach: "linear-gradient(155deg,#E6C788 0%,#7E9DBE 100%)",
};

/* a pseudo-photo: gradient + grain + a soft blob */
const PhotoTile = ({ cover, h = 100, children, style = {} }) => (
  <div style={{
    height: h, borderRadius: 16, background: cover, position: "relative", overflow: "hidden",
    boxShadow: "var(--shadow-1)", ...style,
  }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 30% 0%, rgba(251,247,238,.25), rgba(251,247,238,0) 60%)" }}/>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 50%,rgba(28,26,38,.55) 100%)" }}/>
    {children}
  </div>
);

/* ────────────────────────────────────────────────────────────────────
   1) HOME — the chapter pulse. Single scroll. No top tabs.
   ──────────────────────────────────────────────────────────────────── */
window.HomeScreen = function HomeScreen({ onOpenEvent, onOpenChat }) {
  return (
    <Frame screenName="01 Home">
      <TopNav
        title="Pi Beta Phi"
        subtitle="Tuesday · May 7"
        rightIcons={[
          <button key="b" style={{ background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-1)", color: "var(--ink-1)" }}><Icon name="bell" size={18}/></button>,
          <Avatar key="a" name="MP" size={36} gradient={1}/>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 120px" }}>

        {/* ── HAPPENING NOW (Flare) ───────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: "1 1 auto" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#5C8A65", boxShadow: "0 0 0 4px rgba(92,138,101,.18)", flexShrink: 0 }}/>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)", whiteSpace: "nowrap" }}>Happening now</span>
          </div>
          <span style={{ fontSize: 12, color: "var(--ink-3)", whiteSpace: "nowrap", flexShrink: 0 }}>5 plans · 12 out</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", marginTop: 10, marginRight: -20, paddingRight: 20 }}>
          {[
            { title: "Tanning on Cowell", host: "Lily K.", g: 1, going: 4, ttl: "ends in 2h", c: "linear-gradient(135deg,#E6C788,#C9A86B 60%,#9A7D3F)" },
            { title: "Trader Joe's run", host: "Nora T.", g: 2, going: 2, ttl: "ends in 45m", c: "linear-gradient(135deg,#DCE7DD,#5C8A65)" },
            { title: "Coupa study sesh", host: "Ava R.", g: 3, going: 6, ttl: "ends in 3h", c: "linear-gradient(135deg,#B8A6E8,#6B5BCB)" },
            { title: "Love Island watch", host: "Sam G.", g: 4, going: 3, ttl: "ends 11pm", c: "linear-gradient(135deg,#E8B5B5,#C77B7B)" },
          ].map((f, i) => (
            <div key={i} style={{ flex: "0 0 200px", background: "var(--bone)", borderRadius: 20, padding: 12, boxShadow: "var(--shadow-1)" }}>
              <div style={{ height: 84, borderRadius: 14, background: f.c, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 40%,rgba(28,26,38,.5) 100%)" }}/>
                <div style={{ position: "absolute", left: 10, bottom: 8, color: "var(--bone)", fontSize: 10, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9, whiteSpace: "nowrap" }}>{f.ttl}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-1)", marginTop: 10, lineHeight: 1.2 }}>{f.title}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, flex: "1 1 auto" }}>
                  <Avatar name={f.host} size={20} gradient={f.g}/>
                  <span style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>+{f.going - 1}</span>
                </div>
                <span style={{ background: "var(--ink-1)", color: "var(--bone)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999, flexShrink: 0 }}>Join</span>
              </div>
            </div>
          ))}
          {/* Start a Flare card */}
          <button style={{
            flex: "0 0 140px", background: "transparent", border: "1.5px dashed var(--ink-4)",
            borderRadius: 20, padding: 12, color: "var(--ink-2)", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--ink-1)", color: "var(--bone)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="plus" size={18} color="var(--bone)"/>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Start a plan</span>
            <span style={{ fontSize: 10, color: "var(--ink-3)" }}>auto-expires</span>
          </button>
        </div>

        {/* ── PINNED EVENT (the moment) ────────────────────────────────── */}
        <Section title="This Friday">
          <button onClick={onOpenEvent} style={{ width: "100%", padding: 0, border: 0, background: "var(--bone)", borderRadius: 24, boxShadow: "var(--shadow-1)", overflow: "hidden", textAlign: "left", cursor: "pointer", flexShrink: 0 }}>
            <PhotoTile cover={COVERS.retreat} h={190} style={{ borderRadius: "24px 24px 0 0", boxShadow: "none" }}>
              <div style={{ position: "absolute", left: 14, top: 14 }}>
                <Badge tone="ink"><Icon name="pinFilled" size={11} color="currentColor"/> Pinned</Badge>
              </div>
              <div style={{ position: "absolute", right: 14, top: 14, background: "rgba(251,247,238,.92)", borderRadius: 12, padding: "6px 10px", textAlign: "center", minWidth: 44 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>May</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1, color: "var(--ink-1)" }}>9</div>
              </div>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Sisterhood retreat</div>
                <div style={{ fontSize: 12, opacity: .9, marginTop: 2 }}>Maya's house · 7pm</div>
              </div>
            </PhotoTile>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
              <AvatarStack names={["Maya P", "Lily K", "Nora T", "Ava R"]} extra={24}/>
              <span style={{ background: "var(--ink-1)", color: "var(--bone)", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>RSVP</span>
            </div>
          </button>
        </Section>

        {/* ── Upcoming compact ──────────────────────────────────────────── */}
        <Section title="Upcoming" action="Calendar →" tight>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { d: "Mon", n: "12", t: "Chapter meeting", s: "House library · 8pm", c: "var(--lavender-bg)" },
              { d: "Wed", n: "14", t: "Bake sale (philanthropy)", s: "The Quad · 11–3", c: "var(--gold-bg)" },
              { d: "Thu", n: "15", t: "Alumni mixer", s: "Greek row · 6pm", c: "var(--dusty-bg)" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bone)", borderRadius: 16, padding: 12, boxShadow: "var(--shadow-1)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: e.c, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--ink-1)" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", color: "var(--ink-2)", textTransform: "uppercase" }}>{e.d}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1 }}>{e.n}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{e.t}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{e.s}</div>
                </div>
                <Icon name="chev" size={16} color="var(--ink-4)"/>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Group chat preview ────────────────────────────────────────── */}
        <Section title="Chapter chat" action="Open →" tight>
          <button onClick={onOpenChat} style={{ width: "100%", border: 0, background: "var(--bone)", borderRadius: 20, padding: "12px 14px", boxShadow: "var(--shadow-1)", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { n: "Maya P.", t: "heads up — retreat moved to 7pm", time: "2m", g: 0 },
              { n: "Lily K.", t: "ok bringing snacks 🤍", time: "1m", g: 1 },
              { n: "Nora T.", t: "carpooling? meet at house 6:30", time: "now", g: 2 },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar name={m.n} size={22} gradient={m.g}/>
                <span style={{ fontSize: 13, color: "var(--ink-1)" }}><b style={{ fontWeight: 600 }}>{m.n}</b> <span style={{ color: "var(--ink-2)" }}>{m.t}</span></span>
                <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-3)" }}>{m.time}</span>
              </div>
            ))}
          </button>
        </Section>

        {/* ── Dues + tasks lite (single calm card) ───────────────────────── */}
        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: "var(--bone)", borderRadius: 18, padding: 14, boxShadow: "var(--shadow-1)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}>Dues · May</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, marginTop: 6, color: "var(--ink-1)" }}>$120</div>
            <div style={{ height: 4, background: "var(--linen)", borderRadius: 999, marginTop: 10 }}>
              <div style={{ width: "67%", height: "100%", background: "var(--grad-iris)", borderRadius: 999 }}/>
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>40/60 paid</div>
          </div>
          <div style={{ background: "var(--bone)", borderRadius: 18, padding: 14, boxShadow: "var(--shadow-1)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}>Your tasks</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, marginTop: 6, color: "var(--ink-1)" }}>2 left</div>
            <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
              <span style={{ flex: 1, height: 4, background: "var(--ink-1)", borderRadius: 999 }}/>
              <span style={{ flex: 1, height: 4, background: "var(--ink-1)", borderRadius: 999 }}/>
              <span style={{ flex: 1, height: 4, background: "var(--linen)", borderRadius: 999 }}/>
              <span style={{ flex: 1, height: 4, background: "var(--linen)", borderRadius: 999 }}/>
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>retreat fee · bedding</div>
          </div>
        </div>

        {/* ── Leaderboard snapshot ─────────────────────────────────────── */}
        <Section title="The board" action="Full board →" tight>
          <div style={{ background: "var(--grad-iris)", borderRadius: 20, padding: 16, color: "var(--bone)", boxShadow: "var(--shadow-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {[
                { r: 1, n: "Maya P.", p: 1240, g: 0, gold: true },
                { r: 2, n: "Lily K.", p: 980, g: 1 },
                { r: 3, n: "Nora T.", p: 875, g: 2 },
              ].map(p => (
                <div key={p.r} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ position: "relative" }}>
                    <Avatar name={p.n} size={44} gradient={p.g} ring={p.gold}/>
                    {p.gold && <span style={{ position: "absolute", top: -4, right: -4, background: "var(--grad-gold)", color: "var(--bone)", borderRadius: 999, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, border: "2px solid var(--iris-deep)" }}>1</span>}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{p.n}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: .85 }}>{p.p.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Photo memories ─────────────────────────────────────────── */}
        <Section title="Recent memories" action="See all →" tight>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", marginRight: -20, paddingRight: 20 }}>
            {[
              { title: "Big-little reveal", c: COVERS.philanthropy, count: 32 },
              { title: "Spring formal", c: COVERS.formal, count: 84 },
              { title: "Beach day", c: COVERS.beach, count: 56 },
              { title: "Date party", c: COVERS.mixer, count: 48 },
            ].map((m, i) => (
              <div key={i} style={{ flex: "0 0 144px" }}>
                <PhotoTile cover={m.c} h={180} style={{ borderRadius: 18 }}>
                  <div style={{ position: "absolute", left: 10, bottom: 10, right: 10, color: "var(--bone)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.1, letterSpacing: "-.01em" }}>{m.title}</div>
                    <div style={{ fontSize: 11, opacity: .85, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><Icon name="camera" size={11} color="currentColor"/>{m.count} photos</div>
                  </div>
                </PhotoTile>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <TabBar active="home"/>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   2) CALENDAR — social pulse. Vertical agenda. Photos + attendees + react.
   ──────────────────────────────────────────────────────────────────── */
window.CalendarScreen = function CalendarScreen({ onOpenEvent, onCreate }) {
  return (
    <Frame screenName="02 Calendar">
      <TopNav
        title="May"
        subtitle="14 events · 5 happening"
        rightIcons={[
          <button key="s" style={{ background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-1)", color: "var(--ink-1)" }}><Icon name="search" size={18}/></button>,
          <button key="p" onClick={onCreate} style={{ background: "var(--ink-1)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)" }}><Icon name="plus" size={18}/></button>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>

        {/* horizontal week strip */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginRight: -20, paddingRight: 20, marginBottom: 20 }}>
          {[
            { d: "Mon", n: 5 }, { d: "Tue", n: 6 }, { d: "Wed", n: 7, today: true }, { d: "Thu", n: 8 },
            { d: "Fri", n: 9, dot: "iris" }, { d: "Sat", n: 10 }, { d: "Sun", n: 11 }, { d: "Mon", n: 12, dot: "iris" },
            { d: "Tue", n: 13 }, { d: "Wed", n: 14, dot: "gold" },
          ].map((d, i) => (
            <div key={i} style={{ flex: "0 0 44px", textAlign: "center", padding: "8px 4px", borderRadius: 14, background: d.today ? "var(--ink-1)" : "transparent", color: d.today ? "var(--bone)" : "var(--ink-1)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: d.today ? .8 : .55, textTransform: "uppercase", letterSpacing: ".06em" }}>{d.d}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1, marginTop: 4 }}>{d.n}</div>
              <div style={{ height: 6, marginTop: 6, display: "flex", justifyContent: "center" }}>
                {d.dot && <span style={{ width: 5, height: 5, borderRadius: 999, background: d.dot === "iris" ? "var(--iris)" : "var(--gold)" }}/>}
              </div>
            </div>
          ))}
        </div>

        {/* event cards — each one is a moment */}
        {[
          { day: "Friday May 9 · 7pm", title: "Sisterhood retreat", loc: "Maya's house", cover: COVERS.retreat, going: 28, react: 12, comments: 8, tag: "Pinned" },
          { day: "Monday May 12 · 8pm", title: "Chapter meeting", loc: "House library", cover: COVERS.alumni, going: 42, react: 4, comments: 2, tag: "Mandatory" },
          { day: "Wednesday May 14 · 11am", title: "Bake sale", loc: "The Quad", cover: COVERS.philanthropy, going: 18, react: 22, comments: 14, tag: "Philanthropy" },
        ].map((e, i) => (
          <button key={i} onClick={i === 0 ? onOpenEvent : undefined} style={{ width: "100%", border: 0, padding: 0, background: "var(--bone)", borderRadius: 24, boxShadow: "var(--shadow-1)", overflow: "hidden", textAlign: "left", cursor: "pointer", marginBottom: 14, flexShrink: 0 }}>
            <PhotoTile cover={e.cover} h={150} style={{ borderRadius: "24px 24px 0 0", boxShadow: "none" }}>
              <div style={{ position: "absolute", left: 14, top: 14 }}>
                <Badge tone={e.tag === "Pinned" ? "ink" : e.tag === "Mandatory" ? "danger" : "gold"}>{e.tag}</Badge>
              </div>
              <div style={{ position: "absolute", left: 14, bottom: 12, right: 14, color: "var(--bone)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>{e.day}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, letterSpacing: "-.01em", marginTop: 4 }}>{e.title}</div>
                <div style={{ fontSize: 12, opacity: .85, marginTop: 2 }}>{e.loc}</div>
              </div>
            </PhotoTile>
            {/* social row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
              <AvatarStack names={["A","B","C","D"]} extra={e.going - 4}/>
              <div style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--ink-3)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><Icon name="heart" size={14} color="var(--rose)"/>{e.react}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}><Icon name="chat" size={14}/>{e.comments}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <TabBar active="calendar"/>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   3) EVENT DETAIL — full-bleed cover, RSVP card, photo album, tasks
   ──────────────────────────────────────────────────────────────────── */
window.EventScreen = function EventScreen({ onBack }) {
  const [rsvp, setRsvp] = useState("yes");
  const [tasks, setTasks] = useState([
    { done: true, label: "Sign liability waiver", by: "Maya P" },
    { done: true, label: "Confirm ride share", by: "Lily K" },
    { done: false, label: "Bring extra bedding", by: "you" },
    { done: false, label: "Pay $35 retreat fee", by: "you" },
  ]);
  return (
    <Frame screenName="03 Event">
      <div style={{ position: "relative", height: 320, marginTop: -54, paddingTop: 54, background: COVERS.retreat }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,.15) 0%,rgba(28,26,38,0) 30%,rgba(28,26,38,.7) 100%)" }}/>
        <div style={{ position: "relative", padding: "16px 20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)", boxShadow: "var(--shadow-1)" }}><Icon name="back" size={18}/></button>
          <button style={{ background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)" }}><Icon name="options" size={18}/></button>
        </div>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 22, color: "var(--bone)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .9 }}>Friday May 9 · 7:00 PM</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 1.05, letterSpacing: "-.02em", marginTop: 6 }}>Sisterhood retreat</div>
          <div style={{ fontSize: 14, opacity: .85, marginTop: 4 }}>Maya's house — Lake Geneva</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 140px", marginTop: -28 }}>
        <div style={{ background: "var(--bone)", borderRadius: 24, padding: 16, boxShadow: "var(--shadow-2)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>You're</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, marginTop: 2, color: "var(--ink-1)", whiteSpace: "nowrap" }}>{rsvp === "yes" ? "Going" : rsvp === "maybe" ? "Maybe" : "Not going"}</div>
            </div>
            <Avatar name="Me" size={40} gradient={1} ring/>
          </div>
          <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--cream)", borderRadius: 999, boxShadow: "var(--shadow-inset)" }}>
            {[["yes","Going"],["maybe","Maybe"],["no","Can't"]].map(([k,l]) => (
              <button key={k} onClick={() => setRsvp(k)} style={{ flex: 1, border: 0, padding: "9px 0", borderRadius: 999, fontSize: 13, fontWeight: 600, background: rsvp === k ? "var(--ink-1)" : "transparent", color: rsvp === k ? "var(--bone)" : "var(--ink-3)", cursor: "pointer", transition: "all .16s var(--ease-out)" }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button variant="light" size="sm" icon={<Icon name="calendar" size={16}/>} style={{ whiteSpace: "nowrap" }}>Calendar</Button>
          <Button variant="light" size="sm" icon={<Icon name="map" size={16}/>} style={{ whiteSpace: "nowrap" }}>Directions</Button>
          <Button variant="light" size="sm" icon={<Icon name="send" size={16}/>} style={{ whiteSpace: "nowrap" }}>Share</Button>
        </div>

        {/* Photo album */}
        <Section title="Album" action="Add photo" tight>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            <PhotoTile cover={COVERS.beach} h={84} style={{ borderRadius: 12 }}/>
            <PhotoTile cover={COVERS.philanthropy} h={84} style={{ borderRadius: 12 }}/>
            <PhotoTile cover={COVERS.formal} h={84} style={{ borderRadius: 12 }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(28,26,38,.55)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)", fontFamily: "var(--font-display)", fontSize: 22 }}>+18</div>
            </PhotoTile>
          </div>
        </Section>

        {/* Tasks */}
        <Section title="Your tasks" tight>
          <div style={{ background: "var(--bone)", borderRadius: 20, padding: "8px 16px 8px", boxShadow: "var(--shadow-1)" }}>
            {tasks.map((t, i) => (
              <TaskRow key={i} done={t.done} label={t.label} by={t.by}
                onToggle={() => setTasks(arr => arr.map((x, j) => j === i ? { ...x, done: !x.done } : x))}/>
            ))}
          </div>
        </Section>

        <Section title="Going · 28/60" tight>
          <div style={{ background: "var(--bone)", borderRadius: 20, padding: "4px 0", boxShadow: "var(--shadow-1)" }}>
            <MemberRow name="Maya P." sub="Host · bringing snacks" points="" gradient={0}/>
            <MemberRow name="Lily K." sub="Driving · 4 seats" points="" gradient={1}/>
            <MemberRow name="Nora T." sub="Joining late" points="" gradient={2}/>
          </div>
        </Section>
      </div>
      <TabBar active="calendar"/>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   4) CHAT — list of threads
   ──────────────────────────────────────────────────────────────────── */
window.MessagingScreen = function MessagingScreen({ onOpenThread }) {
  return (
    <Frame screenName="04 Chat">
      <TopNav
        title="Messages"
        subtitle="3 unread"
        rightIcons={[
          <button key="b" style={{ background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-1)", color: "var(--ink-1)" }}><Icon name="search" size={18}/></button>,
          <button key="p" style={{ background: "var(--ink-1)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)" }}><Icon name="plus" size={18}/></button>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        {/* Featured: chapter chat */}
        <button onClick={onOpenThread} style={{ width: "100%", border: 0, background: "var(--grad-iris)", borderRadius: 22, padding: 16, color: "var(--bone)", boxShadow: "var(--shadow-2)", textAlign: "left", cursor: "pointer", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(251,247,238,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="sparkle" size={22} color="var(--bone)"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Chapter</div>
              <div style={{ fontSize: 11, opacity: .85 }}>60 sisters</div>
            </div>
            <span style={{ background: "var(--bone)", color: "var(--ink-1)", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999 }}>3</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.4, opacity: .9 }}><b style={{ fontWeight: 600 }}>Maya:</b> heads up — retreat moved to 7pm</div>
        </button>

        {/* Threads */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { name: "Sisterhood retreat", last: "Lily: ok bringing snacks", time: "12m", unread: 2, g: 1, group: true, isEvent: true },
            { name: "Pledge class · Spring '26", last: "Nora: streak day 35", time: "1h", unread: 0, g: 2 },
            { name: "Exec", last: "Ava: dues reminder draft attached", time: "3h", unread: 0, g: 3 },
            { name: "Maya P.", last: "see you Friday 🤍", time: "Yest", unread: 0, g: 0 },
            { name: "Bake sale committee", last: "Tess: who's bringing the table?", time: "Mon", unread: 0, g: 4 },
          ].map((m, i) => (
            <div key={i} style={{ background: "var(--bone)", borderRadius: 16, padding: 12, boxShadow: "var(--shadow-1)", display: "flex", gap: 12, alignItems: "center" }}>
              {m.isEvent ? (
                <div style={{ width: 42, height: 42, borderRadius: 12, background: COVERS.retreat, position: "relative", overflow: "hidden", flex: "0 0 42px" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0),rgba(28,26,38,.4))" }}/>
                </div>
              ) : <Avatar name={m.name} size={42} gradient={m.g}/>}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.last}</div>
              </div>
              {m.unread > 0 && <div style={{ background: "var(--iris)", color: "var(--bone)", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, minWidth: 22, textAlign: "center" }}>{m.unread}</div>}
            </div>
          ))}
        </div>
      </div>
      <TabBar active="chat"/>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   5) CHAT THREAD — chapter chat opened
   ──────────────────────────────────────────────────────────────────── */
window.ThreadScreen = function ThreadScreen({ onBack }) {
  return (
    <Frame screenName="05 Thread">
      <TopNav
        title="Chapter"
        subtitle="60 sisters"
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={onBack}
        serif={false}
        rightIcons={[
          <button key="o" style={{ background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)", boxShadow: "var(--shadow-1)" }}><Icon name="options" size={18}/></button>,
        ]}
      />
      {/* Pinned banner */}
      <div style={{ background: "var(--lavender-bg)", padding: "8px 20px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--hairline)" }}>
        <Icon name="pinFilled" size={12} color="var(--iris-deep)"/>
        <span style={{ fontSize: 12, color: "var(--iris-deep)", flex: 1 }}>Retreat moved to 7pm — Maya</span>
        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>2m</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 16px 130px" }}>
        <MessageBubble system text="Tuesday · 11:42 AM"/>
        <MessageBubble from="Maya P." text="heads up — retreat moved to 7pm"/>
        <MessageBubble from="Maya P." text="please rsvp by tonight"/>
        <MessageBubble from="Lily K." text="ok bringing snacks 🤍"/>
        <MessageBubble mine text="omw with bedding" time="now"/>
        <MessageBubble from="Nora T." text="carpooling? meet at house 6:30"/>
        {/* Reaction strip on a message */}
        <div style={{ marginLeft: 12, marginTop: -2, marginBottom: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--bone)", borderRadius: 999, padding: "2px 8px", fontSize: 11, color: "var(--ink-2)", boxShadow: "var(--shadow-1)" }}>🤍 4</span>
        </div>
      </div>
      {/* Composer */}
      <div style={{
        position: "absolute", left: 12, right: 12, bottom: 14, zIndex: 10,
        background: "rgba(246,240,228,.92)", backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderRadius: 28, padding: "10px 12px",
        boxShadow: "var(--shadow-2)", border: "1px solid var(--hairline)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--bone)", border: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)" }}><Icon name="camera" size={18}/></button>
        <div style={{ flex: 1, background: "var(--bone)", borderRadius: 999, padding: "8px 14px", fontSize: 14, color: "var(--ink-3)", boxShadow: "var(--shadow-inset)" }}>Message…</div>
        <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--ink-1)", border: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)" }}><Icon name="send" size={16}/></button>
      </div>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   6) ALUMNAE — directory + featured + jobs
   ──────────────────────────────────────────────────────────────────── */
window.AlumnaeScreen = function AlumnaeScreen() {
  return (
    <Frame screenName="06 Alumnae">
      <TopNav
        title="Alumnae"
        subtitle="284 sisters · 9 hiring"
        rightIcons={[
          <button key="s" style={{ background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-1)", color: "var(--ink-1)" }}><Icon name="search" size={18}/></button>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        {/* Featured alumna */}
        <div style={{ background: COVERS.alumni, borderRadius: 28, padding: 18, color: "var(--bone)", boxShadow: "var(--shadow-2)", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .85 }}>This week's alumna</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.15, marginTop: 6, fontStyle: "italic" }}>“Reach out — I always reply.”</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
            <Avatar name="Rachel D" size={48} gradient={3} ring/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>Rachel Diaz, '19</div>
              <div style={{ fontSize: 12, opacity: .85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Sr. PMM at Figma · SF</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <span style={{ background: "var(--bone)", color: "var(--ink-1)", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>Request intro</span>
            <span style={{ background: "rgba(251,247,238,.18)", color: "var(--bone)", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, border: "1px solid rgba(251,247,238,.4)", whiteSpace: "nowrap" }}>Coffee chat</span>
          </div>
        </div>

        {/* Filter pills (lightweight) */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginTop: 18, marginRight: -20, paddingRight: 20 }}>
          {["All", "Hiring", "Mentoring", "By major", "By city"].map((f, i) => (
            <span key={f} style={{ flex: "0 0 auto", padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500, background: i === 0 ? "var(--ink-1)" : "var(--bone)", color: i === 0 ? "var(--bone)" : "var(--ink-2)", boxShadow: i === 0 ? "none" : "var(--shadow-1)", whiteSpace: "nowrap" }}>{f}</span>
          ))}
        </div>

        {/* Open positions strip */}
        <Section title="Open at sisters' companies" action="See all →" tight>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", marginRight: -20, paddingRight: 20 }}>
            {[
              { co: "Figma", role: "PMM intern", loc: "SF", who: "Rachel D, '19", g: 3 },
              { co: "Stripe", role: "SWE intern", loc: "Remote", who: "Iris W, '20", g: 5 },
              { co: "Goldman", role: "Summer analyst", loc: "NYC", who: "Tess M, '18", g: 4 },
            ].map((j, i) => (
              <div key={i} style={{ flex: "0 0 220px", background: "var(--bone)", borderRadius: 18, padding: 14, boxShadow: "var(--shadow-1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--ink-1)", color: "var(--bone)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="briefcase" size={14}/>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.co} · {j.loc}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-1)", marginTop: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, minWidth: 0 }}>
                  <Avatar name={j.who} size={20} gradient={j.g}/>
                  <span style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>via {j.who}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Directory */}
        <Section title="Directory" tight>
          <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
            {[
              { n: "Rachel Diaz", y: "'19", role: "Sr. PMM, Figma", loc: "SF", g: 3, hiring: true },
              { n: "Iris Wong", y: "'20", role: "SWE, Stripe", loc: "Remote", g: 5, hiring: true },
              { n: "Tess Morgan", y: "'18", role: "Analyst, Goldman", loc: "NYC", g: 4, hiring: true },
              { n: "Mia Levin", y: "'17", role: "Resident, Stanford Med", loc: "Palo Alto", g: 2 },
              { n: "Jules Hart", y: "'16", role: "Founder, Patchwork", loc: "LA", g: 0 },
            ].map((a, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)" }}>
                <Avatar name={a.n} size={42} gradient={a.g}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{a.n}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--ink-3)" }}>{a.y}</span>
                    {a.hiring && <Badge tone="success">hiring</Badge>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.role} · {a.loc}</div>
                </div>
                <Icon name="chev" size={16} color="var(--ink-4)"/>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <TabBar active="alumnae"/>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   7) PROFILE — identity + wallet stack + contribution + 2-exec approval
   ──────────────────────────────────────────────────────────────────── */
window.ProfileScreen = function ProfileScreen() {
  return (
    <Frame screenName="07 Profile">
      <TopNav title="" leftIcon={<Icon name="back" size={18}/>} rightIcons={[
        <button key="o" style={{ background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)", boxShadow: "var(--shadow-1)" }}><Icon name="options" size={18}/></button>
      ]} transparent/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8, textAlign: "center" }}>
          <Avatar name="Maya Park" size={88} gradient={1} ring/>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.05, marginTop: 14, color: "var(--ink-1)", whiteSpace: "nowrap" }}>Maya Park</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>Spring '24 · Junior · Marketing</div>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Badge tone="exec">EXEC · VP</Badge>
            <Badge tone="gold" icon={<Icon name="sparkle" size={11} color="var(--gold-deep)"/>}>Top contributor</Badge>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 10, marginTop: 22 }}>
          <PointsTile icon="sparkle" value="847" label="Points" variant="iris"/>
          <PointsTile icon="flame" value="5w" label="Streak" variant="rose" small/>
          <PointsTile icon="check" value="92%" label="Attend" variant="ink" small/>
        </div>

        {/* 2-exec approval queue */}
        <Section title="Approvals" action="3 pending" tight>
          <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
            {[
              { who: "Lily K.", what: "+50 pts · led bake sale", needs: "1 of 2 approvals" },
              { who: "Ava R.", what: "+30 pts · designed flyers", needs: "0 of 2 approvals" },
            ].map((a, i, arr) => (
              <div key={i} style={{ padding: "12px 16px", borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={a.who} size={32} gradient={i + 1}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-1)" }}>{a.what}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)" }}>requested by {a.who} · {a.needs}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <Button variant="iris" size="sm">Approve</Button>
                  <Button variant="secondary" size="sm">Hold</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="This semester" tight>
          <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
            {[
              ["Events attended", "12 of 14"],
              ["Tasks completed", "38"],
              ["Dues", "Paid · May"],
              ["Volunteer hours", "16h"],
            ].map(([k, v], i, a) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", borderBottom: i === a.length - 1 ? 0 : "1px solid var(--hairline)" }}>
                <span style={{ fontSize: 15, color: "var(--ink-1)" }}>{k}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 14, color: "var(--ink-2)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <TabBar active="me"/>
    </Frame>
  );
};

Object.assign(window, {
  HomeScreen: window.HomeScreen,
  CalendarScreen: window.CalendarScreen,
  EventScreen: window.EventScreen,
  MessagingScreen: window.MessagingScreen,
  ThreadScreen: window.ThreadScreen,
  AlumnaeScreen: window.AlumnaeScreen,
  ProfileScreen: window.ProfileScreen,
});
