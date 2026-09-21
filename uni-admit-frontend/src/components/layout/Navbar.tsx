"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
    const router = useRouter();
    const { role, logout, email } = useAuthStore();

    const isAdmin = role === "ROLE_ADMIN";

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-xs">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">


                {/* Status Indicator & Quick User Actions */}
                <div className="flex items-center gap-3">
                    {/* Portal Badge */}
                    <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        <span className={`h-2 w-2 rounded-full animate-pulse ${isAdmin ? "bg-indigo-500" : "bg-emerald-500"}`} />
                        <span>{isAdmin ? "Admin Portal" : "Student Portal"}</span>
                    </div>

                    {/* Profile Link or Email indicator */}
                    {email && (
                        <span className="hidden md:inline-block text-xs text-slate-500 max-w-[150px] truncate">
                            {email}
                        </span>
                    )}

                    {/* Quick Profile Navigation */}
                    {!isAdmin && (
                        <Link
                            href="/student/profile"
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="My Profile"
                        >
                            <User className="h-4 w-4" />
                        </Link>
                    )}

                    {/* Logout Action */}
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
}