import { useNavigate } from "react-router-dom";
import { Frame } from "../components/Frame";
import { AvatarStack } from "../components/primitives/Avatar";
import { Button, LogoMark } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";

const WELCOME_HERO = "linear-gradient(165deg,#6B5BCB 0%,#4F3FA8 42%,#7E382E 100%)";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  return (
    <Frame screenName="Onboarding · Welcome">
      <div style={{
        flex: 1, position: "relative", marginTop: -54, paddingTop: 54,
        background: WELCOME_HERO, display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 70% at 80% 0%, rgba(251,247,238,.22), rgba(251,247,238,0) 55%)" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 55%,rgba(28,26,38,.45) 100%)" }}/>

        <div style={{ position: "relative", padding: "20px 24px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={32}/>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--bone)", letterSpacing: ".02em" }}>Ares</span>
        </div>

        <div style={{ position: "relative", marginTop: "auto", padding: "0 24px 28px", color: "var(--bone)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(251,247,238,.16)", border: "1px solid rgba(251,247,238,.32)",
            borderRadius: 999, padding: "6px 12px",
            fontSize: 12, fontWeight: 600, letterSpacing: ".04em",
            backdropFilter: "blur(6px)", whiteSpace: "nowrap",
          }}>
            <Icon name="sparkle" size={13} color="currentColor"/> You've been invited
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 52, lineHeight: 1, letterSpacing: "-.02em", marginTop: 16 }}>Pi Beta Phi</div>
          <div style={{ fontSize: 15, opacity: .9, marginTop: 8 }}>Stanford · California Beta</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
            <AvatarStack names={["Maya P", "Lily K", "Nora T", "Ava R"]} extra={0}/>
            <span style={{ fontSize: 13, opacity: .9, whiteSpace: "nowrap" }}>+56 sisters here</span>
          </div>
        </div>
      </div>

      <div style={{
        flex: "0 0 auto", background: "var(--cream)", borderRadius: "28px 28px 0 0",
        marginTop: -28, position: "relative",
        padding: "22px 20px calc(22px + env(safe-area-inset-bottom))",
      }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-1)", lineHeight: 1.1, letterSpacing: "-.01em" }}>
          Maya invited you — let's get you in.
        </div>
        <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.45 }}>
          Ares runs on your number. No passwords, no random group chats — just your chapter.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Button variant="iris" size="lg" full onClick={() => navigate("/signup/phone")} icon={<Icon name="phone" size={18}/>}>
            Continue with phone
          </Button>
          <Button variant="ghost" size="md" full onClick={() => navigate("/signup/phone")}>
            I have an invite code
          </Button>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center", marginTop: 12, lineHeight: 1.45 }}>
          By continuing you agree to Ares' terms &amp; privacy policy.
        </div>
      </div>
    </Frame>
  );
}
