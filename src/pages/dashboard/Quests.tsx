import { useState } from "react";
import { Trophy, Lock, CheckCircle2, Clock, Zap, Users, Flame, Target, Filter, ArrowRight, AlertTriangle, ClipboardCheck, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "checkpoints" | "quests" | "raids" | "audits";

const data = {
  checkpoints: [
    { title: "Week 1 Exam · Python & Foundations", desc: "Timed weekly exam. 60 minutes. Pass to unlock Week 2 quests.", status: "done", reward: 200, difficulty: "Exam", due: "Submitted" },
    { title: "Week 2 Exam · Linear Algebra", desc: "Timed weekly exam. 60 minutes. Vectors, matrices, dot products.", status: "done", reward: 220, difficulty: "Exam", due: "Submitted" },
    { title: "Week 3 Exam · Embeddings & Vector Search", desc: "Timed weekly exam. 60 minutes. Auto-graded + manual review.", status: "current", reward: 250, difficulty: "Exam", due: "Sat 10:00 AM" },
    { title: "Week 4 Exam · Prompt Engineering", desc: "Locked until Week 3 exam is passed.", status: "locked", reward: 270, difficulty: "Exam" },
    { title: "Week 5 Exam · Fine-tuning Basics", desc: "Locked. LoRA, dataset prep, evaluation.", status: "locked", reward: 320, difficulty: "Exam" },
  ],
  quests: [
    { title: "Daily · Embed 100 Wikipedia paragraphs", desc: "Use sentence-transformers, store in pgvector, return top-5 search.", status: "current", reward: 80, difficulty: "Daily", due: "Today · 12:00 PM" },
    { title: "Daily · Build a sentiment classifier endpoint", desc: "FastAPI + a small HF model. Submit repo link.", status: "open", reward: 90, difficulty: "Daily", due: "Today · 11:59 PM" },
    { title: "Daily · Prompt-injection defense write-up", desc: "Short report (max 500 words) + 3 example payloads.", status: "open", reward: 60, difficulty: "Daily", due: "Tomorrow · 12:00 PM" },
    { title: "Daily · LangChain mini RAG demo", desc: "Index 10 PDFs, answer 5 questions. Push to your workspace.", status: "missed", reward: 0, difficulty: "Daily", due: "Missed · 0 XP" },
    { title: "Daily · Logbook entry", desc: "Today's SIWES log. Quick form. 10 minutes.", status: "done", reward: 30, difficulty: "Daily", due: "Done" },
  ],
  raids: [
    { title: "Weekly Raid · Multi-agent customer support bot", desc: "Auto-grouped with 2 random teammates. Plan, build, ship, demo by Sunday 11:59 PM.", status: "current", reward: 1200, difficulty: "Raid", team: "Adaeze · Tunde · Kemi", due: "Sun · 11:59 PM" },
    { title: "Next Raid · Pidgin speech model fine-tune", desc: "New random team will be assigned Monday 00:00.", status: "open", reward: 1500, difficulty: "Raid", team: "Auto-grouped Monday", due: "Next week" },
    { title: "Future Raid · Open-source PR sprint", desc: "Land a merged PR in a popular AI repo with your team.", status: "locked", reward: 800, difficulty: "Raid", team: "Auto-grouped" },
  ],
  audits: [
    { title: "Audit · Tunde's RAG pipeline submission", desc: "Score code quality, correctness and clarity. Be fair, be specific.", status: "current", reward: 40, difficulty: "Audit", due: "Today · 6:00 PM" },
    { title: "Audit · Kemi's sentiment endpoint", desc: "Run her repo, test 5 inputs, leave structured feedback.", status: "open", reward: 40, difficulty: "Audit", due: "Tomorrow · 12:00 PM" },
    { title: "Audit · Ifeanyi's prompt-defense write-up", desc: "Check for plagiarism + technical accuracy.", status: "open", reward: 35, difficulty: "Audit", due: "Tomorrow · 12:00 PM" },
  ],
} as const;

const Quests = () => {
  const [tab, setTab] = useState<Tab>("quests");

  const tabMeta: Record<Tab, { icon: any; label: string; sub: string }> = {
    checkpoints: { icon: GraduationCap, label: "Checkpoints", sub: "Weekly timed exams" },
    quests: { icon: Calendar, label: "Quests", sub: "Daily · timed · miss = 0 XP" },
    raids: { icon: Flame, label: "Raids", sub: "Weekly · auto-grouped teams of 3" },
    audits: { icon: ClipboardCheck, label: "Audits", sub: "Grade other students' work" },
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">// learning system</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Quests, Raids, Audits & Checkpoints</h1>
          <p className="text-muted-foreground mt-2">Daily timed quests · weekly random raids · peer audits · weekly checkpoint exams.</p>
        </div>
        <Button variant="soft" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
      </div>

      {/* Rule banner */}
      <div className="glass-panel rounded-xl p-4 border-warning/40 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold">Quests are timed. Miss the deadline → <span className="text-warning">0 XP, no exceptions.</span></p>
          <p className="text-muted-foreground mt-0.5">Most daily quests are due by <span className="font-mono">12:00 PM</span>. Raids run weekly. Checkpoint exams are mandatory to unlock the next level.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-muted border border-border w-fit">
        {(["quests", "raids", "audits", "checkpoints"] as Tab[]).map((t) => {
          const Icon = tabMeta[t].icon;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 h-9 rounded-lg text-sm font-medium capitalize transition-all flex items-center gap-2",
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tabMeta[t].label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground -mt-2 font-mono">// {tabMeta[tab].sub}</p>

      <div className="grid md:grid-cols-2 gap-4">
        {tab === "checkpoints" && data.checkpoints.map((c) => <ItemCard key={c.title} {...c} type="checkpoint" />)}
        {tab === "quests" && data.quests.map((c) => <ItemCard key={c.title} {...c} type="quest" />)}
        {tab === "raids" && data.raids.map((c) => <ItemCard key={c.title} {...c} type="raid" />)}
        {tab === "audits" && data.audits.map((c) => <ItemCard key={c.title} {...c} type="audit" />)}
      </div>
    </div>
  );
};

const ItemCard = (props: any) => {
  const { title, desc, status, reward, difficulty, due, team, type } = props;
  const Icon =
    type === "raid" ? Flame :
    type === "checkpoint" ? GraduationCap :
    type === "audit" ? ClipboardCheck :
    Calendar;

  const diffTones: Record<string, string> = {
    Daily: "text-primary bg-primary/15 border-primary/30",
    Raid: "text-destructive bg-destructive/15 border-destructive/30",
    Audit: "text-accent bg-accent/15 border-accent/30",
    Exam: "text-warning bg-warning/15 border-warning/30",
  };

  const isLocked = status === "locked";
  const isDone = status === "done";
  const isMissed = status === "missed";

  return (
    <div className={cn(
      "glass-panel rounded-2xl p-5 transition-all",
      !isLocked && !isMissed && "hover:border-primary/40 hover:-translate-y-0.5",
      isLocked && "opacity-60",
      isMissed && "border-destructive/40 opacity-80"
    )}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="h-10 w-10 rounded-lg bg-muted border border-border grid place-items-center">
          {isLocked ? <Lock className="h-5 w-5 text-muted-foreground" /> : <Icon className="h-5 w-5 text-primary" />}
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold border", diffTones[difficulty])}>
          {difficulty}
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{desc}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1">
            <Zap className={cn("h-3.5 w-3.5", isMissed ? "text-destructive" : "text-secondary")} />
            {isMissed ? "0 XP" : `+${reward} XP`}
          </span>
          {due && (
            <span className={cn("flex items-center gap-1 font-mono", isMissed && "text-destructive")}>
              <Clock className="h-3.5 w-3.5" /> {due}
            </span>
          )}
          {team && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {team}</span>}
        </div>
        {isDone ? (
          <span className="flex items-center gap-1 text-accent font-medium"><CheckCircle2 className="h-4 w-4" /> Done</span>
        ) : isMissed ? (
          <span className="flex items-center gap-1 text-destructive font-medium"><AlertTriangle className="h-4 w-4" /> Missed</span>
        ) : isLocked ? (
          <span className="text-muted-foreground">Locked</span>
        ) : (
          <Button variant={status === "current" ? "hero" : "soft"} size="sm" className="gap-1">
            {status === "current" ? "Continue" : type === "audit" ? "Start audit" : type === "checkpoint" ? "Open exam" : "Start"} <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quests;
