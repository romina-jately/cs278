/* global React, Icon, Avatar, AvatarStack, Button, Badge */

window.EventCard = function EventCard({ event, onOpen, big = false }) {
  return (
    <button onClick={onOpen} style={{
      width: "100%", textAlign: "left", border: 0, padding: 0,
      background: "var(--bone)", borderRadius: 24,
      boxShadow: "var(--shadow-1)", overflow: "hidden",
      cursor: "pointer", flexShrink: 0,
    }}>
      <div style={{
        height: big ? 180 : 110,
        background: event.cover || "linear-gradient(135deg,#E6C788,#C9A86B 60%,#9A7D3F)",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 50%,rgba(28,26,38,.55) 100%)" }}/>
        <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 6 }}>
          {event.tags?.map(t => <Badge key={t.label} tone={t.tone || "ink"}>{t.label}</Badge>)}
        </div>
        {event.dayBadge && (
          <div style={{
            position: "absolute", right: 14, top: 14,
            background: "rgba(251,247,238,.92)", borderRadius: 12,
            padding: "6px 10px", textAlign: "center", minWidth: 44,
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>{event.dayBadge.month}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1, color: "var(--ink-1)" }}>{event.dayBadge.day}</div>
          </div>
        )}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--iris)", letterSpacing: ".08em", textTransform: "uppercase" }}>{event.eyebrow}</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: big ? 26 : 22, lineHeight: 1.1, letterSpacing: "-0.01em", margin: "4px 0 4px", color: "var(--ink-1)" }}>{event.title}</div>
        <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{event.location}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
          <AvatarStack names={event.attendees || []} extra={event.extra}/>
          {event.cta && <span style={{ background: "var(--ink-1)", color: "var(--bone)", padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>{event.cta}</span>}
        </div>
      </div>
    </button>
  );
};

window.DuesCard = function DuesCard({ amount = 120, paid = 40, total = 60, due = "Friday", onPay }) {
  const pct = Math.round((paid / total) * 100);
  return (
    <div style={{
      background: "var(--bone)", borderRadius: 24, padding: 18,
      boxShadow: "var(--shadow-1)", flexShrink: 0,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>Dues · May</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 4, color: "var(--ink-1)" }}>${amount}</div>
        </div>
        <Badge tone="warning">Due {due}</Badge>
      </div>
      <div style={{ marginTop: 16, marginBottom: 8, height: 6, background: "var(--linen)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: "var(--grad-iris)", borderRadius: 999 }}/>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <span style={{ fontSize: 13, color: "var(--ink-2)" }}><span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--ink-1)" }}>{paid}</span> of {total} paid · {total - paid} to go</span>
        <Button variant="primary" size="sm" onClick={onPay}>Pay</Button>
      </div>
    </div>
  );
};

window.PointsTile = function PointsTile({ icon, value, label, variant = "iris", small = false }) {
  const bgs = {
    iris: "var(--grad-iris)",
    gold: "var(--grad-gold)",
    rose: "var(--grad-rose)",
    ink: "linear-gradient(180deg,#2D2A36,#1C1A26)",
  };
  return (
    <div style={{
      background: bgs[variant], borderRadius: 20, padding: 14,
      color: "var(--bone)", display: "flex", flexDirection: "column", justifyContent: "space-between",
      height: small ? 110 : 132, position: "relative", overflow: "hidden",
      boxShadow: variant === "gold" ? "var(--shadow-gold)" : "var(--shadow-2)", flexShrink: 0,
    }}>
      {icon && <div style={{ position: "absolute", top: 12, right: 12, opacity: .55 }}><Icon name={icon} size={20} color="currentColor"/></div>}
      <div></div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: small ? 30 : 38, lineHeight: 1, letterSpacing: "-.03em" }}>{value}</div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .85, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
};

window.MemberRow = function MemberRow({ rank, name, sub, points, gradient = 0, gold = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--hairline)" }}>
      {rank && <span style={{ width: 22, fontFamily: "var(--font-mono)", fontSize: 13, color: gold ? "var(--gold-deep)" : "var(--ink-3)", fontWeight: 600 }}>{rank}</span>}
      <Avatar name={name} size={38} gradient={gradient} ring={gold}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{name}</div>
        <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{sub}</div>
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--ink-1)", fontWeight: 500 }}>{points}</span>
    </div>
  );
};

window.MessageBubble = function MessageBubble({ from, text, mine = false, time, system = false }) {
  if (system) {
    return <div style={{ textAlign: "center", margin: "12px 0", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".04em" }}>{text}</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: mine ? "flex-end" : "flex-start", margin: "6px 0" }}>
      {!mine && from && <span style={{ fontSize: 11, color: "var(--ink-3)", marginLeft: 12, marginBottom: 2 }}>{from}</span>}
      <div style={{
        background: mine ? "var(--ink-1)" : "var(--bone)",
        color: mine ? "var(--bone)" : "var(--ink-1)",
        padding: "10px 14px", borderRadius: 20,
        borderBottomRightRadius: mine ? 6 : 20,
        borderBottomLeftRadius: mine ? 20 : 6,
        maxWidth: "78%", fontSize: 15, lineHeight: 1.35,
        boxShadow: mine ? "none" : "var(--shadow-1)",
      }}>{text}</div>
      {time && <span style={{ fontSize: 10, color: "var(--ink-3)", margin: "2px 12px 0" }}>{time}</span>}
    </div>
  );
};

window.TaskRow = function TaskRow({ done, label, by, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      display: "flex", alignItems: "center", gap: 12,
      width: "100%", border: 0, background: "transparent", padding: "10px 0",
      borderBottom: "1px solid var(--hairline)", cursor: "pointer",
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        background: done ? "var(--iris)" : "transparent",
        border: done ? "0" : "1.5px solid var(--ink-4)",
        display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 22px",
        transition: "background .16s var(--ease-out)",
      }}>
        {done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FBF7EE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>}
      </div>
      <span style={{ flex: 1, fontSize: 15, color: done ? "var(--ink-3)" : "var(--ink-1)", textDecoration: done ? "line-through" : "none", textAlign: "left" }}>{label}</span>
      {by && <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{by}</span>}
    </button>
  );
};

Object.assign(window, { EventCard: window.EventCard, DuesCard: window.DuesCard, PointsTile: window.PointsTile, MemberRow: window.MemberRow, MessageBubble: window.MessageBubble, TaskRow: window.TaskRow });
