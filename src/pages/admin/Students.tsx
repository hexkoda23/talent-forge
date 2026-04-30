import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Mail, MoreVertical, Trophy, Code2 } from "lucide-react";

const students = [
  { name: "Adaeze Okafor", school: "UNILAG", level: 14, xp: 8420, commits: 142, streak: 21, status: "active" },
  { name: "Tunde Bakare", school: "OAU", level: 12, xp: 6890, commits: 98, streak: 14, status: "active" },
  { name: "Hauwa Ibrahim", school: "ABU Zaria", level: 9, xp: 4210, commits: 64, streak: 7, status: "active" },
  { name: "Chinedu Eze", school: "UNN", level: 7, xp: 2980, commits: 41, streak: 0, status: "idle" },
  { name: "Fatima Bello", school: "BUK", level: 11, xp: 5640, commits: 87, streak: 18, status: "active" },
  { name: "Aisha Yusuf", school: "UI", level: 13, xp: 7320, commits: 119, streak: 24, status: "active" },
];

export default function AdminStudents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Students</h1>
          <p className="text-muted-foreground">1,920 active accounts across 47 institutions.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, school, ID…"
            className="w-full h-10 rounded-lg bg-muted border border-border pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((s) => (
          <Card key={s.name} className="glass-panel p-5 hover:border-primary/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-primary grid place-items-center text-sm font-semibold text-primary-foreground">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold leading-tight">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.school}</div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                s.status === "active" ? "bg-accent/15 text-accent border border-accent/30" : "bg-muted text-muted-foreground border border-border"
              }`}>
                ● {s.status}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
                LVL {s.level}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <Stat icon={Trophy} label="XP" value={s.xp.toLocaleString()} />
              <Stat icon={Code2} label="Commits" value={s.commits} />
              <Stat icon={Trophy} label="Streak" value={`${s.streak}d`} />
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="soft" className="flex-1">View profile</Button>
              <Button size="sm" variant="ghost"><Mail className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: any }) => (
  <div className="rounded-lg bg-muted/40 border border-border p-2 text-center">
    <Icon className="h-3 w-3 mx-auto mb-1 text-muted-foreground" />
    <div className="font-mono text-sm font-semibold">{value}</div>
    <div className="text-[10px] text-muted-foreground">{label}</div>
  </div>
);
