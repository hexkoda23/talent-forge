import { useState } from "react";
import { Hash, Users, Send, Search, Plus, Smile, Paperclip, Volume2, Pin, AtSign, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const channels = [
  { id: "general", name: "general", topic: "Cohort-wide chat" },
  { id: "rag-raid", name: "raid-rag-bot", topic: "Active raid: RAG support bot" },
  { id: "help", name: "help-desk", topic: "Stuck? Drop your question here" },
  { id: "showcase", name: "showcase", topic: "Ship & flex your projects" },
  { id: "random", name: "random", topic: "Memes and off-topic" },
];

const members = [
  { name: "Ibrahim Musa", role: "Mentor", status: "online" },
  { name: "Chinwe Eze", role: "Engineer L4", status: "online" },
  { name: "Tunde Adeyemi", role: "Engineer L4", status: "idle" },
  { name: "Fatima Bello", role: "Engineer L3", status: "online" },
  { name: "Emeka Okonkwo", role: "Engineer L3", status: "dnd" },
  { name: "Aisha Lawal", role: "Engineer L3", status: "offline" },
  { name: "Yusuf Garba", role: "Engineer L2", status: "online" },
  { name: "Blessing John", role: "Engineer L2", status: "online" },
];

const seedMessages = [
  { user: "Ibrahim Musa", role: "Mentor", time: "10:14", text: "Heads up team — new RAG quest drops at 12:00. Read the brief first." },
  { user: "Chinwe Eze", role: "L4", time: "10:18", text: "Anyone tried Qdrant + hybrid search? My recall is trash." },
  { user: "Tunde Adeyemi", role: "L4", time: "10:21", text: "Try BM25 fused with dense at 0.3/0.7. Cleaned my eval immediately." },
  { user: "Fatima Bello", role: "L3", time: "10:25", text: "Pushed v2 of the chunker → /raid-rag-bot. Smaller chunks, way better answers." },
  { user: "Adaeze Okafor", role: "L2", time: "10:30", text: "Just hit checkpoint 3 🎉 Vector Initiate badge unlocked." },
  { user: "Yusuf Garba", role: "L2", time: "10:32", text: "Lets gooo 🚀" },
];

const statusTone: Record<string, string> = {
  online: "bg-accent",
  idle: "bg-warning",
  dnd: "bg-destructive",
  offline: "bg-muted-foreground",
};

const Community = () => {
  const [active, setActive] = useState("general");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(seedMessages);
  const channel = channels.find((c) => c.id === active)!;

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { user: "Adaeze Okafor", role: "L2", time: "now", text: draft }]);
    setDraft("");
  };

  return (
    <div className="animate-fade-up h-[calc(100vh-9rem)] flex rounded-2xl overflow-hidden glass-panel">
      {/* Channel sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-background/40">
        <div className="p-4 border-b border-border">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-1">// community</p>
          <h2 className="font-display font-bold">Talent Nation HQ</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <p className="px-2 py-1 text-[11px] font-mono uppercase text-muted-foreground tracking-wider">Channels</p>
          {channels.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors",
                active === c.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Hash className="h-4 w-4" />
              {c.name}
            </button>
          ))}
          <p className="mt-4 px-2 py-1 text-[11px] font-mono uppercase text-muted-foreground tracking-wider">Voice</p>
          <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Volume2 className="h-4 w-4" /> raid standup
          </button>
          <p className="mt-4 px-2 py-1 text-[11px] font-mono uppercase text-muted-foreground tracking-wider">Direct</p>
          {["Ibrahim Musa", "Chinwe Eze"].map((n) => (
            <button key={n} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="truncate">{n}</span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-border flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">AO</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">Adaeze Okafor</p>
            <p className="text-[11px] text-accent">Online</p>
          </div>
        </div>
      </aside>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 lg:px-6 py-3 border-b border-border flex items-center justify-between gap-3 bg-background/30">
          <div className="flex items-center gap-2 min-w-0">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-display font-bold truncate">{channel.name}</h3>
            <span className="hidden sm:inline text-xs text-muted-foreground border-l border-border pl-3 ml-1 truncate">{channel.topic}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon"><Pin className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><AtSign className="h-4 w-4" /></Button>
            <div className="relative hidden lg:block ml-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input className="h-8 w-44 rounded-md bg-muted border border-border pl-7 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring" placeholder="Search messages" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((m, i) => (
            <Message key={i} {...m} isMe={m.user === "Adaeze Okafor"} />
          ))}
        </div>

        <div className="p-3 lg:p-4 border-t border-border bg-background/30">
          <div className="flex items-center gap-2 rounded-xl bg-muted border border-border px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
            <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-4 w-4" /></Button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={`Message #${channel.name}`}
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            <Button variant="ghost" size="icon" className="h-7 w-7"><Paperclip className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><Smile className="h-4 w-4" /></Button>
            <Button variant="hero" size="sm" onClick={send} className="gap-1"><Send className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
      </div>

      {/* Members */}
      <aside className="hidden xl:flex w-60 flex-col border-l border-border bg-background/40">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-semibold">Members — {members.length}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {members.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-muted grid place-items-center text-[11px] font-semibold">
                  {m.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <span className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-background", statusTone[m.status])} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate flex items-center gap-1">
                  {m.role === "Mentor" && <Crown className="h-3 w-3 text-warning" />}
                  {m.name}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

const Message = ({ user, role, time, text, isMe }: any) => (
  <div className={cn("flex gap-3 group", isMe && "")}>
    <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground flex-shrink-0">
      {user.split(" ").map((s: string) => s[0]).join("")}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-2">
        <span className={cn("font-semibold text-sm", isMe && "text-primary")}>{user}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">{role}</span>
        <span className="text-[11px] text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm text-foreground/90 mt-0.5 break-words">{text}</p>
    </div>
  </div>
);

export default Community;
