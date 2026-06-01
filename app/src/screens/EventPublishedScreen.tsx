import { useNavigate } from "react-router-dom";
import { Frame } from "../components/Frame";
import { AvatarStack } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { SettingRow } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";

export default function EventPublishedScreen() {
  const navigate = useNavigate();
  return (
    <Frame screenName="Create · Published">
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", marginTop: 36,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            background: "var(--success-bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="check" size={38} color="var(--success)"/>
          </div>
          <div style={{
            width: "100%", fontFamily: "var(--font-display)",
            fontSize: 34, lineHeight: 1.05, letterSpacing: "-.02em",
            color: "var(--ink-1)", marginTop: 20,
          }}>Posted to chapter</div>
          <div style={{
            width: "100%", maxWidth: 280, fontSize: 15,
            color: "var(--ink-2)", marginTop: 8, lineHeight: 1.45,
          }}>
            It's live on the May calendar. Here's what just went out.
          </div>
        </div>

        <div style={{ marginTop: 28, background: "var(--bone)", borderRadius: 24, boxShadow: "var(--shadow-2)", overflow: "hidden" }}>
          <div style={{
            height: 130,
            background: "linear-gradient(135deg,#E6C788 0%,#C9A86B 50%,#7E382E 100%)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 45%,rgba(28,26,38,.6) 100%)" }}/>
            <div style={{ position: "absolute", left: 14, top: 14 }}>
              <Badge tone="ink">Just posted</Badge>
            </div>
            <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>Fri May 9 · 7pm</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, marginTop: 2 }}>Sisterhood retreat</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
            <AvatarStack names={["Maya P", "Lily K", "Nora T"]} extra={0}/>
            <span style={{ fontSize: 12, color: "var(--ink-3)" }}>RSVPs opening…</span>
          </div>
        </div>

        <div style={{ marginTop: 14, background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="bell" title="60 sisters notified" sub="Pushed to everyone with Ares open" control={
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-1)", fontWeight: 500 }}>60</span>
          }/>
          <SettingRow icon="sms" title="12 texted" sub="The ones who haven't opened today — via SMS" last control={
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-1)", fontWeight: 500 }}>12</span>
          }/>
        </div>
      </div>

      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        <Button variant="iris" size="lg" full onClick={() => navigate("/events/evt-retreat")}>View event</Button>
        <Button variant="ghost" size="md" full onClick={() => navigate("/calendar")}>Back to calendar</Button>
      </div>
    </Frame>
  );
}
