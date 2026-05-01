import { useState } from "react";
import {
  CheckCircle2,
  Lock,
  Sparkles,
  Zap,
  Trophy,
  ArrowRight,
  Play,
  Clock,
  AlertTriangle,
  CalendarDays,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const weekCompletionPct = 72; // < 80 means exam locked
const isReady = weekCompletionPct >= 80;

const path = [
  { week: 1, title: "Python Foundations", xp: 200, status: "done", score: 92 },
  { week: 2, title: "Data & Linear Algebra", xp: 220, status: "done", score: 88 },
  { week: 3, title: "Embeddings & Vector Search", xp: 250, status: "current" },
  { week: 4, title: "Prompt Engineering", xp: 270, status: "locked" },
  { week: 5, title: "RAG Pipelines", xp: 320, status: "locked" },
  { week: 6, title: "Fine-tuning Basics", xp: 360, status: "locked" },
];

const Checkpoints = () => {
  const [reflection, setReflection] = useState("");

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">
            // weekly checkpoint
          </p>
          <h1 className="font-display text-2xl lg:text-4xl font-bold">
            Saturday Exam · Week 3
          </h1>
          <p className="text-muted-foreground mt-2 text-sm lg:text-base">
            Timed quiz · conceptual + applied questions. Pass to unlock Week 4.
          </p>
        </div>
        <div className="glass-panel rounded-xl px-4 py-3 flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-warning" />
          <div>
            <p className="text-xs text-muted-foreground">This Saturday</p>
            <p className="font-display font-bold text-sm">10:00 AM · 60 min</p>
          </div>
        </div>
      </div>

      {/* Readiness gate */}
      <div
        className={cn(
          "glass-panel rounded-2xl p-5 lg:p-6 relative overflow-hidden",
          isReady ? "border-accent/40" : "border-warning/40"
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-1">
              // checkpoint readiness
            </p>
            <h2 className="font-display text-xl font-semibold">
              {isReady ? "You're eligible 🎯" : "Not eligible yet"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Need <span className="font-mono">≥ 80%</span> of weekly tasks complete to
              sit the exam.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Readiness</p>
            <p className={cn("font-display text-3xl font-bold", isReady ? "text-accent" : "text-warning")}>
              {weekCompletionPct}%
            </p>
          </div>
        </div>

        <div className="relative h-3 bg-muted rounded-full overflow-hidden border border-border mb-2">
          <div
            className={cn(
              "h-full transition-all relative",
              isReady ? "bg-gradient-primary" : "bg-warning"
            )}
            style={{ width: `${weekCompletionPct}%` }}
          >
            <div className="absolute inset-0 animate-shimmer" />
          </div>
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-foreground/70"
            style={{ left: "80%" }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
          <span>0%</span>
          <span className="text-foreground">target 80%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Pre-exam: summary video + reflection */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-3">
            // step 1 · weekly summary
          </p>
          <div className="aspect-video rounded-xl bg-muted border border-border grid place-items-center relative overflow-hidden mb-3">
            <div className="absolute inset-0 bg-gradient-aurora opacity-30" />
            <div className="relative h-14 w-14 rounded-full bg-primary/90 grid place-items-center text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.6)] animate-pulse-glow">
              <Play className="h-6 w-6 ml-1" />
            </div>
          </div>
          <h3 className="font-display font-semibold">
            Week 3 recap · Embeddings & retrieval
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            8 minutes. Watch before sitting the exam.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 flex flex-col">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-3">
            // step 2 · reflection
          </p>
          <h3 className="font-display font-semibold flex items-center gap-2">
            <Brain className="h-4 w-4 text-secondary" /> What did you learn this week?
          </h3>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Required. Be specific — list 2 concepts and 1 thing you struggled with.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="This week I learned how cosine similarity works and built my first vector index using pgvector. I struggled with chunking strategies for long PDFs…"
            className="flex-1 min-h-[140px] w-full rounded-lg bg-muted border border-border p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span className="font-mono">{reflection.length} chars</span>
            <span>min. 200 chars</span>
          </div>
        </div>
      </div>

      {/* Exam CTA */}
      <div className="glass-panel rounded-2xl p-5 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-1">
                // step 3 · sit the exam
              </p>
              <h3 className="font-display text-lg font-semibold">
                Week 3 Checkpoint Exam
              </h3>
              <p className="text-sm text-muted-foreground">
                15 conceptual + 5 applied questions · 60 minutes · single attempt
              </p>
            </div>
          </div>
          <Button variant={isReady ? "hero" : "soft"} disabled={!isReady} className="gap-2">
            {isReady ? "Start exam" : "Locked — finish this week first"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {!isReady && (
          <div className="mt-4 rounded-xl border border-warning/30 bg-warning/5 p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <span className="text-warning font-semibold">Strict rule:</span> no
              checkpoint exam → no Week 4 unlock. Catch up on your daily quests now.
            </p>
          </div>
        )}
      </div>

      {/* Path */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-3">
          // your path
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {path.map((p) => {
            const isDone = p.status === "done";
            const isCurrent = p.status === "current";
            const isLocked = p.status === "locked";
            return (
              <div
                key={p.week}
                className={cn(
                  "glass-panel rounded-xl p-4 transition-all",
                  isCurrent && "border-primary/50",
                  isLocked && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">
                    Week {p.week}
                  </span>
                  {isDone && <CheckCircle2 className="h-4 w-4 text-accent" />}
                  {isCurrent && (
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  )}
                  {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="font-display font-semibold text-sm">{p.title}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="flex items-center gap-1 text-secondary font-mono">
                    <Zap className="h-3 w-3" /> +{p.xp}
                  </span>
                  {isDone && (
                    <span className="text-accent font-mono">{p.score}%</span>
                  )}
                  {isCurrent && (
                    <span className="text-primary font-mono">in progress</span>
                  )}
                  {isLocked && (
                    <span className="text-muted-foreground font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" /> locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Checkpoints;
