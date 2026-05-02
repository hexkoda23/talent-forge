import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Code2, Gamepad2, GraduationCap, ShieldCheck, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Landing = () => {
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background font-mono">
      <header className="relative z-20 px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#program" className="hover:text-foreground transition-colors">Program</a>
          <a href="#how" className="hover:text-foreground transition-colors">Trail</a>
          <a href="#tracks" className="hover:text-foreground transition-colors">Tracks</a>
        </nav>
        <Link to="/register">
          <Button variant="hero" size="sm" className="gap-1.5">
            <Gamepad2 className="h-4 w-4" /> Register for game
          </Button>
        </Link>
      </header>

      <main className="relative z-10 px-5 lg:px-10 py-14 lg:py-24 max-w-7xl mx-auto">
        <section className="min-h-[68vh] grid content-center">
          <p className="text-sm text-primary mb-8">01 - Online Cognitive Games</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[1.08] max-w-6xl">
            Talent Nation<br />AI Engineering SIWES
          </h1>
          <p className="mt-8 text-base lg:text-lg text-foreground max-w-3xl leading-8">
            Register first. Wait for the shared assessment window. Then complete a private
            screening session before admin verification and cohort placement.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/register">
              <Button variant="hero" size="xl" className="gap-2">
                <Gamepad2 className="h-5 w-5" /> Register for game
              </Button>
            </Link>
            <Button variant="soft" size="xl" onClick={() => setLearnOpen(true)}>
              Learn more
            </Button>
          </div>
        </section>

        <section id="program" className="py-16 border-t border-border">
          <div className="grid lg:grid-cols-[0.7fr,1.3fr] gap-10">
            <div>
              <p className="text-sm text-primary mb-3">// program</p>
              <h2 className="text-4xl lg:text-5xl leading-tight">Built for serious selection</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Panel icon={ShieldCheck} title="Private screening" text="Applicants complete a timed assessment only after registration opens." />
              <Panel icon={GraduationCap} title="Cohort placement" text="Qualified students are matched to their SIWES duration and learning track." />
              <Panel icon={Code2} title="Project readiness" text="The program filters for students ready to build, review, and ship real work." />
            </div>
          </div>
        </section>

        <section id="tracks" className="py-16 border-t border-border">
          <p className="text-sm text-primary mb-8">// choose your campus track</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Track months="3" label="Sprint" />
            <Track months="4" label="Standard" />
            <Track months="6" label="Deep dive" />
          </div>
        </section>

        <section id="how" className="py-16 border-t border-border">
          <div className="relative pl-10">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            <div className="absolute left-0 top-2 h-5 w-5 rounded-full border-2 border-primary bg-background" />
            <h2 className="text-4xl lg:text-5xl mb-10">From registration to dashboard</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.title} className="grid md:grid-cols-[120px,1fr] gap-4 border-b border-border pb-8">
                  <span className="text-3xl text-muted-foreground">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-3xl">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border">
          <div className="grid lg:grid-cols-[1fr,auto] gap-6 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl">Ready to enter the trail?</h2>
              <p className="text-muted-foreground mt-4 max-w-xl">
                Applications close in 14 days. Register for the qualifying game and start your journey.
              </p>
            </div>
            <Link to="/register">
              <Button variant="hero" size="xl" className="gap-2">
                <Gamepad2 className="h-5 w-5" /> Register for game <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border px-5 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <Logo size="sm" />
        <p>(c) {new Date().getFullYear()} Talent Nation. Built for Nigerian engineers.</p>
      </footer>

      <Dialog open={learnOpen} onOpenChange={setLearnOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto glass-panel">
          <DialogHeader>
            <DialogTitle className="text-2xl lg:text-3xl">How Talent Nation works</DialogTitle>
            <DialogDescription>
              A compact walkthrough of the demo flow and the real platform journey.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-2 text-sm leading-relaxed">
            <Section icon={Gamepad2} title="1. Register for game day">
              Every applicant registers first. The live platform can hold everyone on a countdown page
              until the official start time.
            </Section>
            <Section icon={ShieldCheck} title="2. Complete the private assessment">
              The assessment is timed and confidential. Applicants only see the details when the official window opens.
            </Section>
            <Section icon={Calendar} title="3. Pick your SIWES duration">
              Choose 3, 4, or 6 months to match your school window.
            </Section>
            <Section icon={Code2} title="4. Build in the workspace">
              Accepted students use a GitHub-style workspace with quests, raids, audits, and checkpoints.
            </Section>
            <Section icon={Users} title="5. Graduate with evidence">
              Students leave with certificates, portfolio work, and SIWES documentation.
            </Section>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <Button variant="ghost" onClick={() => setLearnOpen(false)} className="gap-1.5">
              <X className="h-4 w-4" /> Close
            </Button>
            <Link to="/register" onClick={() => setLearnOpen(false)}>
              <Button variant="hero" className="gap-2">
                <Gamepad2 className="h-4 w-4" /> Register for game
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Panel = ({ icon: Icon, title, text }: { icon: any; title: string; text: string }) => (
  <div className="glass-panel p-5">
    <Icon className="h-6 w-6 text-primary mb-5" />
    <h3 className="text-xl mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-6">{text}</p>
  </div>
);

const Track = ({ months, label }: { months: string; label: string }) => (
  <div className="glass-panel p-6 min-h-48 flex flex-col justify-between">
    <p className="text-muted-foreground">Campus</p>
    <div>
      <div className="h-px bg-border mb-5" />
      <p className="text-secondary text-2xl">{months} months</p>
      <p className="text-muted-foreground mt-2">{label}</p>
    </div>
  </div>
);

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="h-10 w-10 bg-muted border border-border text-primary grid place-items-center flex-shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="text-lg mb-1">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </div>
);

const steps = [
  { title: "Register for game day", text: "No CV needed. Register first, then wait for the shared game window to open for every applicant." },
  { title: "Complete private assessment", text: "Applicants are tested inside a timed assessment window without public hints on the landing page." },
  { title: "Admin verification", text: "Game qualification is attached to identity, NIN, school, and document checks before admission." },
  { title: "Start the program", text: "Accepted students enter the dashboard for quests, raids, audits, checkpoints, and workspace tasks." },
];

export default Landing;
