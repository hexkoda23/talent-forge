import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Brain, CheckCircle2, Grid3X3, Loader2, Mail, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { getCompletedAttempts, MAX_GAME_ATTEMPTS, PASS_MARK, setCompletedAttempts } from "@/lib/gameSettings";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const total: number = location.state?.total ?? 82;
  const breakdown = location.state?.breakdown ?? { memory: 76, zzle: 88 };
  const [processing, setProcessing] = useState(false);
  const qualified = total >= PASS_MARK;
  const attemptsUsed = Math.min(MAX_GAME_ATTEMPTS, Number(location.state?.attemptNumber) || getCompletedAttempts() + 1);
  const attemptsRemaining = Math.max(0, MAX_GAME_ATTEMPTS - attemptsUsed);

  useEffect(() => {
    setCompletedAttempts(attemptsUsed);
  }, [attemptsUsed]);

  if (processing) return <ProcessingView qualified={qualified} />;

  return (
    <div className="min-h-screen flex flex-col bg-background font-mono">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
      </header>
      <main className="flex-1 px-5 py-10 lg:py-16 max-w-3xl w-full mx-auto">
        <div className="animate-fade-up">
          <p className="text-sm text-primary mb-3">// assessment complete</p>
          <h1 className="text-5xl lg:text-7xl leading-none mb-4">Game result</h1>
          <p className="text-muted-foreground">Here is how you did across Memory and Zzle.</p>
        </div>

        <section className="glass-panel p-8 mt-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Overall score</p>
          <div className="text-7xl text-foreground mb-1">{total}</div>
          <p className="text-sm text-muted-foreground">out of 100</p>

          <div className="grid sm:grid-cols-2 gap-3 mt-8">
            <Score icon={Brain} label="Memory" value={breakdown.memory} />
            <Score icon={Grid3X3} label="Zzle" value={breakdown.zzle} />
          </div>

          <div className={`mt-8 inline-flex items-center gap-2 px-4 py-2 border text-sm ${qualified ? "bg-primary/10 text-primary border-primary/40" : "bg-warning/10 text-warning border-warning/40"}`}>
            <Trophy className="h-4 w-4" />
            {qualified ? "Congratulations, You Passed" : attemptsRemaining > 0 ? "Try Again" : "Failed"}
          </div>
          <p className="text-xs text-muted-foreground mt-3 max-w-sm">
            {qualified
              ? "Congratulations, you passed both games and reached the cut off. Your application is pending admin approval. Await mail from admin."
              : attemptsRemaining > 0
                ? `You did not reach the auto pass cut off yet. Try again now. ${attemptsRemaining} trial${attemptsRemaining === 1 ? "" : "s"} remaining.`
                : "You failed to reach the cut off after three trials."}
          </p>
        </section>

        <div className="mt-8">
          {qualified ? (
            <Button variant="hero" size="xl" className="gap-2" onClick={() => setProcessing(true)}>
              Submit for admin confirmation <ArrowRight className="h-5 w-5" />
            </Button>
          ) : attemptsRemaining > 0 ? (
            <Button variant="hero" size="xl" className="gap-2" onClick={() => navigate("/assessment/play")}>
              Try again - {attemptsRemaining} trial{attemptsRemaining === 1 ? "" : "s"} remaining <ArrowRight className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="hero" size="xl" className="gap-2" onClick={() => navigate("/status?state=failed")}>
              View failed status <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

const Score = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
  <div className="bg-muted border border-border p-4">
    <Icon className="h-4 w-4 text-muted-foreground mb-2" />
    <div className="text-3xl">{value}</div>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
  </div>
);

const ProcessingView = ({ qualified }: { qualified: boolean }) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const stages = [
    "Analyzing your Memory path...",
    "Checking Zzle board integrity...",
    "Attaching score to identity file...",
    qualified ? "Sending pass status to admin..." : "Preparing your file for manual admin follow-up...",
  ];

  useEffect(() => {
    if (stage < stages.length - 1) {
      const timer = window.setTimeout(() => setStage((value) => value + 1), 800);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => navigate("/status?state=review"), 1000);
    return () => window.clearTimeout(timer);
  }, [navigate, qualified, stage, stages.length]);

  return (
    <div className="min-h-screen grid place-items-center px-5 bg-background font-mono">
      <div className="max-w-md w-full">
        <div className="mb-8 h-px bg-border">
          <div className="h-px w-1/2 bg-primary" />
        </div>
        <h1 className="text-3xl mb-2">Sending to admin review</h1>
        <p className="text-muted-foreground text-sm mb-6">Your file is being prepared for manual verification.</p>
        <div className="space-y-2">
          {stages.map((item, index) => (
            <div key={item} className={`flex items-center gap-3 text-sm transition-opacity ${index > stage ? "opacity-30" : "opacity-100"}`}>
              {index < stage ? (
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              ) : index === stage ? (
                <Loader2 className="h-4 w-4 text-primary animate-spin flex-shrink-0" />
              ) : (
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
