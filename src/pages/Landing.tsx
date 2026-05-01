import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Code2, GitBranch, Trophy, Sparkles, Cpu, Network, ShieldCheck, Gamepad2, Calendar, Users, ClipboardCheck, GraduationCap, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import heroImage from "@/assets/hero-ai.jpg";

const Landing = () => {
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Nav */}
      <header className="relative z-20 px-5 lg:px-10 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#program" className="hover:text-foreground transition-colors">Program</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#tracks" className="hover:text-foreground transition-colors">Tracks</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/assessment">
            <Button variant="hero" size="sm" className="gap-1.5">
              <Gamepad2 className="h-4 w-4" /> Play game
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-5 lg:px-10 pt-10 lg:pt-20 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Cohort 03 · 3 / 4 / 6-month tracks open
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Nigeria's <span className="text-gradient">AI Engineering</span> SIWES Program
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Train like a real engineer. Build production AI. Get paid SIWES experience that
              actually moves your career — gamified, mentored, and merit-based.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/assessment">
                <Button variant="hero" size="xl" className="gap-2">
                  <Gamepad2 className="h-5 w-5" /> Play game
                </Button>
              </Link>
              <Button variant="soft" size="xl" onClick={() => setLearnOpen(true)}>
                Learn more
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <Stat value="40+" label="Partner schools" />
              <Stat value="1,200+" label="Active students" />
              <Stat value="₦∞" label="Career impact" />
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-border glow-primary">
              <img
                src={heroImage}
                alt="AI neural network visualization"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                <FloatingTag icon={<Cpu className="h-3.5 w-3.5" />}>LLM Engineering</FloatingTag>
                <FloatingTag icon={<Network className="h-3.5 w-3.5" />}>MLOps</FloatingTag>
                <FloatingTag icon={<ShieldCheck className="h-3.5 w-3.5" />}>AI Safety</FloatingTag>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden sm:block animate-float">
              <div className="glass-panel rounded-2xl p-4 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs font-mono text-muted-foreground">live</span>
                </div>
                <p className="text-sm font-medium">237 students cleared Raid #04</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="program" className="relative z-10 px-5 lg:px-10 py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-3">// the program</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold">SIWES, but built like the future</h2>
          <p className="text-muted-foreground mt-4">
            Three tracks. One mission: turn Nigerian students into world-class AI engineers.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Pillar
            icon={Brain}
            title="Cognitive Assessment"
            text="Prove you have the wiring. Memory, logic, and speed reasoning — auto-graded by our system."
            tone="primary"
          />
          <Pillar
            icon={Trophy}
            title="Gamified Curriculum"
            text="Daily quests, weekly raids, weekly checkpoint exams. Level up like an RPG, ship like a senior engineer."
            tone="violet"
          />
          <Pillar
            icon={GitBranch}
            title="Built-in Workspace"
            text="A GitHub-style workspace with reviews, commits, and feedback baked in. Push your work."
            tone="accent"
          />
        </div>
      </section>

      {/* Duration tracks */}
      <section id="tracks" className="relative z-10 px-5 lg:px-10 py-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-3">// pick your duration</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold">3, 4 or 6 months</h2>
          <p className="text-muted-foreground mt-3">Match your SIWES window. Same intensity. Same standards.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <DurationCard months="3" label="Sprint" desc="Intensive, focused. For the already-strong who want to compress." />
          <DurationCard months="4" label="Standard" desc="The balanced path. Most students finish here with a portfolio." highlight />
          <DurationCard months="6" label="Deep dive" desc="Full immersion. More raids, more depth, more shipped projects." />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 px-5 lg:px-10 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-10 items-start">
          <div>
            <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-3">// how it works</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">From application to AI engineer</h2>
            <p className="text-muted-foreground mt-4">
              Every step is designed to filter for talent — and grow it. No shortcuts, no gatekeeping.
            </p>
          </div>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.title} className="glass-panel rounded-2xl p-5 flex gap-5 hover:border-primary/40 transition-colors">
                <div className="font-display text-3xl font-bold text-gradient w-10">0{i + 1}</div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 lg:px-10 py-20 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden glass-panel p-10 lg:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-aurora opacity-60" />
          <div className="relative">
            <Sparkles className="h-8 w-8 text-secondary mx-auto mb-5" />
            <h2 className="font-display text-3xl lg:text-5xl font-bold leading-tight">
              Ready to become an <br className="hidden sm:block" /><span className="text-gradient">AI Engineer</span>?
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
              Applications close in 14 days. Play the qualifying game and start your journey.
            </p>
            <div className="mt-8">
              <Link to="/assessment">
                <Button variant="hero" size="xl" className="gap-2">
                  <Gamepad2 className="h-5 w-5" /> Play game <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border px-5 lg:px-10 py-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <Logo size="sm" />
        <p>© {new Date().getFullYear()} Talent Nation. Built for Nigerian engineers.</p>
      </footer>

      {/* Learn more dialog */}
      <Dialog open={learnOpen} onOpenChange={setLearnOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto glass-panel">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl lg:text-3xl">How Talent Nation works — the full story</DialogTitle>
            <DialogDescription>
              An end-to-end walkthrough of the program, from your first click to your final certificate.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-2 text-sm leading-relaxed">
            <Section icon={Gamepad2} title="1. Qualify by playing">
              Talent Nation doesn't care about CVs. You qualify by playing three short cognitive games — memory grid,
              logic puzzle and speed reasoning. The system auto-grades your performance instantly. High scorers are
              auto-accepted. Borderline scores go to human review. Low scores can retry the next cohort.
            </Section>

            <Section icon={GraduationCap} title="2. Pick your SIWES duration">
              Choose <b>3 months</b> (sprint), <b>4 months</b> (standard) or <b>6 months</b> (deep dive). The track length
              adjusts the depth of raids and the number of checkpoint exams — the daily quest rhythm stays the same.
            </Section>

            <Section icon={Calendar} title="3. Daily Quests — timed, with deadlines">
              Every day you receive a quest. Each quest has a hard deadline (e.g. <b>due by 12:00 PM</b> the same day or
              <b> by 11:59 PM</b>, depending on difficulty). Submit on time → earn XP. Miss the deadline →
              <b> zero XP for that quest, no exceptions.</b> This builds the consistency real engineers need.
            </Section>

            <Section icon={Users} title="4. Weekly Raids — auto-grouped teams of 3">
              Every week, the system <b>randomly groups you with 2 other students</b> into a Raid team. Together you ship a
              real project (multi-agent bot, fine-tune, evaluator, etc.) within 7 days. New random team every week — you
              learn to collaborate with anyone, not just your friends.
            </Section>

            <Section icon={ClipboardCheck} title="5. Peer Audits — students grade students">
              After each quest, the system assigns you 2–3 of <b>other students' submissions</b> to audit and score. You
              earn audit XP for thorough, fair reviews. Submissions are double-checked against AI grading and human
              moderators — fake audits get flagged and penalized.
            </Section>

            <Section icon={Brain} title="6. Weekly Checkpoint Exams">
              Every week, each student is assigned a personalized <b>Checkpoint Exam</b> — a timed assessment covering
              that week's topics (embeddings, prompting, RAG, fine-tuning, agents, production AI). You must pass the
              checkpoint to unlock the next week's quests.
            </Section>

            <Section icon={Code2} title="7. Built-in Workspace">
              All your code lives in the Talent Nation Workspace — a GitHub-style environment with repos, commits, file
              explorer and inline review. Mentors and auditors can comment directly on your code.
            </Section>

            <Section icon={Trophy} title="8. Level up & graduate">
              XP from quests, raids and audits powers your level. Climb the leaderboard, earn badges, and at the end of
              your 3/4/6 months you graduate with a verifiable certificate, a public portfolio, and your SIWES letter
              signed off.
            </Section>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <Button variant="ghost" onClick={() => setLearnOpen(false)} className="gap-1.5">
              <X className="h-4 w-4" /> Close
            </Button>
            <Link to="/assessment" onClick={() => setLearnOpen(false)}>
              <Button variant="hero" className="gap-2">
                <Gamepad2 className="h-4 w-4" /> Play the game
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary grid place-items-center flex-shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-baseline gap-2">
    <span className="font-display text-2xl font-bold text-foreground">{value}</span>
    <span>{label}</span>
  </div>
);

const FloatingTag = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-border text-xs font-medium">
    {icon}
    {children}
  </span>
);

const DurationCard = ({ months, label, desc, highlight }: { months: string; label: string; desc: string; highlight?: boolean }) => (
  <div className={`glass-panel rounded-2xl p-6 transition-all hover:-translate-y-1 ${highlight ? "border-primary/60 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]" : "hover:border-primary/40"}`}>
    <div className="flex items-center gap-2 mb-3">
      <Clock className="h-4 w-4 text-secondary" />
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-baseline gap-2 mb-3">
      <span className="font-display text-5xl font-bold text-gradient">{months}</span>
      <span className="text-muted-foreground">months</span>
    </div>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>
);

const Pillar = ({
  icon: Icon,
  title,
  text,
  tone,
}: {
  icon: any;
  title: string;
  text: string;
  tone: "primary" | "violet" | "accent";
}) => {
  const tones = {
    primary: "bg-primary/15 text-primary",
    violet: "bg-secondary/15 text-secondary",
    accent: "bg-accent/15 text-accent",
  };
  return (
    <div className="glass-panel rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1 group">
      <div className={`h-12 w-12 rounded-xl grid place-items-center mb-5 ${tones[tone]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
    </div>
  );
};

const steps = [
  { title: "Play to qualify", text: "No CV needed. Three cognitive games — memory, logic, speed reasoning. The system grades you instantly." },
  { title: "Pick your track", text: "Choose 3, 4 or 6 months to match your SIWES window. Same standards, different depth." },
  { title: "Daily quests", text: "A new timed quest every day with a hard deadline. Miss it = no XP. Ship it = level up." },
  { title: "Weekly raids", text: "Auto-grouped into random teams of 3 every week. Ship a real project together in 7 days." },
  { title: "Peer audits & exams", text: "Audit other students' work for XP. Pass a weekly checkpoint exam to unlock the next level." },
  { title: "Graduate", text: "Earn your certificate, public portfolio, and signed SIWES letter. Walk out an AI engineer." },
];

export default Landing;
