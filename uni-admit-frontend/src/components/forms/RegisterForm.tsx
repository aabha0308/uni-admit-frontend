"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2, AlertCircle, GraduationCap } from "lucide-react";

import { RegisterRequest } from "@/types";
import { registerSchema } from "@/validations/authSchemas";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
    const router = useRouter();
    const registerUser = useAuthStore((state) => state.register);

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterRequest>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterRequest) {
        try {
            setLoading(true);
            setServerError("");

            await registerUser(data);

            reset();
            router.push("/login");
        } catch (err: any) {
            setServerError(
                err?.response?.data?.detail ??
                err?.response?.data?.message ??
                err?.response?.data?.error ??
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs shrink-0">
                    <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Create Account
                    </h1>
                    <p className="text-xs text-slate-500">
                        Register for Uni Admit Portal
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Input */}
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

                {/* Password Input */}
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

                {/* Error Alert */}
                {serverError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 flex items-start gap-2 text-xs text-rose-700">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{serverError}</span>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-10 mt-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                            <span>Creating Account...</span>
                        </>
                    ) : (
                        "Register"
                    )}
                </Button>
            </form>

            {/* Footer Navigation */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-slate-900 hover:underline transition-all"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}