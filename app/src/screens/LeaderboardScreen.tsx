import { useNavigate } from "react-router-dom";
import { Frame, TopNav, TabBar } from "../components/Frame";
import { Icon } from "../components/primitives/Icon";
import { MemberRow } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api } from "../api";

export default function LeaderboardScreen() {
  const navigate = useNavigate();
  const board = useApi(() => api.getFullLeaderboard()) ?? [];

  return (
    <Frame screenName="Leaderboard">
      <TopNav
        title="The board"
        subtitle="Semester · Spring '26"
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate("/home")}
        serif
      />
      <div style={{ flex: 1, overflow: "auto", padding: "12px 20px 130px" }}>
        <div style={{
          background: "var(--grad-iris)", borderRadius: 20, padding: 16,
          color: "var(--bone)", boxShadow: "var(--shadow-2)",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .85 }}>You</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 4 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1 }}>1</span>
            <span style={{ fontSize: 13, opacity: .85 }}>of 60 · 1,240 pts</span>
          </div>
        </div>
        <div style={{ background: "var(--bone)", borderRadius: 20, marginTop: 14, boxShadow: "var(--shadow-1)", padding: "4px 0" }}>
          {board.map((p, i, arr) => (
            <button
              key={p.rank}
              onClick={() => navigate(`/alumnae/${nameToId(p.name)}`)}
              style={{
                display: "block", width: "100%", padding: 0, border: 0,
                background: "transparent", textAlign: "left", cursor: "pointer",
              }}
            >
              <MemberRow
                rank={p.rank}
                name={p.name}
                sub={`${p.points.toLocaleString()} pts`}
                points={p.gold ? "🥇" : ""}
                gradient={p.gradient}
                gold={p.gold}
                last={i === arr.length - 1}
              />
            </button>
          ))}
        </div>
      </div>
      <TabBar/>
    </Frame>
  );
}

function nameToId(n: string): string {
  return n.toLowerCase().replace(".", "").replace(" ", "-");
}
