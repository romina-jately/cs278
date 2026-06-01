import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Frame, TopNav } from "../components/Frame";
import { Icon } from "../components/primitives/Icon";
import { MessageBubble } from "../components/cards/cards";
import { Sheet, SheetOption } from "../components/Sheet";
import { useApi } from "../lib/useApi";
import { api } from "../api";
import type { Message } from "../types";
import { useToast } from "../lib/toast";

export default function ThreadScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const { id = "chapter" } = useParams();
  const thread = useApi(() => api.getThread(id), [id]);
  const initial = useApi(() => api.getThreadMessages(id), [id]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  useEffect(() => { if (initial) setMessages(initial); }, [initial]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    api.sendMessage(id, text).then(m => setMessages(arr => [...arr, m]));
  }

  function pickAction(action: "mute" | "pin" | "search" | "leave") {
    setMenuOpen(false);
    if (action === "mute") {
      setMuted(m => !m);
      toast.show(muted ? "Unmuted" : "Muted · no notifications");
    } else if (action === "pin") {
      toast.show("Pinned a message");
    } else if (action === "search") {
      toast.show("Search · coming next");
    } else if (action === "leave") {
      toast.show("Left the thread");
      navigate("/chat");
    }
  }

  return (
    <Frame screenName="05 Thread">
      <TopNav
        title={thread?.name ?? "…"}
        subtitle={thread?.subtitle ?? ""}
        leftIcon={<Icon name="back" size={18}/>}
        onLeft={() => navigate("/chat")}
        serif={false}
        rightIcons={[
          <button key="o" onClick={() => setMenuOpen(true)} style={{
            background: "var(--bone)", border: 0, width: 36, height: 36, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-1)", boxShadow: "var(--shadow-1)", cursor: "pointer",
          }}>
            <Icon name="options" size={18}/>
          </button>,
        ]}
      />
      {thread?.pinned && (
        <div style={{
          background: "var(--lavender-bg)", padding: "8px 20px",
          display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--hairline)",
        }}>
          <Icon name="pinFilled" size={12} color="var(--iris-deep)"/>
          <span style={{ fontSize: 12, color: "var(--iris-deep)", flex: 1 }}>{thread.pinned.text}</span>
          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{thread.pinned.ago}</span>
        </div>
      )}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 16px 130px" }}>
        {messages.map(m => (
          <MessageBubble
            key={m.id}
            from={m.from}
            text={m.text}
            mine={m.mine}
            time={m.time}
            system={m.system}
          />
        ))}
      </div>
      <div style={{
        position: "absolute", left: 12, right: 12, bottom: 14, zIndex: 10,
        background: "rgba(246,240,228,.92)",
        backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderRadius: 28, padding: "10px 12px",
        boxShadow: "var(--shadow-2)", border: "1px solid var(--hairline)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <button style={{
          width: 34, height: 34, borderRadius: 999, background: "var(--bone)", border: 0,
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-1)", cursor: "pointer",
        }}>
          <Icon name="camera" size={18}/>
        </button>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
          placeholder="Message…"
          style={{
            flex: 1, background: "var(--bone)", borderRadius: 999, padding: "8px 14px",
            fontSize: 14, color: "var(--ink-1)", boxShadow: "var(--shadow-inset)",
            border: 0, outline: "none", fontFamily: "var(--font-body)",
          }}
        />
        <button onClick={send} style={{
          width: 34, height: 34, borderRadius: 999, background: "var(--ink-1)", border: 0,
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)", cursor: "pointer",
        }}>
          <Icon name="send" size={16}/>
        </button>
      </div>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} title={thread?.name ?? "Thread"}>
        <SheetOption label={muted ? "Unmute notifications" : "Mute notifications"} onClick={() => pickAction("mute")}/>
        <SheetOption label="Pin a message" onClick={() => pickAction("pin")}/>
        <SheetOption label="Search messages" onClick={() => pickAction("search")}/>
        <SheetOption label="Leave thread" onClick={() => pickAction("leave")}/>
      </Sheet>
    </Frame>
  );
}
