import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Button } from "../components/primitives/atoms";
import { Field, ProgressDots } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { api } from "../api";

export default function PhoneScreen() {
  const navigate = useNavigate();
  const [num, setNum] = useState("(650) 421-4471");

  async function submit() {
    await api.sendCode(num);
    navigate("/signup/verify");
  }

  return (
    <Frame screenName="Onboarding · Phone">
      <TopNav
        title=""
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate("/signup")}
        serif={false}
        transparent
        rightIcons={[<div key="p" style={{ paddingRight: 4 }}><ProgressDots count={4} active={0}/></div>]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "8px 24px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)" }}>Your number</div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.45 }}>
          We'll text you a 6-digit code to confirm it's you. This is how exec reaches the whole chapter — one number, no spam.
        </div>

        <div style={{ marginTop: 28 }}>
          <Field label="Mobile number" prefix="+1" value={num} onChange={setNum} inputMode="tel" big icon="phone"/>
        </div>

        <div style={{
          marginTop: 16, display: "flex", alignItems: "flex-start", gap: 10,
          background: "var(--lavender-bg)", borderRadius: 16, padding: "12px 14px",
        }}>
          <span style={{ color: "var(--iris-deep)", marginTop: 1 }}><Icon name="lock" size={16}/></span>
          <span style={{ fontSize: 13, color: "var(--iris-deep)", lineHeight: 1.4 }}>
            Your number stays private to exec. Sisters see your name, never your digits.
          </span>
        </div>
      </div>
      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)", borderTop: "1px solid var(--hairline-2)",
      }}>
        <Button variant="iris" size="lg" full onClick={submit} icon={<Icon name="send" size={17}/>}>Send code</Button>
        <div style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center", marginTop: 10 }}>
          Message &amp; data rates may apply.
        </div>
      </div>
    </Frame>
  );
}
