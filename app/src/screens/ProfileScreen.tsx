import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { PointsTile, SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api } from "../api";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const me = useApi(() => api.getCurrentUser());
  const approvals = useApi(() => api.getApprovals()) ?? [];
  const stats = useApi(() => api.getSemesterStats()) ?? [];

  return (
    <Frame screenName="07 Profile">
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
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 130px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8, textAlign: "center" }}>
          <Avatar name={me?.name ?? "Maya Park"} size={88} gradient={me?.gradient ?? 1} ring/>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.05, marginTop: 14, color: "var(--ink-1)", whiteSpace: "nowrap" }}>{me?.name ?? "Maya Park"}</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
            {me?.pledgeClass} · {me?.role} · {me?.major}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {me?.badges.map(b => (
              <Badge
                key={b.label}
                tone={b.tone}
                icon={b.icon === "sparkle" ? <Icon name="sparkle" size={11} color="var(--gold-deep)"/> : undefined}
              >
                {b.label}
              </Badge>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 10, marginTop: 22 }}>
          <PointsTile icon="sparkle" value="847" label="Points" variant="iris"/>
          <PointsTile icon="flame" value="5w" label="Streak" variant="rose" small/>
          <PointsTile icon="check" value="92%" label="Attend" variant="ink" small/>
        </div>

        <SectionHeader title="Approvals" action="3 pending" tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          {approvals.map((a, i, arr) => (
            <div key={a.id} style={{ padding: "12px 16px", borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={a.who} size={32} gradient={a.whoGradient}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-1)" }}>{a.what}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)" }}>requested by {a.who} · {a.needs}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Button variant="iris" size="sm">Approve</Button>
                <Button variant="secondary" size="sm">Hold</Button>
              </div>
            </div>
          ))}
        </div>

        <SectionHeader title="This semester" tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          {stats.map((s, i, a) => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", padding: "14px 16px",
              borderBottom: i === a.length - 1 ? 0 : "1px solid var(--hairline)",
            }}>
              <span style={{ fontSize: 15, color: "var(--ink-1)" }}>{s.label}</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums",
                fontSize: 14, color: "var(--ink-2)", fontWeight: 500,
              }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="me"/>
    </Frame>
  );
}
