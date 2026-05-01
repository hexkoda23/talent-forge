import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  CheckCircle2,
  Clock,
  Zap,
  Users,
  Flame,
  Filter,
  ArrowRight,
  AlertTriangle,
  ClipboardCheck,
  Calendar,
  HelpCircle,
  PlayCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "today" | "raid" | "audits";

// Mock state — flip learnDone to true to unlock quest UI
const learnDone = false;
const learnPct = 65;

const useCountdown = (target: Date) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const endOfDay = () => {
  const d = new Date();
  d.setHours(23, 59, 0, 0);
  return d;
};

const audits = [
  { title: "Audit · Tunde's RAG pipeline submission", desc: "Score code quality, correctness and clarity. Be fair, be specific.", status: "current", reward: 40, due: "Today · 6:00 PM" },
  { title: "Audit · Kemi's sentiment endpoint", desc: "Run her repo, test 5 inputs, leave structured feedback.", status: "open", reward: 40, due: "Tomorrow · 12:00 PM" },
  { title: "Audit · Ifeanyi's prompt-defense write-up", desc: "Check for plagiarism + technical accuracy.", status: "open", reward: 35, due: "Tomorrow · 12:00 PM" },
];

const Quests = () => {
  const [tab, setTab] = useState<Tab>("today");
  const countdown = useCountdown(endOfDay());

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">
          // daily mission
        </p>
        <h1 className="font-display text-2xl lg:text-4xl font-bold">
          Daily Quest, Raids & Audits
        </h1>
        <p className="text-muted-foreground mt-2 text-sm lg:text-base">
          One quest per day. Locked until you finish Learn. Closes at 11:59 PM. Max 3
          attempts. Miss it → streak resets.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-muted border border-border w-fit max-w-full overflow-x-auto">
        {([
          { k: "today", label: "Today's Quest", icon: Calendar },
          { k: "raid", label: "Weekly Raid", icon: Flame },
          { k: "audits", label: "Audits", icon: ClipboardCheck },
        ] as const).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as Tab)}
            className={cn(
              "px-3 lg:px-4 h-9 rounded-lg text-xs lg:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap",
              tab === t.k
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
        <div className="hidden lg:block" />
      </div>

      {tab === "today" && <TodayQuest learnDone={learnDone} learnPct={learnPct} countdown={countdown} />}
      {tab === "raid" && <Raid />}
      {tab === "audits" && (
        <div>
          <p className="text-xs text-muted-foreground mb-3 font-mono">
            // grade other students' submissions for XP
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {audits.map((a) => (
              <AuditCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TodayQuest = ({
  learnDone,
  learnPct,
  countdown,
}: {
  learnDone: boolean;
  learnPct: number;
  countdown: string;
}) => {
  const attemptsLeft = 3;

  if (!learnDone) {
    return (
      <div className="space-y-4">
        <div className="glass-panel rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-aurora opacity-30" />
          <div className="relative flex flex-col items-center text-center max-w-md mx-auto py-6">
            <div className="h-16 w-16 rounded-full bg-muted border border-border grid place-items-center mb-4">
              <Lock className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Quest is locked</h2>
            <p className="text-muted-foreground mb-5">
              Today's quest unlocks once you finish the{" "}
              <span className="text-primary font-semibold">Learn phase</span>. No
              shortcuts.
            </p>

            <div className="w-full max-w-sm mb-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Learn progress</span>
                <span className="font-mono">{learnPct}%</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-gradient-primary relative"
                  style={{ width: `${learnPct}%` }}
                >
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
              </div>
            </div>

            <Link to="/dashboard/learn">
              <Button variant="hero" className="gap-2">
                <PlayCircle className="h-4 w-4" /> Continue Learn phase
              </Button>
            </Link>
          </div>
        </div>

        <RuleBanner countdown={countdown} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <RuleBanner countdown={countdown} />
      <div className="glass-panel rounded-2xl p-5 lg:p-6 border-primary/40">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-1">
              // today's quest · day 14
            </p>
            <h2 className="font-display text-xl lg:text-2xl font-semibold">
              Build a top-k semantic search API
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-semibold border border-primary/30">
            Daily
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Use FastAPI + pgvector. Index 50 short docs. Endpoint{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            POST /search
          </code>{" "}
          returns top 5 with similarity scores. Push to your GTEA branch and submit the
          repo link.
        </p>

        <div className="grid sm:grid-cols-3 gap-2 lg:gap-3 mb-4 text-sm">
          <Pill icon={Clock} label="Closes" value={`${countdown}`} tone="warning" />
          <Pill icon={Zap} label="Reward" value="+180 XP" tone="primary" />
          <Pill icon={RotateCcw} label="Attempts" value={`${attemptsLeft} of 3 left`} tone="violet" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="hero" className="gap-2">
            <PlayCircle className="h-4 w-4" /> Start attempt
          </Button>
          <Button variant="soft" className="gap-2">
            <HelpCircle className="h-4 w-4" /> Need help?
          </Button>
        </div>

        {/* Help section */}
        <div className="mt-5 pt-5 border-t border-border">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            // need help?
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "📺 Building your first vector index — 12 min",
              "📺 Cosine similarity in 60 seconds",
              "📄 Talent Nation handbook · pgvector setup",
              "📄 Common retrieval failure modes",
            ].map((h) => (
              <button
                key={h}
                className="text-left text-sm rounded-lg p-3 bg-muted/40 border border-border hover:border-primary/40 transition-colors"
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Bonus */}
        <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-3 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <span className="text-accent font-semibold">Early-bird bonus:</span> submit
            before 6:00 PM for{" "}
            <span className="font-mono text-foreground">+60 XP</span> and a streak
            multiplier.
          </p>
        </div>
      </div>
    </div>
  );
};

const RuleBanner = ({ countdown }: { countdown: string }) => (
  <div className="glass-panel rounded-xl p-4 border-warning/40 flex items-start gap-3">
    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
    <div className="text-sm flex-1">
      <p className="font-semibold">
        Quest closes in <span className="font-mono text-warning">{countdown}</span>.
      </p>
      <p className="text-muted-foreground mt-0.5">
        Miss it → 0 XP and your streak resets. Max 3 attempts allowed.
      </p>
    </div>
  </div>
);

const Pill = ({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: any;
  label: string;
  value: string;
  tone: "warning" | "primary" | "violet";
}) => {
  const tones: Record<string, string> = {
    warning: "text-warning bg-warning/10 border-warning/30",
    primary: "text-primary bg-primary/10 border-primary/30",
    violet: "text-secondary bg-secondary/10 border-secondary/30",
  };
  return (
    <div className={cn("rounded-lg border p-3 flex items-center gap-2.5", tones[tone])}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase font-mono opacity-80">{label}</p>
        <p className="text-sm font-semibold font-mono truncate">{value}</p>
      </div>
    </div>
  );
};

const Raid = () => (
  <div className="space-y-4">
    <div className="glass-panel rounded-2xl p-5 lg:p-6 border-destructive/30">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-destructive mb-1">
            // weekly raid · live
          </p>
          <h2 className="font-display text-xl lg:text-2xl font-semibold">
            Multi-agent customer support bot
          </h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-destructive/15 text-destructive text-[11px] font-semibold border border-destructive/30 flex items-center gap-1.5">
          <Flame className="h-3 w-3" /> Raid
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Build a 3-agent system (router · researcher · responder) that answers customer
        tickets from a small docs corpus. Ship a working demo and a 2-min Loom.
      </p>

      <div className="grid sm:grid-cols-3 gap-2 lg:gap-3 mb-4">
        <Pill icon={Clock} label="Submit by" value="Sun · 11:59 PM" tone="warning" />
        <Pill icon={Zap} label="Reward" value="+1200 XP" tone="primary" />
        <Pill icon={Users} label="Auto-grouped" value="Team #07" tone="violet" />
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 mb-4">
        <p className="text-xs font-mono uppercase text-muted-foreground mb-2">
          // your team (random · fri 00:00)
        </p>
        <div className="space-y-2">
          {[
            { i: "AO", name: "Adaeze Okafor", role: "you", tone: "primary" },
            { i: "TK", name: "Tunde Kazeem", role: "Lagos · Lvl 5" },
            { i: "KE", name: "Kemi Eze", role: "Abuja · Lvl 4" },
          ].map((m) => (
            <div key={m.i} className="flex items-center gap-3">
              <div
                className={cn(
                  "h-9 w-9 rounded-full grid place-items-center text-xs font-semibold",
                  m.tone === "primary"
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-muted text-foreground border border-border"
                )}
              >
                {m.i}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
              {m.role === "you" && (
                <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30">
                  YOU
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-warning/30 bg-warning/5 p-3 flex items-start gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          <span className="text-warning font-semibold">Audit ahead:</span> after
          submission, an admin will run a short live interview with each member. Pass /
          fail is decided per-person.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="hero" className="gap-2">
          <Users className="h-4 w-4" /> Open team channel
        </Button>
        <Button variant="soft" className="gap-2">
          Submit raid <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

const AuditCard = (a: { title: string; desc: string; status: string; reward: number; due: string }) => (
  <div className="glass-panel rounded-2xl p-5 hover:border-primary/40 transition-all">
    <div className="flex items-start justify-between mb-3">
      <div className="h-10 w-10 rounded-lg bg-muted border border-border grid place-items-center">
        <ClipboardCheck className="h-5 w-5 text-accent" />
      </div>
      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-accent/15 text-accent border-accent/30">
        Audit
      </span>
    </div>
    <h3 className="font-display text-lg font-semibold mb-1">{a.title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1">
          <Zap className="h-3.5 w-3.5 text-secondary" /> +{a.reward} XP
        </span>
        <span className="flex items-center gap-1 font-mono">
          <Clock className="h-3.5 w-3.5" /> {a.due}
        </span>
      </div>
      <Button variant={a.status === "current" ? "hero" : "soft"} size="sm" className="gap-1">
        {a.status === "current" ? "Continue" : "Start audit"}{" "}
        <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  </div>
);

export default Quests;
