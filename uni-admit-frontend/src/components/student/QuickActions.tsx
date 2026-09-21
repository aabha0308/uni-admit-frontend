"use client";

import Link from "next/link";
import { User, GraduationCap, UploadCloud, Activity, ArrowRight } from "lucide-react";

interface ActionItem {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
}

const actions: ActionItem[] = [
    {
        title: "Complete Profile",
        description: "Update your personal and academic information.",
        href: "/student/profile",
        icon: User,
    },
    {
        title: "Admission Application",
        description: "Start or continue your admission application.",
        href: "/student/application",
        icon: GraduationCap,
    },
    {
        title: "Upload Documents",
        description: "Upload required certificates and documents.",
        href: "/student/documents",
        icon: UploadCloud,
    },
    {
        title: "Track Status",
        description: "Check your application progress and feedback.",
        href: "/student/status",
        icon: Activity,
    },
];

export default function QuickActions() {
    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Quick Actions
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                    Access frequently used admission portal services.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-900" />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-slate-800">
                                    {action.title}
                                </h3>

                                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                                    {action.description}
                                </p>
                            </div>

                            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                                <span>Open Section</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}