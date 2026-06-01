import { useLocation, useNavigate } from "react-router-dom";
import { Frame } from "../components/Frame";
import { AvatarStack } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { SettingRow } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { COVERS } from "../api";
import type { CoverKey } from "../types";

type PublishedState = {
  eventId: string;
  title: string;
  date: string;
  time: string;
  cover: CoverKey;
  notified: number;
  texted: number;
};

const FALLBACK: PublishedState = {
  eventId: "evt-retreat",
  title: "Sisterhood retreat",
  date: "Fri, May 9",
  time: "7pm",
  cover: "retreat",
  notified: 60,
  texted: 12,
};

export default function EventPublishedScreen() {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = (loc.state as PublishedState | null) ?? FALLBACK;

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
            background: COVERS[state.cover],
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 45%,rgba(28,26,38,.6) 100%)" }}/>
            <div style={{ position: "absolute", left: 14, top: 14 }}>
              <Badge tone="ink">Just posted</Badge>
            </div>
            <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>{state.date} · {state.time}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, marginTop: 2 }}>{state.title}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
            <AvatarStack names={["Maya P", "Lily K", "Nora T"]} extra={0}/>
            <span style={{ fontSize: 12, color: "var(--ink-3)" }}>RSVPs opening…</span>
          </div>
        </div>

        <div style={{ marginTop: 14, background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          <SettingRow icon="bell" title={`${state.notified} sisters notified`} sub="Pushed to everyone with Ares open" control={
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-1)", fontWeight: 500 }}>{state.notified}</span>
          }/>
          <SettingRow icon="sms" title={`${state.texted} texted`} sub="The ones who haven't opened today — via SMS" last control={
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-1)", fontWeight: 500 }}>{state.texted}</span>
          }/>
        </div>
      </div>

      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        <Button variant="iris" size="lg" full onClick={() => navigate(`/events/${state.eventId}`)}>View event</Button>
        <Button variant="ghost" size="md" full onClick={() => navigate("/calendar")}>Back to calendar</Button>
      </div>
    </Frame>
  );
}
