import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Button } from "../components/primitives/atoms";
import { Field, ProgressDots } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { api } from "../api";

export default function ProfileSetupScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("Maya Park");
  const [major, setMajor] = useState("Marketing");
  const [pledge, setPledge] = useState("Spring '24");

  async function submit() {
    await api.updateProfile({ name, pledgeClass: pledge, major });
    navigate("/signup/done");
  }

  return (
    <Frame screenName="Onboarding · Profile">
      <TopNav
        title=""
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate("/signup/verify")}
        serif={false}
        transparent
        rightIcons={[<div key="p" style={{ paddingRight: 4 }}><ProgressDots count={4} active={2}/></div>]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "8px 24px 24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)" }}>Make it yours</div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.45 }}>This is what your sisters see. You can change it any time.</div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
          <button style={{ position: "relative", border: 0, background: "transparent", cursor: "pointer" }}>
            <Avatar name={name} size={96} gradient={1} ring/>
            <span style={{
              position: "absolute", right: -2, bottom: -2,
              width: 34, height: 34, borderRadius: 999,
              background: "var(--ink-1)", color: "var(--bone)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "3px solid var(--cream)",
            }}>
              <Icon name="camera" size={16} color="var(--bone)"/>
            </span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <Field label="Full name" value={name} onChange={setName} icon="user"/>
          <Field label="Pledge class" value={pledge} onChange={setPledge} icon="sparkle" hint="When you were initiated — shown next to your name."/>
          <Field label="Major" value={major} onChange={setMajor} icon="briefcase"/>
        </div>
      </div>
      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)", borderTop: "1px solid var(--hairline-2)",
      }}>
        <Button variant="iris" size="lg" full onClick={submit}>Continue</Button>
      </div>
    </Frame>
  );
}
