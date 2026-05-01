import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, FileText, IdCard, Mail, Stamp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const docs = [
  { title: "CYS form", note: "Upload coming soon", icon: FileText, soon: true },
  { title: "SIWES logbook", note: "Upload signed/stamped pages when requested", icon: Stamp },
  { title: "Acceptance letter", note: "Upload official school/employer letter", icon: FileText },
  { title: "Student ID card", note: "Readable front image required", icon: IdCard },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [ack, setAck] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
      </header>

      <div className="flex-1 px-5 py-10 lg:py-14 max-w-4xl w-full mx-auto">
        <div className="mb-8 animate-fade-up">
          <p className="text-sm font-mono uppercase tracking-widest text-secondary mb-2">// onboarding documents</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Prepare your SIWES documents</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Check your mail for the address and instructions from the admin. Passed users will be told where to submit SIWES forms for physical signing and stamping by the campus supervisor.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:p-8 space-y-5">
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Check your email before submitting physical documents</p>
              <p className="text-sm text-muted-foreground mt-1">
                Admin will send the Code Zone address and supervisor instructions. Bring the physical SIWES form for signing/stamping when requested.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {docs.map((doc) => (
              <div key={doc.title} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                    <doc.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display font-semibold">{doc.title}</h2>
                      {doc.soon ? (
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-warning/15 text-warning border border-warning/30">COMING SOON</span>
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doc.note}</p>
                    <Button variant="soft" size="sm" disabled={doc.soon} className="mt-4 gap-2">
                      {doc.soon ? <Clock className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                      {doc.soon ? "Upload coming soon" : "Upload document"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <label className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border cursor-pointer hover:border-primary/40 transition-colors">
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-0.5 h-5 w-5 rounded accent-primary" />
            <span className="text-sm">
              I understand that physical SIWES forms must be signed/stamped by the assigned campus supervisor and submitted according to the admin email.
            </span>
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="hero" size="xl" onClick={() => navigate("/dashboard")} disabled={!ack} className="gap-2">
            Enter demo dashboard <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
