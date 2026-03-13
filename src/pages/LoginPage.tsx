import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const { signIn, signInWithOtp } = useAuth();
  const navigate = useNavigate();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) setError(error);
    else navigate("/dashboard");
    setLoading(false);
  };

  const handleOtpLogin = async () => {
    if (!email) { setError("Enter your email first"); return; }
    setError("");
    setLoading(true);
    const { error } = await signInWithOtp(email);
    if (error) setError(error);
    else {
      setOtpSent(true);
      setInfo("A magic link has been sent to your email. Check your inbox to sign in.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded bg-primary">
            <Shield className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="font-heading text-2xl">Handwriting Verification System</CardTitle>
          <CardDescription className="font-ui">Deep Learning Based Authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            {error && <div className="rounded bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
            {info && <div className="rounded bg-success/10 p-3 text-sm text-success">{info}</div>}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-ui text-sm font-medium">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="researcher@university.edu" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-ui text-sm font-medium">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline font-ui">Forgot password?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In with Password"}
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground font-ui">or</span></div>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={handleOtpLogin} disabled={loading || otpSent}>
              {otpSent ? "Magic Link Sent ✓" : "Sign In with Email OTP"}
            </Button>
            <p className="text-center text-sm text-muted-foreground font-ui">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">Register</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
