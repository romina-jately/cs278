import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame } from "../components/Frame";
import { Button } from "../components/primitives/atoms";
import { Field } from "../components/primitives/forms";
import { Icon } from "../components/primitives/Icon";
import { api, FLARE_COVERS, FLARE_DURATIONS } from "../api";
import { useToast } from "../lib/toast";

export default function FlareComposeScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(FLARE_COVERS[0].id);
  const [ttl, setTtl] = useState(FLARE_DURATIONS[1]);

  const gradient = FLARE_COVERS.find(c => c.id === cover)?.gradient ?? FLARE_COVERS[0].gradient;

  async function start() {
    const flare = await api.createFlare({ title, cover: gradient, ttl });
    toast.show("Plan started — pinged the chapter");
    navigate(`/flares/${flare.id}`, { replace: true });
  }

  return (
    <Frame screenName="Create · Plan">
      <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", paddingTop: 6 }}>
        <span style={{ width: 38, height: 5, borderRadius: 999, background: "var(--ink-4)" }}/>
      </div>
      <div style={{
        flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 20px 12px",
      }}>
        <button onClick={() => navigate(-1)} style={{
          border: 0, background: "transparent", fontSize: 15, color: "var(--ink-3)", fontWeight: 500, cursor: "pointer",
        }}>Cancel</button>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)", whiteSpace: "nowrap" }}>Start a plan</span>
        <span style={{ width: 48 }}/>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div style={{
          height: 140, borderRadius: 20, background: gradient,
          position: "relative", overflow: "hidden", boxShadow: "var(--shadow-1)",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,0) 45%,rgba(28,26,38,.55) 100%)" }}/>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "var(--bone)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>{ttl}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.05, letterSpacing: "-.01em", textShadow: "0 1px 12px rgba(28,26,38,.3)" }}>
              {title || "Where you headed?"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {FLARE_COVERS.map(c => (
            <button key={c.id} onClick={() => setCover(c.id)} style={{
              flex: 1, height: 38, borderRadius: 10, background: c.gradient, border: 0, cursor: "pointer",
              boxShadow: cover === c.id ? "0 0 0 2px var(--cream), 0 0 0 4px var(--iris)" : "var(--shadow-1)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {cover === c.id && <Icon name="check" size={16} color="var(--bone)"/>}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <Field label="What's the plan" value={title} onChange={setTitle} icon="sparkle" placeholder="Coupa study sesh, beach trip…"/>
        </div>

        <div style={{
          marginTop: 18, fontSize: 12, fontWeight: 600, letterSpacing: ".06em",
          textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10,
        }}>How long</div>
        <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--cream)", borderRadius: 999, boxShadow: "var(--shadow-inset)" }}>
          {FLARE_DURATIONS.map(d => (
            <button key={d} onClick={() => setTtl(d)} style={{
              flex: 1, border: 0, padding: "10px 0", borderRadius: 999,
              fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)",
              background: ttl === d ? "var(--ink-1)" : "transparent",
              color: ttl === d ? "var(--bone)" : "var(--ink-3)",
              cursor: "pointer", transition: "all .16s var(--ease-out)", whiteSpace: "nowrap",
            }}>{d.replace("ends ", "")}</button>
          ))}
        </div>

        <div style={{
          marginTop: 18, display: "flex", alignItems: "flex-start", gap: 10,
          background: "var(--lavender-bg)", borderRadius: 16, padding: "12px 14px",
        }}>
          <Icon name="clock" size={16} color="var(--iris-deep)"/>
          <span style={{ fontSize: 13, color: "var(--iris-deep)", lineHeight: 1.4 }}>
            Plans auto-expire when the timer runs out — no cleanup needed.
          </span>
        </div>
      </div>
      <div style={{
        flex: "0 0 auto",
        padding: "12px 20px calc(20px + env(safe-area-inset-bottom))",
        background: "var(--cream)", borderTop: "1px solid var(--hairline-2)",
      }}>
        <Button variant="iris" size="lg" full onClick={start} icon={<Icon name="arrow" size={17} color="var(--bone)"/>}>
          Start plan
        </Button>
      </div>
    </Frame>
  );
}
