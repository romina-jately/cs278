import { useNavigate, useParams } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api } from "../api";

export default function JobDetailScreen() {
  const { id = "j1" } = useParams();
  const navigate = useNavigate();
  const job = useApi(() => api.getJob(id), [id]);

  if (!job) {
    return (
      <Frame screenName="Job · loading">
        <TopNav title="" leftIcon={<Icon name="back" size={18}/>} onLeft={() => navigate(-1)} transparent/>
      </Frame>
    );
  }

  return (
    <Frame screenName="Job detail">
      <TopNav
        title=""
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate(-1)}
        transparent
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: "var(--ink-1)", color: "var(--bone)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="briefcase" size={26}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 600 }}>{job.company} · {job.location}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1, color: "var(--ink-1)" }}>{job.role}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          <Badge tone="iris">Open</Badge>
          {job.pay && <Badge tone="gold">{job.pay}</Badge>}
          <Badge tone="success">Sister referral</Badge>
        </div>

        <SectionHeader title="About the role" tight/>
        <div style={{
          background: "var(--bone)", borderRadius: 20, padding: 16, boxShadow: "var(--shadow-1)",
          fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5,
        }}>{job.about}</div>

        <SectionHeader title="Referred by" tight/>
        <div style={{
          background: "var(--bone)", borderRadius: 20, padding: 14,
          boxShadow: "var(--shadow-1)", display: "flex", alignItems: "center", gap: 12,
        }}>
          <Avatar name={job.via} size={42} gradient={job.viaGradient}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-1)" }}>{job.via}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>“I always reply — DM me first.”</div>
          </div>
          <Button variant="secondary" size="sm" icon={<Icon name="send" size={14}/>}>DM</Button>
        </div>

        <div style={{ marginTop: 20 }}>
          <Button variant="iris" size="lg" full icon={<Icon name="arrow" size={17} color="var(--bone)"/>}>Apply via referral</Button>
        </div>
      </div>
    </Frame>
  );
}
