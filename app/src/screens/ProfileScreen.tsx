import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { Avatar } from "../components/primitives/Avatar";
import { Badge, Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { DuesCard, PointsTile, SectionHeader } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api } from "../api";
import { useToast } from "../lib/toast";
import type { Approval } from "../types";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const me = useApi(() => api.getCurrentUser());
  const remoteApprovals = useApi(() => api.getApprovals());
  const stats = useApi(() => api.getSemesterStats()) ?? [];
  const initialDues = useApi(() => api.getDues());

  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [duesPaid, setDuesPaid] = useState(false);
  useEffect(() => { if (remoteApprovals) setApprovals(remoteApprovals); }, [remoteApprovals]);

  async function resolve(a: Approval, action: "approve" | "hold") {
    setApprovals(arr => arr.filter(x => x.id !== a.id));
    await api.resolveApproval(a.id, action);
    toast.show(action === "approve" ? `Approved · ${a.what}` : `Held for review · ${a.who}`);
  }

  async function payDues() {
    await api.payDues();
    setDuesPaid(true);
    toast.show("Dues paid · receipt in email");
  }

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

        <SectionHeader title="Dues" tight/>
        {duesPaid ? (
          <div style={{
            background: "var(--bone)", borderRadius: 24, padding: 18,
            boxShadow: "var(--shadow-1)", display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 999, background: "var(--success-bg)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="check" size={22} color="var(--success)"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink-1)" }}>Paid · May</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Receipt sent to your email</div>
            </div>
            <Badge tone="success">paid</Badge>
          </div>
        ) : initialDues ? (
          <DuesCard
            amount={initialDues.amount}
            paid={initialDues.paid}
            total={initialDues.total}
            due={initialDues.due}
            onPay={payDues}
          />
        ) : null}

        <SectionHeader title="Approvals" action={`${approvals.length} pending`} tight/>
        <div style={{ background: "var(--bone)", borderRadius: 20, boxShadow: "var(--shadow-1)" }}>
          {approvals.length === 0 ? (
            <div style={{ padding: 20, fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
              All clear — nothing waiting on you.
            </div>
          ) : approvals.map((a, i, arr) => (
            <div key={a.id} style={{ padding: "12px 16px", borderBottom: i === arr.length - 1 ? 0 : "1px solid var(--hairline)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={a.who} size={32} gradient={a.whoGradient}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-1)" }}>{a.what}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)" }}>requested by {a.who} · {a.needs}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Button variant="iris" size="sm" onClick={() => resolve(a, "approve")}>Approve</Button>
                <Button variant="secondary" size="sm" onClick={() => resolve(a, "hold")}>Hold</Button>
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
