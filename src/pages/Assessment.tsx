import { Link } from "react-router-dom";
import { Brain, Puzzle, Timer, Trophy, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const games = [
  { id: "memory", name: "Memory Grid", desc: "Repeat increasingly complex flashing patterns.", icon: Brain, time: "~3 min", color: "primary" },
  { id: "logic", name: "Logic Puzzle", desc: "Spot the pattern. Pick the next shape or number.", icon: Puzzle, time: "~5 min", color: "violet" },
  { id: "speed", name: "Speed Reasoning", desc: "Quickfire decisions. Don't let the clock win.", icon: Timer, time: "~2 min", color: "accent" },
];

const Assessment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Save & exit</Link>
      </header>

      <div className="flex-1 px-5 py-10 lg:py-16 max-w-5xl w-full mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-up">
          <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-3">// stage 02</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold">Cognitive Assessment</h1>
          <p className="text-muted-foreground mt-4">
            Three short games. We measure memory, logic, and speed reasoning. Score above 70%
            and you auto-qualify — borderline cases go to human review.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {games.map((g, i) => {
            const colors: Record<string, string> = {
              primary: "from-primary/30 to-primary/0 text-primary",
              violet: "from-secondary/30 to-secondary/0 text-secondary",
              accent: "from-accent/30 to-accent/0 text-accent",
            };
            return (
              <div key={g.id} className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-primary/40 transition-all">
                <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${colors[g.color]} opacity-50 blur-2xl`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`h-12 w-12 rounded-xl grid place-items-center bg-${g.color}/15 ${colors[g.color].split(" ").pop()}`}>
                      <g.icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">{g.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Timer className="h-3.5 w-3.5" />
                    {g.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:p-8 text-center">
          <Trophy className="h-10 w-10 text-warning mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Ready when you are</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            You'll play all three back-to-back. Find a quiet spot — you can't pause once it starts.
          </p>
          <Link to="/assessment/play">
            <Button variant="hero" size="xl" className="gap-2">
              Start assessment <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Your score is private and used only for selection.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
