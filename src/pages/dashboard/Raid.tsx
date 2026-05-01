import { AlertTriangle, ArrowRight, Clock, Flame, GitCommit, MessageSquare, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const members = [
  { initials: "AO", name: "Adaeze Okafor", role: "Router agent", contribution: 38, status: "ready", tone: "primary" },
  { initials: "TK", name: "Tunde Kazeem", role: "Researcher agent", contribution: 34, status: "ready" },
  { initials: "KE", name: "Kemi Eze", role: "Responder agent", contribution: 28, status: "needs sync" },
];

const logs = [
  "TK pushed evaluator fixtures and 17 passing tests",
  "AO merged router fallback and telemetry events",
  "KE uploaded Loom draft, missing deployment URL",
];

const Raid = () => (
  <div className="space-y-6 animate-fade-up">
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-destructive mb-2">// weekly raid</p>
      <h1 className="font-display text-2xl lg:text-4xl font-bold">Raid Command</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Your weekly team mission stands on its own: collaborate, ship, and survive the per-member validation interview.
      </p>
    </div>

    <div className="glass-panel rounded-2xl p-5 lg:p-6 border-destructive/30">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display text-xl lg:text-2xl font-semibold">Multi-agent customer support bot</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Build a 3-agent router, researcher, and responder that answers customer tickets from a docs corpus.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-destructive/15 text-destructive text-[11px] font-semibold border border-destructive/30 flex items-center gap-1.5">
          <Flame className="h-3 w-3" /> Live raid
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 lg:gap-3 mb-5">
        <Pill icon={Clock} label="Submit by" value="Sun 11:59 PM" tone="warning" />
        <Pill icon={Zap} label="Reward" value="+1200 XP" tone="primary" />
        <Pill icon={Users} label="Team" value="#07" tone="violet" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-mono uppercase text-muted-foreground mb-3">// team contribution map</p>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.name} className="rounded-lg bg-background/40 border border-border p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("h-9 w-9 rounded-full grid place-items-center text-xs font-semibold", m.tone === "primary" ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-foreground border border-border")}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                  <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded border", m.status === "ready" ? "bg-accent/15 text-accent border-accent/30" : "bg-warning/15 text-warning border-warning/30")}>
                    {m.status}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${m.contribution}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-mono uppercase text-muted-foreground mb-3">// validation checklist</p>
          <div className="space-y-2 text-sm">
            {["Working demo URL", "Repo with commits", "2-min walkthrough", "Per-member Q&A"].map((item) => (
              <label key={item} className="flex items-center gap-2 rounded-lg bg-background/40 border border-border p-2">
                <input type="checkbox" className="accent-primary" />
                {item}
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-5 grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <span className="text-warning font-semibold">Audit ahead:</span> admin validates every member separately. A weak interview can fail one member without failing the team.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          {logs.map((log) => (
            <p key={log} className="text-xs text-muted-foreground flex items-center gap-2 py-1">
              <GitCommit className="h-3.5 w-3.5 text-primary" /> {log}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <Button variant="hero" className="gap-2"><MessageSquare className="h-4 w-4" /> Open team channel</Button>
        <Button variant="soft" className="gap-2">Submit raid <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  </div>
);

const Pill = ({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "warning" | "primary" | "violet" }) => {
  const tones: Record<string, string> = {
    warning: "text-warning bg-warning/10 border-warning/30",
    primary: "text-primary bg-primary/10 border-primary/30",
    violet: "text-secondary bg-secondary/10 border-secondary/30",
  };
  return (
    <div className={cn("rounded-lg border p-3 flex items-center gap-2.5", tones[tone])}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      <div>
        <p className="text-[10px] uppercase font-mono opacity-80">{label}</p>
        <p className="text-sm font-semibold font-mono">{value}</p>
      </div>
    </div>
  );
};

export default Raid;
