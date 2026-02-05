"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  function validate() {
    let ok = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setFormError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setNameError("Name is required");
      ok = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      ok = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      ok = false;
    }

    return ok;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || "Registration failed");
        return;
      }

      // after successful register, go to login page
      router.push("/");
    } catch (err) {
      setFormError("Server not reachable");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => {
                    setNameFocus(false);
                    validate();
                  }}
                />

                {nameError && !nameFocus && (
                  <p className="text-sm text-red-500">{nameError}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
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

              {/* Password */}
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

            <div className="mt-6">
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            type="button"
            onClick={() => router.push("/")}
          >
            Already have an account? Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
