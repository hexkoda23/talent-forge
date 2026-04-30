import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, GitCommit, Star, AlertTriangle, ExternalLink, Code2 } from "lucide-react";

const repos = [
  { student: "Adaeze Okafor", repo: "rag-pipeline-mvp", lang: "Python", commits: 42, lastCommit: "12m ago", quality: 94, flag: false },
  { student: "Tunde Bakare", repo: "vector-search-api", lang: "TypeScript", commits: 28, lastCommit: "1h ago", quality: 88, flag: false },
  { student: "Aisha Yusuf", repo: "llm-eval-harness", lang: "Python", commits: 64, lastCommit: "23m ago", quality: 91, flag: false },
  { student: "Chinedu Eze", repo: "agent-playground", lang: "Python", commits: 7, lastCommit: "3d ago", quality: 42, flag: true },
  { student: "Fatima Bello", repo: "fine-tune-toolkit", lang: "Python", commits: 31, lastCommit: "4h ago", quality: 79, flag: false },
];

const commits = [
  { hash: "8a2c91f", msg: "feat: add hybrid search with reranking", student: "Adaeze Okafor", time: "12m ago" },
  { hash: "ef33c10", msg: "fix: handle empty embedding edge case", student: "Aisha Yusuf", time: "23m ago" },
  { hash: "112bd9a", msg: "refactor: extract retriever interface", student: "Tunde Bakare", time: "1h ago" },
  { hash: "ab9281e", msg: "wip: trying gradient checkpointing", student: "Fatima Bello", time: "4h ago" },
];

export default function AdminCodeMonitor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Code Monitor</h1>
        <p className="text-muted-foreground">Track every repo, commit, and contribution across the program.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Code2} label="Total repos" value="1,847" tone="primary" />
        <MetricCard icon={GitCommit} label="Commits today" value="1,204" tone="accent" />
        <MetricCard icon={GitBranch} label="Active branches" value="312" tone="secondary" />
        <MetricCard icon={AlertTriangle} label="Quality flags" value="14" tone="destructive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass-panel p-5 lg:col-span-2">
          <h2 className="font-display font-semibold text-lg mb-4">Repositories</h2>
          <div className="space-y-2">
            {repos.map((r) => (
              <div key={r.repo} className="p-3 rounded-lg bg-muted/40 border border-border hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Code2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-mono text-sm font-semibold truncate">{r.student}/{r.repo}</span>
                      {r.flag && <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" />}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />{r.lang}</span>
                      <span><GitCommit className="h-3 w-3 inline mr-1" />{r.commits}</span>
                      <span>· {r.lastCommit}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`font-mono text-sm font-semibold ${r.quality >= 80 ? "text-accent" : r.quality >= 60 ? "text-warning" : "text-destructive"}`}>
                      {r.quality}
                    </div>
                    <div className="text-[10px] text-muted-foreground">quality</div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><ExternalLink className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-panel p-5">
          <h2 className="font-display font-semibold text-lg mb-4">Recent commits</h2>
          <div className="space-y-3">
            {commits.map((c) => (
              <div key={c.hash} className="border-l-2 border-primary/40 pl-3">
                <div className="font-mono text-[11px] text-primary">{c.hash}</div>
                <div className="text-sm leading-snug">{c.msg}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{c.student} · {c.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const MetricCard = ({ icon: Icon, label, value, tone }: any) => {
  const toneMap: Record<string, string> = {
    primary: "text-primary",
    accent: "text-accent",
    secondary: "text-secondary",
    destructive: "text-destructive",
  };
  return (
    <Card className="glass-panel p-5">
      <Icon className={`h-5 w-5 mb-3 ${toneMap[tone]}`} />
      <div className="text-2xl font-display font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </Card>
  );
};
