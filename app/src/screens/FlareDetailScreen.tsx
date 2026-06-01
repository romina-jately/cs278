import { useNavigate, useParams } from "react-router-dom";
import { Frame } from "../components/Frame";
import { Avatar, AvatarStack } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { useApi } from "../lib/useApi";
import { api } from "../api";

export default function FlareDetailScreen() {
  const { id = "f1" } = useParams();
  const navigate = useNavigate();
  const f = useApi(() => api.getFlare(id), [id]);

  if (!f) {
    return (
      <Frame screenName="Flare · loading">
        <div style={{ padding: 20 }}>
          <button onClick={() => navigate(-1)} style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-1)", boxShadow: "var(--shadow-1)", cursor: "pointer",
          }}>
            <Icon name="back" size={18}/>
          </button>
        </div>
      </Frame>
    );
  }

  return (
    <Frame screenName="Flare">
      <div style={{ position: "relative", height: 320, marginTop: -54, paddingTop: 54, background: f.cover }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,.15) 0%,rgba(28,26,38,0) 30%,rgba(28,26,38,.7) 100%)" }}/>
        <div style={{ position: "relative", padding: "16px 20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate(-1)} style={{
            background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-1)", boxShadow: "var(--shadow-1)", cursor: "pointer",
          }}>
            <Icon name="back" size={18}/>
          </button>
        </div>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 22, color: "var(--bone)" }}>
          <Badge tone="success">{f.ttl}</Badge>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.05, letterSpacing: "-.02em", marginTop: 10 }}>{f.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <Avatar name={f.host} size={26} gradient={f.hostGradient}/>
            <span style={{ fontSize: 13, opacity: .9 }}>hosted by {f.host}</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{
          background: "var(--bone)", borderRadius: 20, padding: 16, boxShadow: "var(--shadow-1)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>Going</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, color: "var(--ink-1)", marginTop: 4 }}>{f.going} sisters</div>
          </div>
          <AvatarStack names={["Maya P", "Lily K", "Nora T"]} extra={Math.max(0, f.going - 3)}/>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Button variant="iris" size="lg" full icon={<Icon name="check" size={17}/>}>Join</Button>
          <Button variant="ghost" size="md" full icon={<Icon name="send" size={16}/>}>Share with chapter</Button>
        </div>

        <div style={{
          marginTop: 18, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5,
          background: "var(--lavender-bg)", borderRadius: 16, padding: "12px 14px",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <Icon name="clock" size={16} color="var(--iris-deep)"/>
          <span style={{ color: "var(--iris-deep)" }}>
            Flares are short-lived plans. {f.title} {f.ttl}.
          </span>
        </div>
      </div>
    </Frame>
  );
}
