import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const skillsList = ["Python", "JavaScript", "TypeScript", "React", "Node.js", "Go", "SQL", "Docker", "Linux", "Git", "Tailwind", "FastAPI"];
const interestsList = [
  { id: "ai", label: "AI / LLMs" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data Engineering" },
  { id: "ml", label: "ML / MLOps" },
  { id: "frontend", label: "Frontend" },
  { id: "devops", label: "DevOps" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [bio, setBio] = useState("");

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
      </header>

      <div className="flex-1 px-5 py-10 lg:py-14 max-w-3xl w-full mx-auto">
        <div className="mb-8 animate-fade-up">
          <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-2">// onboarding</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Tell us who you are</h1>
          <p className="text-muted-foreground mt-2">A few details so we can match you to the right track and mentor.</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:p-8 space-y-7">
          <div>
            <Label className="text-sm mb-3 block">Skills you have</Label>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((s) => {
                const on = skills.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(skills, setSkills, s)}
                    className={cn(
                      "px-3.5 h-9 rounded-full text-sm font-medium border transition-all",
                      on ? "bg-gradient-primary text-primary-foreground border-transparent glow-primary" : "bg-muted text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="text-sm mb-3 block">What excites you most?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {interestsList.map((i) => {
                const on = interests.includes(i.id);
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => toggle(interests, setInterests, i.id)}
                    className={cn(
                      "h-12 rounded-xl text-sm font-medium border-2 transition-all",
                      on ? "bg-secondary/15 text-secondary border-secondary" : "bg-muted text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {i.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">GitHub username</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="adaeze-dev" className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Portfolio link <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://…" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Short bio</Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={240}
              placeholder="Final year CS at UNILAG. Love building AI tools that actually ship."
              className="w-full min-h-[100px] rounded-lg bg-input border border-border px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">{bio.length}/240</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="hero" size="xl" onClick={() => navigate("/dashboard")} className="gap-2">
            <Sparkles className="h-5 w-5" /> Enter the program <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
