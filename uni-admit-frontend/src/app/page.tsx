"use client";

import Link from "next/link";
import {
    GraduationCap,
    ShieldCheck,
    ArrowRight,
    UserPlus,
} from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center">

                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                        <GraduationCap className="h-8 w-8" />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        Welcome to Uni Admit
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                        Intelligent College Admission Portal
                    </p>

                    <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        Select your portal to continue with the admission
                        management system.
                    </p>
                </div>

                {/* Portal Cards */}
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Student Portal */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                                <GraduationCap className="h-6 w-6 text-indigo-600" />
                            </div>

                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                                Student
                            </span>
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold text-slate-900">
                            Student Portal
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Apply for admission, complete your profile,
                            upload documents, and track your application
                            status.
                        </p>

                        <div className="mt-7 flex flex-col gap-3">
                            <Link
                                href="/login?role=student"
                                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Login as Student
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/register"
                                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <UserPlus className="h-4 w-4" />
                                Create Student Account
                            </Link>
                        </div>
                    </div>

                    {/* Admin Portal */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                            </div>

                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                                Administration
                            </span>
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold text-slate-900">
                            Admin Portal
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Review applications, verify student documents,
                            manage admission decisions, and view analytics.
                        </p>

                        <div className="mt-7">
                            <Link
                                href="/login?role=admin"
                                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Login as Admin
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-10 text-center text-xs text-slate-400">
                    Uni Admit · Intelligent Microservices-Based Admission
                    Platform
                </p>
            </div>
        </main>
    );
}