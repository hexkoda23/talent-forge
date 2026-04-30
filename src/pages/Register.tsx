import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Upload, Camera, IdCard, GraduationCap, User as UserIcon, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Basic info", icon: UserIcon },
  { id: 2, title: "Academic", icon: GraduationCap },
  { id: 3, title: "Verification", icon: IdCard },
  { id: 4, title: "Review", icon: ShieldCheck },
];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    school: "",
    matric: "",
    course: "",
    duration: "6 months",
    schoolId: null as File | null,
    nin: "",
    selfieTaken: false,
    confirm: false,
  });

  const update = (k: keyof typeof data, v: any) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setSubmitting(true);
    setTimeout(() => navigate("/assessment"), 900);
  };

  const progress = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Cancel</Link>
      </header>

      <div className="flex-1 px-5 py-8 lg:py-12 max-w-3xl w-full mx-auto">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-mono text-muted-foreground">Step {step} of 4</p>
            <p className="text-sm text-muted-foreground">{Math.round(progress + 25)}% complete</p>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${((step) / 4) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const isDone = step > s.id;
              const isCurrent = step === s.id;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full grid place-items-center border-2 transition-all",
                      isDone && "bg-accent border-accent text-accent-foreground",
                      isCurrent && "border-primary bg-primary/10 text-primary glow-primary",
                      !isDone && !isCurrent && "border-border text-muted-foreground"
                    )}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={cn("text-xs font-medium hidden sm:block", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:p-8 animate-fade-up" key={step}>
          {step === 1 && (
            <div className="space-y-5">
              <Header title="Let's start with the basics" subtitle="Your account, your identity. Make sure it matches your school records." />
              <Field label="Full name">
                <Input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Adaeze Okonkwo" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email">
                  <Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@school.edu.ng" />
                </Field>
                <Field label="Phone number">
                  <Input value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234 …" />
                </Field>
              </div>
              <Field label="Password">
                <Input type="password" value={data.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 8 characters" />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Header title="Academic information" subtitle="Tell us where you study and what you study." />
              <Field label="School name">
                <Input value={data.school} onChange={(e) => update("school", e.target.value)} placeholder="University of Lagos" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Matric number">
                  <Input value={data.matric} onChange={(e) => update("matric", e.target.value)} placeholder="190401024" />
                </Field>
                <Field label="Course of study">
                  <Input value={data.course} onChange={(e) => update("course", e.target.value)} placeholder="Computer Science" />
                </Field>
              </div>
              <Field label="SIWES duration">
                <div className="grid grid-cols-3 gap-2">
                  {["3 months", "6 months", "12 months"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => update("duration", d)}
                      className={cn(
                        "h-11 rounded-lg border text-sm font-medium transition-all",
                        data.duration === d
                          ? "bg-primary/15 border-primary text-foreground"
                          : "bg-muted border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Header title="Identity verification" subtitle="We need to confirm you're a real SIWES student. This is reviewed manually if anything looks off." />

              <Field label="School ID card (image)">
                <UploadZone
                  file={data.schoolId}
                  onChange={(f) => update("schoolId", f)}
                  hint="JPG or PNG · max 5MB"
                  icon={<Upload className="h-5 w-5" />}
                />
              </Field>

              <Field label="NIN (National Identification Number)">
                <Input value={data.nin} onChange={(e) => update("nin", e.target.value)} placeholder="11-digit NIN" maxLength={11} />
              </Field>

              <Field label="Selfie verification">
                <SelfieCapture taken={data.selfieTaken} onCapture={() => update("selfieTaken", true)} />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <Header title="Review your application" subtitle="Double-check everything below. Once submitted, you'll move on to the cognitive assessment." />
              <div className="space-y-3">
                <ReviewBlock title="Basic" rows={[
                  ["Full name", data.fullName || "—"],
                  ["Email", data.email || "—"],
                  ["Phone", data.phone || "—"],
                ]} />
                <ReviewBlock title="Academic" rows={[
                  ["School", data.school || "—"],
                  ["Matric no.", data.matric || "—"],
                  ["Course", data.course || "—"],
                  ["Duration", data.duration],
                ]} />
                <ReviewBlock title="Verification" rows={[
                  ["School ID", data.schoolId ? "Uploaded ✓" : "—"],
                  ["NIN", data.nin ? `${data.nin.slice(0, 3)}•••••${data.nin.slice(-2)}` : "—"],
                  ["Selfie", data.selfieTaken ? "Captured ✓" : "—"],
                ]} />
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl bg-muted border border-border cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={data.confirm}
                  onChange={(e) => update("confirm", e.target.checked)}
                  className="mt-0.5 h-5 w-5 rounded accent-primary"
                />
                <span className="text-sm">
                  I confirm that I am a registered SIWES student and the information above is accurate. I understand
                  that false information will result in disqualification.
                </span>
              </label>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={prev}
              disabled={step === 1 || submitting}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {step < 4 ? (
              <Button variant="hero" onClick={next} className="gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="hero" size="lg" onClick={submit} disabled={!data.confirm || submitting} className="gap-2">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit application <ArrowRight className="h-4 w-4" /></>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-2">
    <h1 className="font-display text-2xl lg:text-3xl font-bold">{title}</h1>
    <p className="text-muted-foreground text-sm mt-1.5">{subtitle}</p>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm">{label}</Label>
    {children}
  </div>
);

const UploadZone = ({
  file,
  onChange,
  hint,
  icon,
}: {
  file: File | null;
  onChange: (f: File) => void;
  hint: string;
  icon: React.ReactNode;
}) => (
  <label className="flex flex-col items-center justify-center gap-2 h-36 rounded-xl border-2 border-dashed border-border bg-muted/40 cursor-pointer hover:border-primary/60 hover:bg-muted/70 transition-all">
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
    />
    {file ? (
      <>
        <Check className="h-6 w-6 text-accent" />
        <p className="text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">Click to replace</p>
      </>
    ) : (
      <>
        <div className="h-10 w-10 rounded-full bg-primary/10 grid place-items-center text-primary">{icon}</div>
        <p className="text-sm font-medium">Click to upload</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </>
    )}
  </label>
);

const SelfieCapture = ({ taken, onCapture }: { taken: boolean; onCapture: () => void }) => (
  <div className="rounded-xl border border-border bg-muted/40 p-5 flex flex-col items-center gap-4">
    <div className="relative h-40 w-40 rounded-full grid place-items-center bg-background border-2 border-dashed border-border overflow-hidden">
      {taken ? (
        <div className="h-full w-full bg-gradient-primary grid place-items-center">
          <Check className="h-12 w-12 text-primary-foreground" />
        </div>
      ) : (
        <>
          <Camera className="h-10 w-10 text-muted-foreground" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/0 animate-pulse-glow" />
        </>
      )}
    </div>
    <Button type="button" variant={taken ? "soft" : "violet"} onClick={onCapture} className="gap-2">
      <Camera className="h-4 w-4" />
      {taken ? "Retake selfie" : "Capture selfie"}
    </Button>
    <p className="text-xs text-muted-foreground text-center max-w-sm">
      Good lighting, plain background, look straight at the camera. We use this to match your school ID.
    </p>
  </div>
);

const ReviewBlock = ({ title, rows }: { title: string; rows: [string, string][] }) => (
  <div className="rounded-xl border border-border bg-muted/40 p-4">
    <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-3">{title}</p>
    <div className="space-y-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{k}</span>
          <span className="font-medium text-right truncate">{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Register;
