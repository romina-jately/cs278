const GRADIENTS = [
  "linear-gradient(135deg,#E8B5B5,#C77B7B)",
  "linear-gradient(135deg,#B8A6E8,#6B5BCB)",
  "linear-gradient(135deg,#7E9DBE,#1B2447)",
  "linear-gradient(135deg,#E6C788,#9A7D3F)",
  "linear-gradient(135deg,#C9A86B,#7E382E)",
  "linear-gradient(135deg,#8C7AE2,#4F3FA8)",
];

const STACK_GRADIENTS = [
  "linear-gradient(135deg,#E8B5B5,#C77B7B)",
  "linear-gradient(135deg,#B8A6E8,#6B5BCB)",
  "linear-gradient(135deg,#7E9DBE,#1B2447)",
  "linear-gradient(135deg,#E6C788,#9A7D3F)",
];

export function Avatar({
  name = "?",
  size = 36,
  gradient = 0,
  ring = false,
}: {
  name?: string;
  size?: number;
  gradient?: number;
  ring?: boolean;
}) {
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: GRADIENTS[gradient % GRADIENTS.length],
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#FBF7EE", fontWeight: 600, fontSize: Math.max(10, size * 0.36),
      flex: `0 0 ${size}px`,
      boxShadow: ring ? "0 0 0 2px var(--bone), 0 0 0 4px var(--iris)" : "none",
    }}>{initials}</div>
  );
}

export function AvatarStack({
  names = [],
  extra = 0,
  size = 26,
}: {
  names?: string[];
  extra?: number;
  size?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {names.map((n, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -size * 0.32 }}>
          <div style={{
            width: size, height: size, borderRadius: 999,
            background: STACK_GRADIENTS[i % STACK_GRADIENTS.length],
            border: "2px solid var(--bone)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FBF7EE", fontSize: 10, fontWeight: 600,
          }}>{n.split(" ").map(s => s[0]).join("").slice(0, 1)}</div>
        </div>
      ))}
      {extra > 0 && (
        <span style={{ marginLeft: 8, fontSize: 12, color: "var(--ink-3)", whiteSpace: "nowrap" }}>
          +{extra} going
        </span>
      )}
    </div>
  );
}
