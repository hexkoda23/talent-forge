import { useState } from "react";
import { Trophy, Lock, CheckCircle2, Clock, Zap, Users, Flame, Target, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "checkpoints" | "quests" | "raids";

const data = {
  checkpoints: [
    { title: "Python fundamentals", desc: "Variables, loops, functions, OOP basics.", status: "done", reward: 120, difficulty: "Easy" },
    { title: "Linear algebra refresher", desc: "Vectors, matrices, dot products.", status: "done", reward: 180, difficulty: "Medium" },
    { title: "Embeddings & vector search", desc: "Embed text, query a vector store.", status: "current", reward: 200, difficulty: "Medium" },
    { title: "Prompt engineering", desc: "System prompts, few-shot, structured outputs.", status: "locked", reward: 220, difficulty: "Medium" },
    { title: "Fine-tuning basics", desc: "LoRA, dataset prep, evaluation.", status: "locked", reward: 280, difficulty: "Hard" },
  ],
  quests: [
    { title: "Build a RAG pipeline", desc: "Ingest a corpus, retrieve with embeddings, answer with an LLM.", status: "current", reward: 280, difficulty: "Hard", due: "4 days" },
    { title: "Sentiment classifier API", desc: "Wrap a small model in FastAPI. Deploy with Docker.", status: "open", reward: 220, difficulty: "Medium", due: "1 week" },
    { title: "Vector DB benchmark", desc: "Compare Pinecone, Qdrant and pgvector on the same workload.", status: "open", reward: 260, difficulty: "Medium", due: "1 week" },
    { title: "LLM evaluator harness", desc: "Score model outputs with multiple judges.", status: "open", reward: 320, difficulty: "Hard", due: "2 weeks" },
    { title: "Daily logbook setup", desc: "Submit your first SIWES logbook entry.", status: "done", reward: 60, difficulty: "Easy", due: "Done" },
  ],
  raids: [
    { title: "Build a multi-agent customer support bot", desc: "Team raid. Plan, build, ship, demo.", status: "open", reward: 1200, difficulty: "Boss", team: "4-6 students" },
    { title: "Train a Pidgin speech model", desc: "Collect data, fine-tune Whisper, evaluate.", status: "open", reward: 1500, difficulty: "Boss", team: "3-5 students" },
    { title: "Open-source contribution sprint", desc: "Land a merged PR in a popular AI repo.", status: "locked", reward: 800, difficulty: "Hard", team: "Solo" },
  ],
} as const;

const Quests = () => {
  const [tab, setTab] = useState<Tab>("quests");

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">// learning system</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Quests, Raids & Checkpoints</h1>
          <p className="text-muted-foreground mt-2">Three flavors of progress. Pick your battle.</p>
        </div>
        <Button variant="soft" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-xl bg-muted border border-border w-fit">
        {(["checkpoints", "quests", "raids"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 h-9 rounded-lg text-sm font-medium capitalize transition-all",
              tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tab === "checkpoints" && data.checkpoints.map((c) => <ItemCard key={c.title} {...c} type="checkpoint" />)}
        {tab === "quests" && data.quests.map((c) => <ItemCard key={c.title} {...c} type="quest" />)}
        {tab === "raids" && data.raids.map((c) => <ItemCard key={c.title} {...c} type="raid" />)}
      </div>
    </div>
  );
};

const ItemCard = (props: any) => {
  const { title, desc, status, reward, difficulty, due, team, type } = props;
  const Icon = type === "raid" ? Flame : type === "checkpoint" ? Target : Trophy;

  const diffTones: Record<string, string> = {
    Easy: "text-accent bg-accent/15 border-accent/30",
    Medium: "text-primary bg-primary/15 border-primary/30",
    Hard: "text-warning bg-warning/15 border-warning/30",
    Boss: "text-destructive bg-destructive/15 border-destructive/30",
  };

  const isLocked = status === "locked";
  const isDone = status === "done";

  return (
    <div className={cn(
      "glass-panel rounded-2xl p-5 transition-all",
      !isLocked && "hover:border-primary/40 hover:-translate-y-0.5",
      isLocked && "opacity-60"
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
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-secondary" /> +{reward} XP</span>
          {due && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {due}</span>}
          {team && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {team}</span>}
        </div>
        {isDone ? (
          <span className="flex items-center gap-1 text-accent font-medium"><CheckCircle2 className="h-4 w-4" /> Done</span>
        ) : isLocked ? (
          <span className="text-muted-foreground">Locked</span>
        ) : (
          <Button variant={status === "current" ? "hero" : "soft"} size="sm" className="gap-1">
            {status === "current" ? "Continue" : "Start"} <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quests;
