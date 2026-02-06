"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "next-auth/react";

export default function CardDemo() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  function validate() {
    let ok = true;

    setEmailError("");
    setPasswordError("");
    setFormError("");

    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailTrim) {
      setEmailError("Email is required");
      ok = false;
    } else if (!emailRegex.test(emailTrim)) {
      setEmailError("Enter a valid email address");
      ok = false;
    }

    if (!passwordTrim) {
      setPasswordError("Password is required");
      ok = false;
    } else if (passwordTrim.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      ok = false;
    }

    return ok;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/donation");
    } catch (err) {
      setFormError("Server not reachable");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => router.push("/register")}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => {
                    setEmailFocus(false);
                    validate();
                  }}
                />

                {emailError && !emailFocus && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => {
                    setPasswordFocus(false);
                    validate();
                  }}
                />

                {passwordError && !passwordFocus && (
                  <p className="text-sm text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              {formError && (
                <p className="text-sm text-red-500">{formError}</p>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            disabled={googleLoading || loading}
            onClick={() => {
              setGoogleLoading(true);
              signIn("google", { callbackUrl: "/donation" });
            }}
          >
            {googleLoading ? "Opening Google..." : "Login with Google"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
