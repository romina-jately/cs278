import { useNavigate } from "react-router-dom";
import { Frame } from "../components/Frame";
import { Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";

const HERO = "linear-gradient(165deg,#6B5BCB 0%,#4F3FA8 42%,#7E382E 100%)";

const PEEK = [
  { t: "Sisterhood retreat", d: "Fri · 7pm", c: "linear-gradient(135deg,#E6C788,#C9A86B 60%,#7E382E)" },
  { t: "Chapter meeting", d: "Mon · 8pm", c: "linear-gradient(135deg,#8C7AE2,#4F3FA8)" },
  { t: "Bake sale", d: "Wed · 11am", c: "linear-gradient(135deg,#E8B5B5,#C77B7B)" },
];

export default function WelcomeInScreen() {
  const navigate = useNavigate();
  return (
    <Frame screenName="Onboarding · You're in">
      <div style={{
        flex: 1, marginTop: -54, paddingTop: 54, position: "relative",
        background: HERO, display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 60% at 50% 30%, rgba(251,247,238,.28), rgba(251,247,238,0) 60%)" }}/>

        <div style={{
          position: "relative", flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "0 32px", color: "var(--bone)",
        }}>
          <div style={{
            width: 84, height: 84, borderRadius: 999,
            background: "rgba(251,247,238,.16)", border: "1px solid rgba(251,247,238,.34)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(6px)", flexShrink: 0,
          }}>
            <Icon name="sparkle" size={40} color="var(--bone)"/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", opacity: .85, marginTop: 26 }}>You're in</div>
          <div style={{ width: "100%", fontFamily: "var(--font-display)", fontSize: 46, lineHeight: 1.02, letterSpacing: "-.02em", marginTop: 10 }}>
            Welcome to<br/>Pi Beta Phi
          </div>
          <div style={{ width: "100%", maxWidth: 280, fontSize: 15, opacity: .9, marginTop: 14, lineHeight: 1.45 }}>
            60 sisters, one home base. Here's what's already on this week.
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", gap: 10, padding: "0 20px 8px", overflowX: "auto" }}>
          {PEEK.map((e, i) => (
            <div key={i} style={{ flex: "0 0 130px", background: "var(--bone)", borderRadius: 16, padding: 10, boxShadow: "var(--shadow-2)" }}>
              <div style={{ height: 56, borderRadius: 10, background: e.c }}/>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-1)", marginTop: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.t}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{e.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: "0 0 auto", background: "var(--cream)", padding: "16px 20px calc(20px + env(safe-area-inset-bottom))" }}>
        <Button variant="primary" size="lg" full onClick={() => navigate("/home")} icon={<Icon name="arrow" size={18} color="var(--bone)"/>}>
          Enter chapter
        </Button>
      </div>
    </Frame>
  );
}
