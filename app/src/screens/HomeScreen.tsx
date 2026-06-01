import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { Avatar, AvatarStack } from "../components/primitives/Avatar";
import { Badge } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { PhotoTile, SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";

export default function HomeScreen() {
  const navigate = useNavigate();
  const chapter = useApi(() => api.getChapter());
  const me = useApi(() => api.getCurrentUser());
  const flares = useApi(() => api.getFlares()) ?? [];
  const pinned = useApi(() => api.getPinnedEvent());
  const upcoming = useApi(() => api.getUpcoming()) ?? [];
  const chat = useApi(() => api.getHomeChatPreview()) ?? [];
  const dues = useApi(() => api.getDues());
  const leaderboard = useApi(() => api.getLeaderboard()) ?? [];
  const memories = useApi(() => api.getMemories()) ?? [];

  return (
    <Frame screenName="01 Home">
      <TopNav
        title={chapter?.name ?? "Pi Beta Phi"}
        subtitle={chapter?.subtitle}
        rightIcons={[
          <button key="b" style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-1)", color: "var(--ink-1)", cursor: "pointer",
          }}>
            <Icon name="bell" size={18}/>
          </button>,
          <Avatar key="a" name={me?.name ?? "MP"} size={36} gradient={me?.gradient ?? 1}/>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 120px" }}>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: "1 1 auto" }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999, background: "#5C8A65",
              boxShadow: "0 0 0 4px rgba(92,138,101,.18)", flexShrink: 0,
            }}/>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)", whiteSpace: "nowrap" }}>Happening now</span>
          </div>
          <span style={{ fontSize: 12, color: "var(--ink-3)", whiteSpace: "nowrap", flexShrink: 0 }}>{flares.length} plans · 12 out</span>
        </div>

        <div style={{ display: "flex", gap: 10, overflowX: "auto", marginTop: 10, marginRight: -20, paddingRight: 20 }}>
          {flares.map(f => (
            <button
              key={f.id}
              onClick={() => navigate(`/flares/${f.id}`)}
              style={{
                flex: "0 0 200px", background: "var(--bone)", borderRadius: 20, padding: 12,
                boxShadow: "var(--shadow-1)", border: 0, cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ height: 84, borderRadius: 14, background: f.cover, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 40%,rgba(28,26,38,.5) 100%)" }}/>
                <div style={{ position: "absolute", left: 10, bottom: 8, color: "var(--bone)", fontSize: 10, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9, whiteSpace: "nowrap" }}>{f.ttl}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-1)", marginTop: 10, lineHeight: 1.2 }}>{f.title}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, flex: "1 1 auto" }}>
                  <Avatar name={f.host} size={20} gradient={f.hostGradient}/>
                  <span style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>+{f.going - 1}</span>
                </div>
                <span style={{ background: "var(--ink-1)", color: "var(--bone)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999, flexShrink: 0 }}>Join</span>
              </div>
            </button>
          ))}
          <button onClick={() => navigate("/flares/new")} style={{
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

        {pinned && (
          <>
            <SectionHeader title="This Friday"/>
            <button onClick={() => navigate(`/events/${pinned.id}`)} style={{
              width: "100%", padding: 0, border: 0, background: "var(--bone)",
              borderRadius: 24, boxShadow: "var(--shadow-1)", overflow: "hidden",
              textAlign: "left", cursor: "pointer", flexShrink: 0,
            }}>
              <PhotoTile cover={COVERS[pinned.cover]} h={190} style={{ borderRadius: "24px 24px 0 0", boxShadow: "none" }}>
                <div style={{ position: "absolute", left: 14, top: 14 }}>
                  <Badge tone="ink" icon={<Icon name="pinFilled" size={11}/>}>Pinned</Badge>
                </div>
                {pinned.dayBadge && (
                  <div style={{
                    position: "absolute", right: 14, top: 14,
                    background: "rgba(251,247,238,.92)", borderRadius: 12,
                    padding: "6px 10px", textAlign: "center", minWidth: 44,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>{pinned.dayBadge.month}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1, color: "var(--ink-1)" }}>{pinned.dayBadge.day}</div>
                  </div>
                )}
                <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pinned.title}</div>
                  <div style={{ fontSize: 12, opacity: .9, marginTop: 2 }}>{pinned.location.split(" — ")[0]} · {pinned.time}</div>
                </div>
              </PhotoTile>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
                <AvatarStack names={pinned.attendees} extra={Math.max(0, pinned.going - pinned.attendees.length)}/>
                <span style={{ background: "var(--ink-1)", color: "var(--bone)", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>RSVP</span>
              </div>
            </button>
          </>
        )}

        <SectionHeader title="Upcoming" action="Calendar →" onAction={() => navigate("/calendar")} tight/>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.map(e => {
            const tints = { lavender: "var(--lavender-bg)", gold: "var(--gold-bg)", dusty: "var(--dusty-bg)" } as const;
            return (
              <button
                key={e.id}
                onClick={() => navigate(`/events/${e.eventId}`)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "var(--bone)", borderRadius: 16, padding: 12,
                  boxShadow: "var(--shadow-1)", border: 0, cursor: "pointer",
                  textAlign: "left", width: "100%",
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: tints[e.tint], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--ink-1)" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", color: "var(--ink-2)", textTransform: "uppercase" }}>{e.day}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1 }}>{e.dayNum}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{e.sub}</div>
                </div>
                <Icon name="chev" size={16} color="var(--ink-4)"/>
              </button>
            );
          })}
        </div>

        <SectionHeader title="Chapter chat" action="Open →" onAction={() => navigate("/threads/chapter")} tight/>
        <button onClick={() => navigate("/threads/chapter")} style={{
          width: "100%", border: 0, background: "var(--bone)", borderRadius: 20, padding: "12px 14px",
          boxShadow: "var(--shadow-1)", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6,
        }}>
          {chat.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar name={m.name} size={22} gradient={m.gradient}/>
              <span style={{ fontSize: 13, color: "var(--ink-1)" }}>
                <b style={{ fontWeight: 600 }}>{m.name}</b>{" "}
                <span style={{ color: "var(--ink-2)" }}>{m.text}</span>
              </span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-3)" }}>{m.time}</span>
            </div>
          ))}
        </button>

        {dues && (
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "var(--bone)", borderRadius: 18, padding: 14, boxShadow: "var(--shadow-1)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}>Dues · {dues.month}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, marginTop: 6, color: "var(--ink-1)" }}>${dues.amount}</div>
              <div style={{ height: 4, background: "var(--linen)", borderRadius: 999, marginTop: 10 }}>
                <div style={{ width: `${Math.round((dues.paid / dues.total) * 100)}%`, height: "100%", background: "var(--grad-iris)", borderRadius: 999 }}/>
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>{dues.paid}/{dues.total} paid</div>
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
        )}

        <SectionHeader title="The board" action="Full board →" onAction={() => navigate("/leaderboard")} tight/>
        <button onClick={() => navigate("/leaderboard")} style={{
          background: "var(--grad-iris)", borderRadius: 20, padding: 16,
          color: "var(--bone)", boxShadow: "var(--shadow-2)",
          border: 0, cursor: "pointer", width: "100%", textAlign: "left",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {leaderboard.map(p => (
              <div key={p.rank} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ position: "relative" }}>
                  <Avatar name={p.name} size={44} gradient={p.gradient} ring={p.gold}/>
                  {p.gold && (
                    <span style={{
                      position: "absolute", top: -4, right: -4, background: "var(--grad-gold)",
                      color: "var(--bone)", borderRadius: 999, width: 20, height: 20,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, border: "2px solid var(--iris-deep)",
                    }}>1</span>
                  )}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{p.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: .85 }}>{p.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </button>

        <SectionHeader title="Recent memories" action="See all →" onAction={() => navigate(`/memories/${memories[0]?.id ?? "m1"}`)} tight/>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", marginRight: -20, paddingRight: 20 }}>
          {memories.map(m => (
            <button
              key={m.id}
              onClick={() => navigate(`/memories/${m.id}`)}
              style={{ flex: "0 0 144px", border: 0, background: "transparent", padding: 0, cursor: "pointer" }}
            >
              <PhotoTile cover={COVERS[m.cover]} h={180} style={{ borderRadius: 18 }}>
                <div style={{ position: "absolute", left: 10, bottom: 10, right: 10, color: "var(--bone)", textAlign: "left" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.1, letterSpacing: "-.01em" }}>{m.title}</div>
                  <div style={{ fontSize: 11, opacity: .85, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="camera" size={11} color="currentColor"/>{m.count} photos
                  </div>
                </div>
              </PhotoTile>
            </button>
          ))}
        </div>
      </div>
      <TabBar active="home"/>
    </Frame>
  );
}
