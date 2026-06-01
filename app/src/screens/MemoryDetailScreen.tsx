import { useNavigate, useParams } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Button } from "../components/primitives/atoms";
import { Icon } from "../components/primitives/Icon";
import { PhotoTile } from "../components/cards/cards";
import { useApi } from "../lib/useApi";
import { api, COVERS } from "../api";
import type { CoverKey } from "../types";

export default function MemoryDetailScreen() {
  const { id = "m1" } = useParams();
  const navigate = useNavigate();
  const memory = useApi(() => api.getMemory(id), [id]);

  if (!memory) {
    return (
      <Frame screenName="Memory · loading">
        <TopNav title="" leftIcon={<Icon name="back" size={18}/>} onLeft={() => navigate(-1)} transparent/>
      </Frame>
    );
  }

  const photos = (memory.photos ?? []) as CoverKey[];

  return (
    <Frame screenName="Memory">
      <div style={{ position: "relative", height: 280, marginTop: -54, paddingTop: 54, background: COVERS[memory.cover] }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(28,26,38,.15) 0%,rgba(28,26,38,0) 30%,rgba(28,26,38,.7) 100%)" }}/>
        <div style={{ position: "relative", padding: "16px 20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate(-1)} style={{
            background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-1)", boxShadow: "var(--shadow-1)", cursor: "pointer",
          }}>
            <Icon name="back" size={18}/>
          </button>
          <button style={{
            background: "rgba(251,247,238,.92)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)", cursor: "pointer",
          }}>
            <Icon name="send" size={18}/>
          </button>
        </div>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 22, color: "var(--bone)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", opacity: .9 }}>{memory.date}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.05, letterSpacing: "-.02em", marginTop: 6 }}>{memory.title}</div>
          <div style={{ fontSize: 13, opacity: .85, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="camera" size={13} color="currentColor"/>{memory.count} photos
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {photos.map((cover, i) => (
            <PhotoTile key={i} cover={COVERS[cover]} h={108} style={{ borderRadius: 12 }}/>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <Button variant="iris" size="md" full icon={<Icon name="camera" size={16}/>}>Add photo</Button>
        </div>
      </div>
    </Frame>
  );
}
