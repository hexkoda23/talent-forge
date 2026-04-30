import { Link } from "react-router-dom";
import { Trophy, Flame, Target, Zap, ArrowRight, Lock, CheckCircle2, Clock, Sparkles, TrendingUp, BookOpen, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 lg:p-8">
        <div className="absolute inset-0 bg-gradient-aurora opacity-50" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">// welcome back</p>
              <h1 className="font-display text-3xl lg:text-4xl font-bold">Adaeze, you're on fire 🔥</h1>
              <p className="text-muted-foreground mt-2 max-w-lg">
                You're 64% through Level 1. Two more checkpoints to unlock your first Raid.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium">AI Engineer · Level 1</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress to Level 2</span>
              <span className="font-mono text-sm">64%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
              <div className="h-full bg-gradient-primary relative" style={{ width: "64%" }}>
                <div className="absolute inset-0 animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} label="XP earned" value="2,480" trend="+340 this week" tone="primary" />
        <StatCard icon={Flame} label="Day streak" value="7" trend="Keep it going" tone="warning" />
        <StatCard icon={Target} label="Quests done" value="12 / 18" trend="3 in progress" tone="violet" />
        <StatCard icon={TrendingUp} label="Cohort rank" value="#24" trend="↑ 6 this week" tone="accent" />
      </div>

      {/* Two col: current task + checkpoints */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-1">// current quest</p>
              <h2 className="font-display text-xl font-semibold">Build a RAG pipeline with Pinecone</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-warning/15 text-warning text-xs font-semibold border border-warning/30">
              Hard
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Implement a retrieval-augmented generation pipeline. Ingest a corpus, embed it, and let an LLM answer
            questions grounded in your data. Push your code to the workspace.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-5">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Due in 4 days</span>
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-secondary" /> +280 XP</span>
            <span className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-warning" /> Badge: Vector Initiate</span>
          </div>
          <Link to="/dashboard/quests">
            <Button variant="hero" className="gap-2">Open quest <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-3">// checkpoints</p>
          <div className="space-y-2.5">
            {checkpoints.map((c) => (
              <div key={c.title} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                {c.status === "done" && <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />}
                {c.status === "current" && <div className="h-5 w-5 rounded-full border-2 border-primary grid place-items-center"><div className="h-2 w-2 rounded-full bg-primary animate-pulse" /></div>}
                {c.status === "locked" && <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium truncate", c.status === "locked" && "text-muted-foreground")}>{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLink to="/dashboard/workspace" icon={Code2} title="Open Workspace" desc="Push your latest commits" />
        <QuickLink to="/dashboard/logbook" icon={BookOpen} title="Update Logbook" desc="Today's entry pending" />
        <QuickLink to="/dashboard/quests" icon={Trophy} title="Browse Raids" desc="Team up for big rewards" />
        <QuickLink to="/dashboard/leaderboard" icon={Trophy} title="Leaderboard" desc="You're #13 — climb!" />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, tone }: { icon: any; label: string; value: string; trend: string; tone: "primary" | "violet" | "accent" | "warning" }) => {
  const tones: Record<string, string> = {
    primary: "bg-primary/15 text-primary",
    violet: "bg-secondary/15 text-secondary",
    accent: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className={`h-9 w-9 rounded-lg grid place-items-center mb-3 ${tones[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-bold mt-0.5">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{trend}</p>
    </div>
  );
};

const QuickLink = ({ to, icon: Icon, title, desc }: { to: string; icon: any; title: string; desc: string }) => (
  <Link to={to} className="glass-panel rounded-xl p-5 group hover:border-primary/40 hover:-translate-y-0.5 transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
    </div>
    <p className="font-display font-semibold">{title}</p>
    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
  </Link>
);

const checkpoints = [
  { title: "Python fundamentals", meta: "Completed · +120 XP", status: "done" as const },
  { title: "Linear algebra refresher", meta: "Completed · +180 XP", status: "done" as const },
  { title: "Embeddings & vectors", meta: "In progress · 60%", status: "current" as const },
  { title: "Prompt engineering", meta: "Locked", status: "locked" as const },
  { title: "Fine-tuning basics", meta: "Locked", status: "locked" as const },
];

export default DashboardHome;
