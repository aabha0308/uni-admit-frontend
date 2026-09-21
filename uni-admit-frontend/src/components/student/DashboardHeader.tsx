"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, Calendar, UserCheck } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
    const router = useRouter();

    const email = useAuthStore((state) => state.email);
    const logout = useAuthStore((state) => state.logout);

    const [loggingOut, setLoggingOut] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    }, []);

    const today = useMemo(() => {
        if (!mounted) return "";
        return new Intl.DateTimeFormat("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date());
    }, [mounted]);

    async function handleLogout() {
        try {
            setLoggingOut(true);
            await logout();
            router.replace("/login");
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <header className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    {/* Date Badge */}
                    {mounted && today && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                            <span>{today}</span>
                        </div>
                    )}

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        {greeting}
                    </h1>

                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <UserCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                        <span>Signed in as <strong className="text-slate-900">{email ?? "Student"}</strong></span>
                    </div>

                    <p className="pt-1 text-xs text-slate-500 sm:text-sm">
                        Continue your admission process and keep your application up to date.
                    </p>
                </div>

                <div className="flex items-center shrink-0">
                    <Button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
                    >
                        {loggingOut ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                <span>Logging out...</span>
                            </>
                        ) : (
                            <>
                                <LogOut className="h-4 w-4" aria-hidden="true" />
                                <span>Logout</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}