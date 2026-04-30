import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Puzzle, Timer, ArrowRight, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

type GameKey = "memory" | "logic" | "speed";

const GamePlay = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<GameKey>("memory");
  const [scores, setScores] = useState<Record<GameKey, number>>({ memory: 0, logic: 0, speed: 0 });

  const order: GameKey[] = ["memory", "logic", "speed"];
  const idx = order.indexOf(active);
  const overall = Math.round(((idx) / 3) * 100);

  const onComplete = (key: GameKey, score: number) => {
    setScores((s) => ({ ...s, [key]: score }));
    if (key === "memory") setActive("logic");
    else if (key === "logic") setActive("speed");
    else {
      const total = Math.round((scores.memory + scores.logic + score) / 3);
      navigate("/assessment/result", { state: { total, breakdown: { ...scores, speed: score } } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-4 flex items-center justify-between border-b border-border">
        <Logo size="sm" />
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            Game {idx + 1} of 3
          </div>
          <div className="w-32 sm:w-48 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary transition-all" style={{ width: `${overall + 33}%` }} />
          </div>
          <button onClick={() => navigate("/")} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 px-5 py-8 lg:py-12 max-w-3xl w-full mx-auto">
        {active === "memory" && <MemoryGrid onComplete={(s) => onComplete("memory", s)} />}
        {active === "logic" && <LogicPuzzle onComplete={(s) => onComplete("logic", s)} />}
        {active === "speed" && <SpeedReasoning onComplete={(s) => onComplete("speed", s)} />}
      </div>
    </div>
  );
};

/* ---------------- Memory Grid ---------------- */
const MemoryGrid = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const [round, setRound] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [showing, setShowing] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "show" | "input" | "wrong">("idle");
  const [userInput, setUserInput] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const startRound = () => {
    const len = 2 + round;
    const seq = Array.from({ length: len }, () => Math.floor(Math.random() * 9));
    setSequence(seq);
    setUserInput([]);
    setPhase("show");
    seq.forEach((cell, i) => {
      setTimeout(() => setShowing(cell), i * 600);
      setTimeout(() => setShowing(null), i * 600 + 350);
    });
    setTimeout(() => setPhase("input"), seq.length * 600 + 200);
  };

  useEffect(() => { startRound(); /* eslint-disable-next-line */ }, [round]);

  const tap = (i: number) => {
    if (phase !== "input") return;
    const next = [...userInput, i];
    setUserInput(next);
    if (sequence[next.length - 1] !== i) {
      setPhase("wrong");
      setTimeout(() => onComplete(score), 800);
      return;
    }
    if (next.length === sequence.length) {
      const newScore = score + round * 10;
      setScore(newScore);
      if (round >= 5) onComplete(newScore + 20);
      else setTimeout(() => setRound((r) => r + 1), 600);
    }
  };

  return (
    <div className="animate-fade-up">
      <GameHeader icon={Brain} title="Memory Grid" subtitle={`Round ${round} · ${phase === "show" ? "Watch closely…" : phase === "input" ? "Repeat the sequence" : phase === "wrong" ? "Sequence broken" : ""}`} score={score} />
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            disabled={phase !== "input"}
            className={cn(
              "aspect-square rounded-2xl border-2 border-border bg-muted transition-all duration-150",
              showing === i && "bg-gradient-primary border-primary scale-95 glow-primary",
              phase === "input" && "hover:border-primary/60 hover:bg-muted/70",
              phase === "wrong" && "border-destructive/40"
            )}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
        Difficulty: {Array.from({ length: round }).map(() => "▮").join(" ")}
      </p>
    </div>
  );
};

/* ---------------- Logic Puzzle ---------------- */
const puzzles = [
  { q: ["2", "4", "8", "16", "?"], a: "32", choices: ["24", "32", "20", "64"] },
  { q: ["A", "C", "E", "G", "?"], a: "I", choices: ["H", "I", "J", "K"] },
  { q: ["▲", "■", "▲", "■", "?"], a: "▲", choices: ["■", "●", "▲", "◆"] },
  { q: ["1", "1", "2", "3", "5", "?"], a: "8", choices: ["6", "7", "8", "9"] },
];

const LogicPuzzle = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const current = puzzles[i];

  const choose = (c: string) => {
    if (picked) return;
    setPicked(c);
    const right = c === current.a;
    if (right) setScore((s) => s + 25);
    setTimeout(() => {
      if (i + 1 >= puzzles.length) onComplete(score + (right ? 25 : 0));
      else { setI((x) => x + 1); setPicked(null); }
    }, 700);
  };

  return (
    <div className="animate-fade-up">
      <GameHeader icon={Puzzle} title="Logic Puzzle" subtitle={`Question ${i + 1} of ${puzzles.length}`} score={score} />
      <div className="glass-panel rounded-2xl p-8 mt-8">
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          {current.q.map((v, idx) => (
            <div key={idx} className={cn(
              "h-16 w-16 rounded-xl grid place-items-center font-display text-2xl font-bold",
              v === "?" ? "bg-gradient-primary text-primary-foreground glow-primary" : "bg-muted border border-border"
            )}>
              {v}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {current.choices.map((c) => {
            const isPicked = picked === c;
            const isRight = picked && c === current.a;
            const isWrong = picked === c && c !== current.a;
            return (
              <button
                key={c}
                onClick={() => choose(c)}
                disabled={!!picked}
                className={cn(
                  "h-14 rounded-xl border-2 font-display text-xl font-bold transition-all",
                  !picked && "border-border bg-muted hover:border-primary hover:bg-muted/70",
                  isRight && "border-accent bg-accent/15 text-accent",
                  isWrong && "border-destructive bg-destructive/15 text-destructive",
                  picked && !isPicked && "opacity-40"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Speed Reasoning ---------------- */
const speedQs = [
  { q: "Which is heavier?", choices: ["1kg of feathers", "1kg of iron", "Same", "Depends"], a: 2 },
  { q: "Pick the odd one out", choices: ["Cat", "Dog", "Banana", "Lion"], a: 2 },
  { q: "5 + 3 × 2 = ?", choices: ["16", "11", "13", "10"], a: 1 },
  { q: "Opposite of 'expand'?", choices: ["Grow", "Stretch", "Shrink", "Build"], a: 2 },
  { q: "If A>B and B>C, then…", choices: ["C>A", "A>C", "A=C", "Unknown"], a: 1 },
];

const SpeedReasoning = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(8);

  const current = speedQs[i];

  useEffect(() => {
    if (time <= 0) {
      next(false);
      return;
    }
    const t = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  const next = (right: boolean) => {
    const newScore = score + (right ? 20 : 0);
    setScore(newScore);
    if (i + 1 >= speedQs.length) onComplete(newScore);
    else { setI((x) => x + 1); setTime(8); }
  };

  const pct = (time / 8) * 100;

  return (
    <div className="animate-fade-up">
      <GameHeader icon={Timer} title="Speed Reasoning" subtitle={`${i + 1} of ${speedQs.length} · think fast`} score={score} />
      <div className="glass-panel rounded-2xl p-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Time left</span>
          <span className={cn("font-mono text-2xl font-bold tabular-nums", time <= 3 ? "text-destructive" : "text-foreground")}>{time}s</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-8">
          <div className={cn("h-full transition-all duration-1000 linear", time <= 3 ? "bg-destructive" : "bg-gradient-primary")} style={{ width: `${pct}%` }} />
        </div>
        <h3 className="font-display text-2xl font-bold mb-6 text-center">{current.q}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {current.choices.map((c, idx) => (
            <button
              key={c}
              onClick={() => next(idx === current.a)}
              className="h-14 rounded-xl border-2 border-border bg-muted text-left px-5 font-medium hover:border-primary hover:bg-muted/70 transition-all"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GameHeader = ({ icon: Icon, title, subtitle, score }: { icon: any; title: string; subtitle: string; score: number }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl grid place-items-center bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-muted border border-border">
      <Trophy className="h-4 w-4 text-warning" />
      <span className="font-mono text-sm font-semibold">{score}</span>
    </div>
  </div>
);

export default GamePlay;
