import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Badge } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";
import type { AlumnaFilter } from "../types";
import { useToast } from "../lib/toast";

const FILTERS: Array<{ id: AlumnaFilter | "major" | "city"; label: string }> = [
  { id: "all", label: "All" },
  { id: "hiring", label: "Hiring" },
  { id: "mentoring", label: "Mentoring" },
  { id: "major", label: "By major" },
  { id: "city", label: "By city" },
];

export default function AlumnaeScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const [filter, setFilter] = useState<AlumnaFilter>("all");
  const featured = useApi(() => api.getFeaturedAlumna());
  const jobs = useApi(() => api.getJobs()) ?? [];
  const alumnae = useApi(() => api.getAlumnae(filter), [filter]) ?? [];

  async function intro(e: MouseEvent, memberId: string, name: string) {
    e.stopPropagation();
    await api.requestIntro(memberId);
    toast.show(`Intro request sent to ${name}`);
  }
  async function coffee(e: MouseEvent, memberId: string, name: string) {
    e.stopPropagation();
    await api.scheduleCoffee(memberId);
    toast.show(`Coffee chat — ${name} will pick a time`);
  }

  return (
    <Frame screenName="06 Alumnae">
      <TopNav
        title="Alumnae"
        subtitle={`${alumnae.length} sisters · ${alumnae.filter(a => a.hiring).length} hiring`}
        rightIcons={[
          <button key="s" style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-1)", color: "var(--ink-1)", cursor: "pointer",
          }}>
            <Icon name="search" size={18}/>
          </button>,
        ]}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        {featured && (
          <button onClick={() => navigate(`/alumnae/${featured.id}`)} style={{
            background: COVERS.alumni, borderRadius: 28, padding: 18, color: "var(--bone)",
            boxShadow: "var(--shadow-2)", position: "relative", overflow: "hidden",
            border: 0, cursor: "pointer", textAlign: "left", width: "100%",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .85 }}>This week's alumna</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.15, marginTop: 6, fontStyle: "italic" }}>“Reach out — I always reply.”</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
              <Avatar name={featured.name} size={48} gradient={featured.gradient} ring/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>{featured.name}, {featured.year}</div>
                <div style={{ fontSize: 12, opacity: .85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{featured.role} · {featured.location}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                onClick={e => intro(e, featured.id, featured.name)}
                style={{
                  background: "var(--bone)", color: "var(--ink-1)", border: 0, cursor: "pointer",
                  padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                  fontFamily: "var(--font-body)",
                }}
              >Request intro</button>
              <button
                onClick={e => coffee(e, featured.id, featured.name)}
                style={{
                  background: "rgba(251,247,238,.18)", color: "var(--bone)", cursor: "pointer",
                  padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                  border: "1px solid rgba(251,247,238,.4)", whiteSpace: "nowrap",
                  fontFamily: "var(--font-body)",
                }}
              >Coffee chat</button>
            </div>
          </button>
        )}

        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginTop: 18, marginRight: -20, paddingRight: 20 }}>
          {FILTERS.map(f => {
            const active =
              (f.id === "all" && filter === "all") ||
              (f.id === "hiring" && filter === "hiring") ||
              (f.id === "mentoring" && filter === "mentoring");
            const handle = () => {
              if (f.id === "all" || f.id === "hiring" || f.id === "mentoring") setFilter(f.id);
            };
            return (
              <button
                key={f.id}
                onClick={handle}
                style={{
                  flex: "0 0 auto", padding: "7px 14px", borderRadius: 999,
                  fontSize: 13, fontWeight: 500, border: 0, cursor: "pointer",
                  background: active ? "var(--ink-1)" : "var(--bone)",
                  color: active ? "var(--bone)" : "var(--ink-2)",
                  boxShadow: active ? "none" : "var(--shadow-1)",
                  whiteSpace: "nowrap",
                }}
              >{f.label}</button>
            );
          })}
        </div>

        <SectionHeader title="Open at sisters' companies" action="See all →" tight/>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", marginRight: -20, paddingRight: 20 }}>
          {jobs.map(j => (
            <button
              key={j.id}
              onClick={() => navigate(`/jobs/${j.id}`)}
              style={{
                flex: "0 0 220px", background: "var(--bone)", borderRadius: 18,
                padding: 14, boxShadow: "var(--shadow-1)",
                border: 0, cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, background: "var(--ink-1)", color: "var(--bone)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon name="briefcase" size={14}/>
                </div>
                <span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {j.company} · {j.location}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-1)", marginTop: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.role}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, minWidth: 0 }}>
                <Avatar name={j.via} size={20} gradient={j.viaGradient}/>
                <span style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>via {j.via}</span>
              </div>
            </button>
          ))}
        </div>

        <SectionHeader title="Directory" tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          {alumnae.length === 0 ? (
            <div style={{ padding: 20, fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
              No alumnae match this filter yet.
            </div>
          ) : alumnae.map((a, i, arr) => (
            <button
              key={a.id}
              onClick={() => navigate(`/alumnae/${a.id}`)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)",
                background: "transparent", border: 0, width: "100%", cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Avatar name={a.name} size={42} gradient={a.gradient}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{a.name}</span>
                  {a.year && <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--ink-3)" }}>{a.year}</span>}
                  {a.hiring && <Badge tone="success">hiring</Badge>}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.role}{a.location ? ` · ${a.location}` : ""}</div>
              </div>
              <Icon name="chev" size={16} color="var(--ink-4)"/>
            </button>
          ))}
        </div>
      </div>
      <TabBar active="alumnae"/>
    </Frame>
  );
}
