import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { getDemoUser, isDemoSignedUp, logInDemoUser, signUpDemoUser } from "@/lib/demoAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") || "/register";
  const existingUser = getDemoUser();
  const [mode, setMode] = useState<"signup" | "login">(isDemoSignedUp() ? "login" : "signup");
  const [fullName, setFullName] = useState(existingUser?.fullName ?? "");
  const [email, setEmail] = useState(existingUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    setError("");

    if (mode === "signup") {
      if (!fullName.trim() || !email.includes("@") || password.length < 4) {
        setError("Enter your name, email, and a password with at least 4 characters.");
        return;
      }

      signUpDemoUser({ fullName: fullName.trim(), email: email.trim() });
      setMode("login");
      setPassword("");
      return;
    }

    const user = getDemoUser();
    if (!user) {
      setError("You need to sign up first before logging in.");
      setMode("signup");
      return;
    }

    if (email.trim().toLowerCase() !== user.email.toLowerCase() || password.length < 4) {
      setError("Use the same email you signed up with and enter your password.");
      return;
    }

    logInDemoUser();
    navigate(redirect, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-mono">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-border">
        <Logo />
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </header>

      <main className="flex-1 px-5 py-12 max-w-xl w-full mx-auto grid place-items-center">
        <section className="glass-panel p-6 lg:p-8 w-full animate-fade-up">
          <p className="text-sm text-primary mb-3">// account gate</p>
          <h1 className="text-4xl lg:text-5xl mb-4">{mode === "signup" ? "Create account" : "Login"}</h1>
          <p className="text-sm text-muted-foreground leading-7 mb-8">
            {mode === "signup"
              ? "You must sign up first before logging in. After login, you will continue to the registration form."
              : "Login to continue to the registration form and complete your Talent Nation details."}
          </p>

          <div className="grid grid-cols-2 border border-border mb-6">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`h-11 text-sm ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`h-11 text-sm ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              Login
            </button>
          </div>

          <div className="space-y-4">
            {mode === "signup" && (
              <Field label="Full name">
                <Input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Adaeze Okonkwo" />
              </Field>
            )}
            <Field label="Email address">
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@school.edu.ng" />
            </Field>
            <Field label="Password">
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Demo password" />
            </Field>
          </div>

          {error && <p className="mt-4 border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

          <Button variant="hero" size="xl" onClick={submit} className="mt-8 w-full gap-2">
            {mode === "signup" ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
            {mode === "signup" ? "Sign up first" : "Login and continue"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </section>
      </main>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm">{label}</Label>
    {children}
  </div>
);

export default Login;
