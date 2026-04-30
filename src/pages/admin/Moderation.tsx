import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Ban, Flag, Eye, AlertTriangle, Check, X } from "lucide-react";

const flags = [
  { id: "F-238", user: "@kayode_w", reason: "Selfie mismatch with school ID", severity: "high", time: "12m ago" },
  { id: "F-237", user: "@ada_dev", reason: "Multiple accounts from same device", severity: "high", time: "1h ago" },
  { id: "F-236", user: "@chuks101", reason: "Plagiarized commits detected", severity: "medium", time: "3h ago" },
  { id: "F-235", user: "@ifey_t", reason: "Abusive language in community chat", severity: "medium", time: "5h ago" },
  { id: "F-234", user: "@bola_x", reason: "Suspicious assessment pattern", severity: "low", time: "1d ago" },
];

const blacklist = [
  { user: "@fake_dev_99", reason: "Identity fraud", date: "Apr 24, 2026" },
  { user: "@scriptkid", reason: "Repeated cheating", date: "Apr 19, 2026" },
  { user: "@spam_acc", reason: "Spam in community", date: "Apr 12, 2026" },
];

export default function AdminModeration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <ShieldAlert className="h-7 w-7 text-destructive" /> Moderation
        </h1>
        <p className="text-muted-foreground">Override system decisions, flag, and blacklist accounts.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel p-5"><Flag className="h-5 w-5 text-warning mb-3" /><div className="text-2xl font-display font-bold">37</div><div className="text-xs text-muted-foreground">Open flags</div></Card>
        <Card className="glass-panel p-5"><AlertTriangle className="h-5 w-5 text-destructive mb-3" /><div className="text-2xl font-display font-bold">12</div><div className="text-xs text-muted-foreground">Critical</div></Card>
        <Card className="glass-panel p-5"><Ban className="h-5 w-5 text-destructive mb-3" /><div className="text-2xl font-display font-bold">84</div><div className="text-xs text-muted-foreground">Blacklisted</div></Card>
        <Card className="glass-panel p-5"><Check className="h-5 w-5 text-accent mb-3" /><div className="text-2xl font-display font-bold">421</div><div className="text-xs text-muted-foreground">Resolved (30d)</div></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass-panel p-5 lg:col-span-2">
          <h2 className="font-display font-semibold text-lg mb-4">Active flags</h2>
          <div className="space-y-2">
            {flags.map((f) => (
              <div key={f.id} className="p-3 rounded-lg bg-muted/40 border border-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-muted-foreground">{f.id}</span>
                      <span className="font-medium text-sm">{f.user}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        f.severity === "high" ? "bg-destructive/15 text-destructive border border-destructive/30" :
                        f.severity === "medium" ? "bg-warning/15 text-warning border border-warning/30" :
                        "bg-muted text-muted-foreground border border-border"
                      }`}>{f.severity}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{f.reason}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{f.time}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-accent"><Check className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Ban className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-panel p-5">
          <h2 className="font-display font-semibold text-lg mb-4">Blacklist</h2>
          <div className="space-y-3">
            {blacklist.map((b) => (
              <div key={b.user} className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border">
                <div className="min-w-0">
                  <div className="font-medium text-sm">{b.user}</div>
                  <div className="text-[11px] text-muted-foreground">{b.reason} · {b.date}</div>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8"><X className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button variant="soft" className="w-full" size="sm">+ Add to blacklist</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
