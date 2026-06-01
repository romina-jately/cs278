import { Frame, TopNav, TabBar } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Badge } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";

const FILTERS = ["All", "Hiring", "Mentoring", "By major", "By city"];

export default function AlumnaeScreen() {
  const featured = useApi(() => api.getFeaturedAlumna());
  const jobs = useApi(() => api.getJobs()) ?? [];
  const alumnae = useApi(() => api.getAlumnae()) ?? [];

  return (
    <Frame screenName="06 Alumnae">
      <TopNav
        title="Alumnae"
        subtitle="284 sisters · 9 hiring"
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
        <div style={{
          background: COVERS.alumni, borderRadius: 28, padding: 18, color: "var(--bone)",
          boxShadow: "var(--shadow-2)", position: "relative", overflow: "hidden",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .85 }}>This week's alumna</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.15, marginTop: 6, fontStyle: "italic" }}>“Reach out — I always reply.”</div>
          {featured && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
              <Avatar name={featured.name} size={48} gradient={featured.gradient} ring/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>{featured.name}, {featured.year}</div>
                <div style={{ fontSize: 12, opacity: .85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{featured.role} · {featured.location}</div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <span style={{
              background: "var(--bone)", color: "var(--ink-1)",
              padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
            }}>Request intro</span>
            <span style={{
              background: "rgba(251,247,238,.18)", color: "var(--bone)",
              padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(251,247,238,.4)", whiteSpace: "nowrap",
            }}>Coffee chat</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginTop: 18, marginRight: -20, paddingRight: 20 }}>
          {FILTERS.map((f, i) => (
            <span key={f} style={{
              flex: "0 0 auto", padding: "7px 14px", borderRadius: 999,
              fontSize: 13, fontWeight: 500,
              background: i === 0 ? "var(--ink-1)" : "var(--bone)",
              color: i === 0 ? "var(--bone)" : "var(--ink-2)",
              boxShadow: i === 0 ? "none" : "var(--shadow-1)", whiteSpace: "nowrap",
            }}>{f}</span>
          ))}
        </div>

        <SectionHeader title="Open at sisters' companies" action="See all →" tight/>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", marginRight: -20, paddingRight: 20 }}>
          {jobs.map(j => (
            <div key={j.id} style={{
              flex: "0 0 220px", background: "var(--bone)", borderRadius: 18,
              padding: 14, boxShadow: "var(--shadow-1)",
            }}>
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
            </div>
          ))}
        </div>

        <SectionHeader title="Directory" tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          {alumnae.map((a, i, arr) => (
            <div key={a.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)",
            }}>
              <Avatar name={a.name} size={42} gradient={a.gradient}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{a.name}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--ink-3)" }}>{a.year}</span>
                  {a.hiring && <Badge tone="success">hiring</Badge>}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.role} · {a.location}</div>
              </div>
              <Icon name="chev" size={16} color="var(--ink-4)"/>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="alumnae"/>
    </Frame>
  );
}
