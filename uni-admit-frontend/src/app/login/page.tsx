"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/lib/auth";
import axios from "axios";

interface JwtPayload {
  sub: string;
  userId: string;
  role: string;
  exp: number;
  iat: number;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await authService.login({
        email,
        password,
      });

      const token = getAccessToken();

      if (!token) {
        throw new Error("Login succeeded but access token was not saved.");
      }

      const payload = jwtDecode<JwtPayload>(token);

      console.log("Logged-in user:", payload);

      if (payload.role !== "ROLE_ADMIN") {
        setError("This account does not have administrator access.");
        return;
      }

      router.push("/admin");
    } catch (err: unknown) {
  console.error("LOGIN FAILED:", err);

  if (axios.isAxiosError(err)) {
    setError(
      err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password."
    );
  } else {
    setError("An unexpected error occurred.");
  }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Uni Admit
          </h1>

          <p className="mt-2 text-slate-500">
            Administrator Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Admin Login
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to manage admission applications.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Uni Admit · Administration System
        </p>
      </div>
    </main>
  );
}