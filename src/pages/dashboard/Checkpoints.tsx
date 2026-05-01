import { CheckCircle2, Lock, Sparkles, Zap, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const path = [
  { title: "Python Foundations", desc: "Loops, functions, OOP, async.", xp: 120, status: "done" },
  { title: "Data & Linear Algebra", desc: "Vectors, matrices, calculus essentials.", xp: 180, status: "done" },
  { title: "Embeddings & Vectors", desc: "Encode meaning, search semantically.", xp: 200, status: "current", progress: 60 },
  { title: "Prompt Engineering", desc: "Structured prompts, few-shot, JSON modes.", xp: 220, status: "locked" },
  { title: "RAG Pipelines", desc: "Index, retrieve, generate. Ship it.", xp: 280, status: "locked" },
  { title: "Fine-Tuning", desc: "LoRA, datasets, evaluation.", xp: 320, status: "locked" },
  { title: "Agents & Tools", desc: "Multi-step reasoning, tool use, planning.", xp: 380, status: "locked" },
  { title: "Production AI", desc: "Latency, cost, observability, safety.", xp: 460, status: "locked" },
];

const Checkpoints = () => {
  const done = path.filter((p) => p.status === "done").length;
  const total = path.length;

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">// weekly exams</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Checkpoint Exams</h1>
          <p className="text-muted-foreground mt-2">One timed exam per week. Pass it to unlock the next stage of the journey.</p>
        </div>
        <div className="glass-panel rounded-xl px-4 py-3 flex items-center gap-3">
          <Trophy className="h-5 w-5 text-warning" />
          <div>
            <p className="text-xs text-muted-foreground">Mastered</p>
            <p className="font-display font-bold">{done} / {total}</p>
          </div>
        </div>
      </div>

      {/* Journey */}
      <div className="relative">
        {/* Spine */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-muted -translate-x-1/2" />

        <div className="space-y-6">
          {path.map((p, i) => {
            const side = i % 2 === 0 ? "md:pr-1/2 md:text-right md:items-end" : "md:pl-1/2";
            const isDone = p.status === "done";
            const isCurrent = p.status === "current";
            const isLocked = p.status === "locked";

            return (
              <div key={p.title} className="relative pl-16 md:pl-0">
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-3">
                  <div className={cn(
                    "h-10 w-10 rounded-full grid place-items-center border-2 ring-4 ring-background relative",
                    isDone && "bg-accent border-accent text-accent-foreground",
                    isCurrent && "bg-gradient-primary border-primary text-primary-foreground animate-pulse-glow",
                    isLocked && "bg-muted border-border text-muted-foreground"
                  )}>
                    {isDone && <CheckCircle2 className="h-5 w-5" />}
                    {isCurrent && <Sparkles className="h-5 w-5" />}
                    {isLocked && <Lock className="h-4 w-4" />}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Card */}
                <div className={cn("md:grid md:grid-cols-2 md:gap-12", )}>
                  <div className={cn(i % 2 === 0 ? "md:col-start-1" : "md:col-start-2")}>
                    <div className={cn(
                      "glass-panel rounded-2xl p-5 transition-all",
                      isCurrent && "border-primary/50 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]",
                      isLocked && "opacity-60",
                      !isLocked && "hover:-translate-y-0.5"
                    )}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                        <span className="flex items-center gap-1 text-xs text-secondary font-mono whitespace-nowrap">
                          <Zap className="h-3.5 w-3.5" /> +{p.xp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                      {isCurrent && (
                        <>
                          <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-gradient-primary relative" style={{ width: `${p.progress}%` }}>
                              <div className="absolute inset-0 animate-shimmer" />
                            </div>
                          </div>
                          <Button variant="hero" size="sm" className="gap-1">Continue <ArrowRight className="h-3.5 w-3.5" /></Button>
                        </>
                      )}
                      {isDone && (
                        <span className="text-xs font-medium text-accent flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Mastered
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-xs text-muted-foreground">Unlocks after previous checkpoint</span>
                      )}
                    </div>
                  </div>
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
