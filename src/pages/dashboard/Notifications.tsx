import { Bell, CheckCircle2, Clock, MessageSquare, Trophy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { type: "approval", title: "Quest approved", body: "Your submission for 'Sentiment classifier API' was approved. +220 XP awarded.", time: "10m ago", unread: true, icon: CheckCircle2, tone: "accent" },
  { type: "deadline", title: "Deadline approaching", body: "Quest 'RAG pipeline with Pinecone' is due in 4 days.", time: "2h ago", unread: true, icon: Clock, tone: "warning" },
  { type: "admin", title: "Message from Talent Nation", body: "Cohort 03 town hall this Saturday at 4pm WAT. Don't miss it.", time: "yesterday", unread: false, icon: MessageSquare, tone: "primary" },
  { type: "raid", title: "New Raid unlocked", body: "‘Multi-agent customer support bot’ is now available. Form your team!", time: "2d ago", unread: false, icon: Trophy, tone: "violet" },
  { type: "warn", title: "Logbook reminder", body: "You missed yesterday's logbook entry. Catch up to keep your streak.", time: "3d ago", unread: false, icon: AlertCircle, tone: "destructive" },
];

const tones: Record<string, string> = {
  accent: "bg-accent/15 text-accent",
  warning: "bg-warning/15 text-warning",
  primary: "bg-primary/15 text-primary",
  violet: "bg-secondary/15 text-secondary",
  destructive: "bg-destructive/15 text-destructive",
};

const Notifications = () => {
  return (
    <div className="space-y-6 animate-fade-up max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">// inbox</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold flex items-center gap-3">
            Notifications
            <span className="text-sm font-sans font-normal text-muted-foreground">2 unread</span>
          </h1>
        </div>
        <Button variant="soft" size="sm">Mark all read</Button>
      </div>

      <div className="space-y-2">
        {items.map((n, i) => (
          <div
            key={i}
            className={cn(
              "glass-panel rounded-xl p-4 flex gap-4 hover:border-primary/40 transition-colors",
              n.unread && "border-primary/30"
            )}
          >
            <div className={cn("h-10 w-10 rounded-lg grid place-items-center flex-shrink-0", tones[n.tone])}>
              <n.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3 mb-0.5">
                <p className="font-semibold text-sm truncate">{n.title}</p>
                <span className="text-xs text-muted-foreground flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{n.body}</p>
            </div>
            {n.unread && <span className="h-2 w-2 rounded-full bg-primary self-center flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
