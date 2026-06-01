import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Button } from "../components/primitives/atoms";
import { OTPBoxes, ProgressDots } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { api } from "../api";

export default function VerifyScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState("0418");

  async function submit() {
    const res = await api.verifyCode("(650) 421-4471", code);
    if (res.ok) navigate("/signup/setup");
  }

  return (
    <Frame screenName="Onboarding · Verify">
      <TopNav
        title=""
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate("/signup/phone")}
        serif={false}
        transparent
        rightIcons={[<div key="p" style={{ paddingRight: 4 }}><ProgressDots count={4} active={1}/></div>]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "8px 24px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)" }}>Enter the code</div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.45 }}>
          Sent to <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-1)", fontWeight: 500 }}>(650) •••-4471</span>
        </div>

        <div style={{ marginTop: 32 }}>
          <OTPBoxes value={code} length={6}/>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {["1","2","3"].map(n => (
            <button key={n} onClick={() => setCode(c => (c + n).slice(0, 6))} style={{
              width: 56, height: 44, borderRadius: 12, border: 0, background: "var(--bone)",
              boxShadow: "var(--shadow-1)", fontFamily: "var(--font-mono)", fontSize: 20,
              color: "var(--ink-1)", cursor: "pointer",
            }}>{n}</button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
          <button onClick={() => setCode(c => c.slice(0, -1))} style={{
            width: 56, height: 44, borderRadius: 12, border: 0, background: "transparent",
            color: "var(--ink-3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="back" size={18}/>
          </button>
          <button onClick={() => setCode("041826")} style={{
            width: 120, height: 44, borderRadius: 12, border: 0, background: "var(--bone)",
            boxShadow: "var(--shadow-1)", fontSize: 13, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer",
          }}>autofill</button>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 20, textAlign: "center", fontSize: 13, color: "var(--ink-3)" }}>
          Didn't get it? <span style={{ color: "var(--ink-4)" }}>Resend in <span style={{ fontFamily: "var(--font-mono)" }}>0:24</span></span>
        </div>
      </div>
      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)", borderTop: "1px solid var(--hairline-2)",
      }}>
        <Button variant="iris" size="lg" full onClick={submit}>Verify</Button>
      </div>
    </Frame>
  );
}
