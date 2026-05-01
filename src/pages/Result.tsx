import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Brain, CheckCircle2, Loader2, Puzzle, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const Result = () => {
  const location = useLocation();
  const total: number = location.state?.total ?? 78;
  const breakdown = location.state?.breakdown ?? { memory: 70, logic: 80, speed: 84 };
  const [processing, setProcessing] = useState(false);
  const qualified = total >= 70;

  if (processing) return <ProcessingView qualified={qualified} />;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
      </header>
      <div className="flex-1 px-5 py-10 lg:py-16 max-w-2xl w-full mx-auto">
        <div className="text-center animate-fade-up">
          <div className="inline-flex h-20 w-20 rounded-full bg-gradient-primary glow-primary grid place-items-center mb-6 animate-scale-in">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-2">// assessment complete</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-3">Nice work.</h1>
          <p className="text-muted-foreground">Here is how you did across the three challenges.</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 mt-10 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Overall score</p>
          <div className="font-display text-7xl font-bold text-gradient mb-1">{total}</div>
          <p className="text-sm text-muted-foreground">out of 100</p>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <Score icon={Brain} label="Memory" value={breakdown.memory} />
            <Score icon={Puzzle} label="Logic" value={breakdown.logic} />
            <Score icon={Timer} label="Speed" value={breakdown.speed} />
          </div>

          <div className={`mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${qualified ? "bg-accent/15 text-accent border border-accent/30" : "bg-warning/15 text-warning border border-warning/30"}`}>
            <Trophy className="h-4 w-4" />
            {qualified ? "Demo Access Unlocked" : "Under Review"}
          </div>
          <p className="text-xs text-muted-foreground mt-3 max-w-sm mx-auto">
            {qualified
              ? "You scored 70% or higher. For this demo, you can enter the user dashboard immediately."
              : "Your application and score will be reviewed by the Talent Nation team within 48 hours."}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button variant="hero" size="xl" className="gap-2" onClick={() => setProcessing(true)}>
            {qualified ? "Open user dashboard" : "Submit for admin verification"} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Score = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
  <div className="rounded-xl bg-muted border border-border p-4">
    <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
    <div className="font-display text-2xl font-bold">{value}</div>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
  </div>
);

const ProcessingView = ({ qualified }: { qualified: boolean }) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const stages = [
    "Analyzing your responses...",
    "Cross-checking school records...",
    "Verifying identity documents...",
    qualified ? "Opening the demo user dashboard..." : "Preparing your file for manual admin approval...",
  ];

  useEffect(() => {
    if (stage < stages.length - 1) {
      const t = setTimeout(() => setStage((s) => s + 1), 1100);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => navigate(qualified ? "/dashboard" : "/status?state=review"), 1400);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div className="min-h-screen grid place-items-center px-5">
      <div className="text-center max-w-md">
        <div className="relative h-32 w-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-spin" style={{ animationDuration: "1.6s" }} />
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-secondary border-l-primary animate-spin" style={{ animationDuration: "2.2s", animationDirection: "reverse" }} />
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
          </div>
        </div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">Sending to admin review</h1>
        <p className="text-muted-foreground text-sm mb-6">Your file is being prepared for manual verification.</p>
        <div className="space-y-2 text-left max-w-sm mx-auto">
          {stages.map((s, i) => (
            <div key={s} className={`flex items-center gap-3 text-sm transition-opacity ${i > stage ? "opacity-30" : "opacity-100"}`}>
              {i < stage ? (
                <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
              ) : i === stage ? (
                <Loader2 className="h-4 w-4 text-primary animate-spin flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-border flex-shrink-0" />
              )}
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
