import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Filter, Download, ChevronDown } from "lucide-react";

const apps = [
  { id: "A-9301", name: "Adaeze Okafor", school: "UNILAG", course: "Computer Science", level: "400L", score: 92, status: "auto-pass", flag: false },
  { id: "A-9300", name: "Tunde Bakare", school: "OAU", course: "Software Eng.", level: "300L", score: 87, status: "auto-pass", flag: false },
  { id: "A-9299", name: "Hauwa Ibrahim", school: "ABU Zaria", course: "Information Tech.", level: "400L", score: 71, status: "review", flag: false },
  { id: "A-9298", name: "Chinedu Eze", school: "UNN", course: "Computer Eng.", level: "300L", score: 64, status: "review", flag: true },
  { id: "A-9297", name: "Fatima Bello", school: "BUK", course: "Cybersecurity", level: "400L", score: 48, status: "review", flag: false },
  { id: "A-9296", name: "Emeka Nwosu", school: "FUTA", course: "Software Eng.", level: "300L", score: 31, status: "auto-fail", flag: false },
  { id: "A-9295", name: "Aisha Yusuf", school: "UI", course: "Data Science", level: "400L", score: 89, status: "auto-pass", flag: false },
  { id: "A-9294", name: "Ifeoma Obi", school: "UNILAG", course: "Computer Science", level: "300L", score: 22, status: "auto-fail", flag: true },
];

export default function AdminApplications() {
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const filtered = apps.filter((a) => filter === "all" || a.status === filter);
  const allSelected = selected.length === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Applications</h1>
          <p className="text-muted-foreground">Review, approve, or reject student applications.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="sm"><Download className="h-4 w-4" /> Export</Button>
          <Button variant="soft" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { k: "all", l: "All", c: apps.length },
          { k: "auto-pass", l: "Auto-passed", c: apps.filter(a => a.status === "auto-pass").length },
          { k: "review", l: "Needs review", c: apps.filter(a => a.status === "review").length },
          { k: "auto-fail", l: "Auto-failed", c: apps.filter(a => a.status === "auto-fail").length },
        ].map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              filter === f.k
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {f.l} <span className="opacity-70 ml-1">({f.c})</span>
          </button>
        ))}
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <Card className="glass-panel p-3 flex items-center justify-between animate-fade-in">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="soft" className="text-accent"><Check className="h-4 w-4" /> Approve</Button>
            <Button size="sm" variant="soft" className="text-destructive"><X className="h-4 w-4" /> Reject</Button>
            <Button size="sm" variant="soft">Blacklist</Button>
          </div>
        </Card>
      )}

      <Card className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border">
              <tr className="text-left text-xs text-muted-foreground">
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => setSelected(allSelected ? [] : filtered.map((a) => a.id))}
                  />
                </th>
                <th className="p-3">Applicant</th>
                <th className="p-3 hidden md:table-cell">School</th>
                <th className="p-3 hidden lg:table-cell">Course</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggle(a.id)} />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">
                        {a.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {a.name}
                          {a.flag && <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive border border-destructive/30">FLAG</span>}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">{a.id} • {a.level}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{a.school}</td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground">{a.course}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="font-mono font-semibold">{a.score}</div>
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${a.score >= 70 ? "bg-accent" : a.score >= 50 ? "bg-warning" : "bg-destructive"}`}
                          style={{ width: `${a.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded ${
                      a.status === "auto-pass" ? "bg-accent/15 text-accent border border-accent/30" :
                      a.status === "review" ? "bg-warning/15 text-warning border border-warning/30" :
                      "bg-destructive/15 text-destructive border border-destructive/30"
                    }`}>{a.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-accent"><Check className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><X className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {apps.length} applications</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">Prev</Button>
            <span className="font-mono">1 / 24</span>
            <Button size="sm" variant="ghost">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
