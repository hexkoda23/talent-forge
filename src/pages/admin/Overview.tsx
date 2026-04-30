import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ClipboardCheck, ShieldAlert, Code2, TrendingUp, ArrowUpRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Applicants", value: "12,487", change: "+342 today", icon: Users, color: "text-primary" },
  { label: "Pending Review", value: "284", change: "Needs action", icon: ClipboardCheck, color: "text-warning" },
  { label: "Active Students", value: "1,920", change: "+18 this week", icon: TrendingUp, color: "text-accent" },
  { label: "Flagged Accounts", value: "37", change: "12 critical", icon: ShieldAlert, color: "text-destructive" },
];

const queue = [
  { name: "Adaeze Okafor", school: "UNILAG", score: 92, time: "2m ago", status: "auto-pass" },
  { name: "Tunde Bakare", school: "OAU", score: 87, time: "8m ago", status: "auto-pass" },
  { name: "Hauwa Ibrahim", school: "ABU Zaria", score: 71, time: "15m ago", status: "review" },
  { name: "Chinedu Eze", school: "UNN", score: 64, time: "21m ago", status: "review" },
  { name: "Fatima Bello", school: "BUK", score: 48, time: "33m ago", status: "review" },
];

const activity = [
  { icon: CheckCircle2, color: "text-accent", text: "23 applications auto-approved by AI scoring", time: "2 min ago" },
  { icon: AlertTriangle, color: "text-warning", text: "Suspicious selfie match flagged on app #A-9281", time: "12 min ago" },
  { icon: Code2, color: "text-primary", text: "1,204 commits pushed across student repos", time: "1 hr ago" },
  { icon: ShieldAlert, color: "text-destructive", text: "User @kayode_w blacklisted by mod team", time: "3 hr ago" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Mission Control</h1>
          <p className="text-muted-foreground">Real-time view of the Talent Nation platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="sm">Export report</Button>
          <Button variant="hero" size="sm" asChild><Link to="/admin/applications">Review queue</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 glass-panel">
            <div className="flex items-start justify-between mb-3">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-display font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            <div className="text-[11px] mt-2 font-mono text-muted-foreground">{s.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Live application queue</h2>
            <Link to="/admin/applications" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {queue.map((q) => (
              <div key={q.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border hover:border-primary/40 transition-colors">
                <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">
                  {q.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.school} • {q.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold">{q.score}</div>
                  <div className="text-[10px] text-muted-foreground">score</div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded ${
                  q.status === "auto-pass"
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "bg-warning/15 text-warning border border-warning/30"
                }`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-panel p-5">
          <h2 className="font-display font-semibold text-lg mb-4">System activity</h2>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`h-8 w-8 rounded-lg bg-muted border border-border grid place-items-center shrink-0 ${a.color}`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm leading-snug">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
