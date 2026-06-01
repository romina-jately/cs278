import { useNavigate, useParams } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api } from "../api";
import { useToast } from "../lib/toast";

export default function AlumnaDetailScreen() {
  const { id = "a1" } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const m = useApi(() => api.getMember(id), [id]);

  async function intro() {
    if (!m) return;
    await api.requestIntro(m.id);
    toast.show(`Intro request sent to ${m.name}`);
  }
  async function coffee() {
    if (!m) return;
    await api.scheduleCoffee(m.id);
    toast.show(`Coffee chat — ${m.name} will pick a time`);
  }

  if (!m) {
    return (
      <Frame screenName="Alumna · loading">
        <TopNav title="" leftIcon={<Icon name="back" size={18}/>} onLeft={() => navigate(-1)} transparent/>
      </Frame>
    );
  }

  return (
    <Frame screenName="Alumna detail">
      <TopNav
        title=""
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate(-1)}
        rightIcons={[
          <button key="o" style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-1)", boxShadow: "var(--shadow-1)", cursor: "pointer",
          }}>
            <Icon name="options" size={18}/>
          </button>,
        ]}
        transparent
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 8 }}>
          <Avatar name={m.name} size={96} gradient={m.gradient} ring/>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.05, marginTop: 14, color: "var(--ink-1)" }}>
            {m.name}{m.year ? <span style={{ fontStyle: "italic", color: "var(--ink-3)", fontSize: 22 }}> {m.year}</span> : null}
          </div>
          {(m.role || m.location) && (
            <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>
              {[m.role, m.location].filter(Boolean).join(" · ")}
            </div>
          )}
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {m.hiring && <Badge tone="success">hiring</Badge>}
            {m.pledgeClass && <Badge tone="iris">{m.pledgeClass}</Badge>}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          <Button variant="iris" size="md" full onClick={intro} icon={<Icon name="send" size={16}/>}>Request intro</Button>
          <Button variant="light" size="md" full onClick={coffee} icon={<Icon name="coffee" size={16}/>}>Coffee chat</Button>
        </div>

        <SectionHeader title="About" tight/>
        <div style={{
          background: "var(--bone)", borderRadius: 20, padding: 16,
          boxShadow: "var(--shadow-1)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5,
        }}>
          {m.year
            ? `${m.name} pledged Pi Beta Phi in ${m.year}. ${m.role ?? "Member of the chapter."}${m.location ? ` Based in ${m.location}.` : ""}`
            : `${m.name} is an active sister.${m.role ? ` ${m.role}.` : ""}`}
        </div>

        <SectionHeader title="Recent activity" tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          {[
            { t: "RSVP'd to Sisterhood retreat", w: "2d ago" },
            { t: "Approved Lily K.'s +50 pts", w: "3d ago" },
            { t: "Posted in Chapter chat", w: "5d ago" },
          ].map((a, i, arr) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "14px 16px",
              borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)",
            }}>
              <span style={{ fontSize: 14, color: "var(--ink-1)" }}>{a.t}</span>
              <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.w}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
