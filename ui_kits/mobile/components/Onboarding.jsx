/* global React, Frame, TopNav, Icon, Avatar, AvatarStack, Button, Badge, Field, OTPBoxes, ProgressDots, Segmented, LogoMark */
const { useState: useStateOnb } = React;

/* Warm welcome hero — iris falling into the brand's golden-hour warmth. */
const WELCOME_HERO = "linear-gradient(165deg,#6B5BCB 0%,#4F3FA8 42%,#7E382E 100%)";

/* A pinned footer for the auth flow — sits below scrolling content. */
const AuthFooter = ({ children }) => (
  <div style={{ flex: "0 0 auto", padding: "12px 20px calc(20px + env(safe-area-inset-bottom))", background: "var(--cream)", borderTop: "1px solid var(--hairline-2)" }}>
    {children}
  </div>
);

/* ────────────────────────────────────────────────────────────────────
   O1) WELCOME — invite-based. Exclusive, warm. No password world.
   ──────────────────────────────────────────────────────────────────── */
window.WelcomeScreen = function WelcomeScreen({ onNext, onCode }) {
  return (
    <Frame screenName="Onboarding · Welcome">
      <div style={{ flex: 1, position: "relative", marginTop: -54, paddingTop: 54, background: WELCOME_HERO, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 70% at 80% 0%, rgba(251,247,238,.22), rgba(251,247,238,0) 55%)" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 55%,rgba(28,26,38,.45) 100%)" }}/>

        {/* brand lockup */}
        <div style={{ position: "relative", padding: "20px 24px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={32}/>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--bone)", letterSpacing: ".02em" }}>Ares</span>
        </div>

        {/* invite content */}
        <div style={{ position: "relative", marginTop: "auto", padding: "0 24px 28px", color: "var(--bone)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(251,247,238,.16)", border: "1px solid rgba(251,247,238,.32)", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", backdropFilter: "blur(6px)", whiteSpace: "nowrap" }}>
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

      {/* bottom panel */}
      <div style={{ flex: "0 0 auto", background: "var(--cream)", borderRadius: "28px 28px 0 0", marginTop: -28, position: "relative", padding: "22px 20px calc(22px + env(safe-area-inset-bottom))" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-1)", lineHeight: 1.1, letterSpacing: "-.01em" }}>Maya invited you — let's get you in.</div>
        <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.45 }}>Ares runs on your number. No passwords, no random group chats — just your chapter.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Button variant="iris" size="lg" full onClick={onNext} icon={<Icon name="phone" size={18}/>}>Continue with phone</Button>
          <Button variant="ghost" size="md" full onClick={onCode}>I have an invite code</Button>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center", marginTop: 12, lineHeight: 1.45 }}>By continuing you agree to Ares' terms &amp; privacy policy.</div>
      </div>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   O2) PHONE — Twilio number entry.
   ──────────────────────────────────────────────────────────────────── */
window.PhoneScreen = function PhoneScreen({ onBack, onNext }) {
  const [num, setNum] = useStateOnb("(650) 421-4471");
  return (
    <Frame screenName="Onboarding · Phone">
      <TopNav title="" leftIcon={<Icon name="back" size={18}/>} onLeft={onBack} serif={false} transparent
        rightIcons={[<div key="p" style={{ paddingRight: 4 }}><ProgressDots count={4} active={0}/></div>]}/>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 24px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)" }}>Your number</div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.45 }}>We'll text you a 6-digit code to confirm it's you. This is how exec reaches the whole chapter — one number, no spam.</div>

        <div style={{ marginTop: 28 }}>
          <Field label="Mobile number" prefix="+1" value={num} onChange={setNum} inputMode="tel" big icon="phone"/>
        </div>

        <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 10, background: "var(--lavender-bg)", borderRadius: 16, padding: "12px 14px" }}>
          <span style={{ color: "var(--iris-deep)", marginTop: 1 }}><Icon name="lock" size={16}/></span>
          <span style={{ fontSize: 13, color: "var(--iris-deep)", lineHeight: 1.4 }}>Your number stays private to exec. Sisters see your name, never your digits.</span>
        </div>
      </div>
      <AuthFooter>
        <Button variant="iris" size="lg" full onClick={onNext} icon={<Icon name="send" size={17}/>}>Send code</Button>
        <div style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center", marginTop: 10 }}>Message &amp; data rates may apply.</div>
      </AuthFooter>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   O3) VERIFY — 6-digit OTP.
   ──────────────────────────────────────────────────────────────────── */
window.VerifyScreen = function VerifyScreen({ onBack, onNext }) {
  const [code, setCode] = useStateOnb("0418");
  return (
    <Frame screenName="Onboarding · Verify">
      <TopNav title="" leftIcon={<Icon name="back" size={18}/>} onLeft={onBack} serif={false} transparent
        rightIcons={[<div key="p" style={{ paddingRight: 4 }}><ProgressDots count={4} active={1}/></div>]}/>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 24px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)" }}>Enter the code</div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.45 }}>
          Sent to <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-1)", fontWeight: 500 }}>(650) •••-4471</span>
        </div>

        <div style={{ marginTop: 32 }}>
          <OTPBoxes value={code} length={6}/>
        </div>

        {/* a faux numeric keypad cue — keeps the screen feeling like iOS */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {["1","2","3"].map(n => (
            <button key={n} onClick={() => setCode(c => (c + n).slice(0, 6))} style={{ width: 56, height: 44, borderRadius: 12, border: 0, background: "var(--bone)", boxShadow: "var(--shadow-1)", fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-1)", cursor: "pointer" }}>{n}</button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
          <button onClick={() => setCode(c => c.slice(0, -1))} style={{ width: 56, height: 44, borderRadius: 12, border: 0, background: "transparent", color: "var(--ink-3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="back" size={18}/></button>
          <button onClick={() => setCode("041826")} style={{ width: 120, height: 44, borderRadius: 12, border: 0, background: "var(--bone)", boxShadow: "var(--shadow-1)", fontSize: 13, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" }}>autofill</button>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 20, textAlign: "center", fontSize: 13, color: "var(--ink-3)" }}>
          Didn't get it? <span style={{ color: "var(--ink-4)" }}>Resend in <span style={{ fontFamily: "var(--font-mono)" }}>0:24</span></span>
        </div>
      </div>
      <AuthFooter>
        <Button variant="iris" size="lg" full onClick={onNext}>Verify</Button>
      </AuthFooter>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   O4) PROFILE SETUP — name, class, major, photo.
   ──────────────────────────────────────────────────────────────────── */
window.ProfileSetupScreen = function ProfileSetupScreen({ onBack, onNext }) {
  const [name, setName] = useStateOnb("Maya Park");
  const [major, setMajor] = useStateOnb("Marketing");
  const [pledge, setPledge] = useStateOnb("Spring '24");
  return (
    <Frame screenName="Onboarding · Profile">
      <TopNav title="" leftIcon={<Icon name="back" size={18}/>} onLeft={onBack} serif={false} transparent
        rightIcons={[<div key="p" style={{ paddingRight: 4 }}><ProgressDots count={4} active={2}/></div>]}/>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 24px 24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, letterSpacing: "-.02em", color: "var(--ink-1)" }}>Make it yours</div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.45 }}>This is what your sisters see. You can change it any time.</div>

        {/* avatar upload */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
          <button style={{ position: "relative", border: 0, background: "transparent", cursor: "pointer" }}>
            <Avatar name="Maya Park" size={96} gradient={1} ring/>
            <span style={{ position: "absolute", right: -2, bottom: -2, width: 34, height: 34, borderRadius: 999, background: "var(--ink-1)", color: "var(--bone)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid var(--cream)" }}>
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
      <AuthFooter>
        <Button variant="iris" size="lg" full onClick={onNext}>Continue</Button>
      </AuthFooter>
    </Frame>
  );
};

/* ────────────────────────────────────────────────────────────────────
   O5) YOU'RE IN — the single dedicated celebration moment (bid-day energy).
   ──────────────────────────────────────────────────────────────────── */
window.WelcomeInScreen = function WelcomeInScreen({ onEnter }) {
  return (
    <Frame screenName="Onboarding · You're in">
      <div style={{ flex: 1, marginTop: -54, paddingTop: 54, position: "relative", background: WELCOME_HERO, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 60% at 50% 30%, rgba(251,247,238,.28), rgba(251,247,238,0) 60%)" }}/>

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px", color: "var(--bone)" }}>
          <div style={{ width: 84, height: 84, borderRadius: 999, background: "rgba(251,247,238,.16)", border: "1px solid rgba(251,247,238,.34)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", flexShrink: 0 }}>
            <Icon name="sparkle" size={40} color="var(--bone)"/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", opacity: .85, marginTop: 26 }}>You're in</div>
          <div style={{ width: "100%", fontFamily: "var(--font-display)", fontSize: 46, lineHeight: 1.02, letterSpacing: "-.02em", marginTop: 10 }}>Welcome to<br/>Pi Beta Phi</div>
          <div style={{ width: "100%", maxWidth: 280, fontSize: 15, opacity: .9, marginTop: 14, lineHeight: 1.45 }}>60 sisters, one home base. Here's what's already on this week.</div>
        </div>

        {/* preview peek of what's inside */}
        <div style={{ position: "relative", display: "flex", gap: 10, padding: "0 20px 8px", overflowX: "auto" }}>
          {[
            { t: "Sisterhood retreat", d: "Fri · 7pm", c: "linear-gradient(135deg,#E6C788,#C9A86B 60%,#7E382E)" },
            { t: "Chapter meeting", d: "Mon · 8pm", c: "linear-gradient(135deg,#8C7AE2,#4F3FA8)" },
            { t: "Bake sale", d: "Wed · 11am", c: "linear-gradient(135deg,#E8B5B5,#C77B7B)" },
          ].map((e, i) => (
            <div key={i} style={{ flex: "0 0 130px", background: "var(--bone)", borderRadius: 16, padding: 10, boxShadow: "var(--shadow-2)" }}>
              <div style={{ height: 56, borderRadius: 10, background: e.c }}/>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-1)", marginTop: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.t}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{e.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: "0 0 auto", background: "var(--cream)", padding: "16px 20px calc(20px + env(safe-area-inset-bottom))" }}>
        <Button variant="primary" size="lg" full onClick={onEnter} icon={<Icon name="arrow" size={18} color="var(--bone)"/>}>Enter chapter</Button>
      </div>
    </Frame>
  );
};

Object.assign(window, {
  WelcomeScreen: window.WelcomeScreen,
  PhoneScreen: window.PhoneScreen,
  VerifyScreen: window.VerifyScreen,
  ProfileSetupScreen: window.ProfileSetupScreen,
  WelcomeInScreen: window.WelcomeInScreen,
});
