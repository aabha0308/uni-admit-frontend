"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2, AlertCircle, GraduationCap } from "lucide-react";

import { loginSchema } from "@/validations/authSchemas";
import { LoginRequest } from "@/types";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    const router = useRouter();
    const loginUser = useAuthStore((state) => state.login);

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginRequest) {
        try {
            setLoading(true);
            setServerError("");

            await loginUser(data);

            const role = useAuthStore.getState().role;

            if (role === "ROLE_ADMIN") {
                router.push("/admin");
            } else {
                router.push("/student");
            }
        } catch (err: any) {
            setServerError(
                err?.response?.data?.detail ??
                err?.response?.data?.message ??
                err?.response?.data?.error ??
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm shrink-0">
                    <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Welcome Back
                    </h1>
                    <p className="text-xs text-slate-500">
                        Login to Uni Admit Portal
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="name@example.com"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                        />
                    </div>
                    {errors.email?.message && (
                        <p className="mt-1 text-xs text-rose-600">
                            {errors.email?.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                        />
                    </div>
                    {errors.password?.message && (
                        <p className="mt-1 text-xs text-rose-600">
                            {errors.password?.message}
                        </p>
                    )}
                </div>

                {serverError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 flex items-start gap-2 text-xs text-rose-700">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{serverError}</span>
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-10 mt-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                            <span>Signing In...</span>
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
        </div>
    );
}