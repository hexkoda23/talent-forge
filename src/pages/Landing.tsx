import { Link } from "react-router-dom";
import { ArrowRight, Brain, Code2, GitBranch, Trophy, Sparkles, Cpu, Network, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import heroImage from "@/assets/hero-ai.jpg";

const Landing = () => {
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
          <Link to="/login" className="hidden sm:inline-block">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button variant="hero" size="sm">Apply now</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-5 lg:px-10 pt-10 lg:pt-20 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Cohort 03 · Applications open
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Nigeria's <span className="text-gradient">AI Engineering</span> SIWES Program
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Train like a real engineer. Build production AI. Get paid SIWES experience that
              actually moves your career — gamified, mentored, and merit-based.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/register">
                <Button variant="hero" size="xl">
                  Apply Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#program">
                <Button variant="soft" size="xl">Learn more</Button>
              </a>
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
            text="Checkpoints, Quests, and Raids. Level up like an RPG, ship like a senior engineer."
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
              Applications close in 14 days. Start your verification and cognitive assessment now.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button variant="hero" size="xl">Start your application <ArrowRight className="h-5 w-5" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border px-5 lg:px-10 py-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <Logo size="sm" />
        <p>© {new Date().getFullYear()} Talent Nation. Built for Nigerian engineers.</p>
      </footer>
    </div>
  );
};

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
  { title: "Apply & verify", text: "Submit your basics, school ID, NIN, and a quick selfie. We confirm you're a real SIWES student." },
  { title: "Pre-qualify with games", text: "Three short cognitive challenges — memory, logic, and speed reasoning." },
  { title: "Get accepted", text: "High scores auto-qualify. Borderline cases go to human review by our team." },
  { title: "Onboard & level up", text: "Tell us your skills and interests. Get matched to your personalized track." },
  { title: "Ship & graduate", text: "Complete checkpoints, quests, and raids. Push real code. Earn your certificate." },
];

export default Landing;
