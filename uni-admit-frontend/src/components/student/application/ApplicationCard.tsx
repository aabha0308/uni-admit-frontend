"use client";

import React from "react";
import {
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    FileText,
    Building2,
    GraduationCap,
    Calendar,
    Hash,
} from "lucide-react";
import type { ApplicationResponse, ApplicationStatus } from "@/types/application";

interface ApplicationCardProps {
    application: ApplicationResponse;
}

const statusConfig: Record<
    ApplicationStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ElementType }
> = {
    DRAFT: {
        label: "DRAFT",
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        icon: FileText,
    },
    SUBMITTED: {
        label: "SUBMITTED",
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: Clock,
    },
    DOCUMENTS_PENDING: {
        label: "DOCS PENDING",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: AlertCircle,
    },
    UNDER_REVIEW: {
        label: "UNDER REVIEW",
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: Clock,
    },
    ACCEPTED: {
        label: "ACCEPTED",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircle2,
    },
    REJECTED: {
        label: "REJECTED",
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        icon: XCircle,
    },
};

export function ApplicationCard({ application }: ApplicationCardProps) {
    const config = statusConfig[application.status] || statusConfig.DRAFT;
    const StatusIcon = config.icon;

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
            {/* Top Bar: Reference ID, Course Name & Status Badge */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                    {application.id && (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                            <Hash className="h-3 w-3" />
                            <span>ID: {application.id}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-slate-800 shrink-0" />
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {application.courseName || "Untitled Course"}
                        </h3>
                    </div>
                    {application.university && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{application.university}</span>
                        </div>
                    )}
                </div>

                {/* Status Badge */}
                <div
                    className={`inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide shrink-0 ${config.bg} ${config.text} ${config.border}`}
                    role="status"
                >
                    <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{config.label}</span>
                </div>
            </div>

            {/* Metadata Section */}
            <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Intake Year</p>
                        <p className="font-semibold text-slate-800">{application.intakeYear || "N/A"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Submitted</p>
                        <p className="font-semibold text-slate-800">
                            {application.submittedAt
                                ? new Date(application.submittedAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                : "Not submitted"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Rejection Alert */}
            {application.rejectionReason && (
                <div
                    className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/70 p-3 text-xs text-rose-800"
                    role="alert"
                >
                    <XCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="font-bold text-rose-900">Rejection Reason</p>
                        <p className="mt-0.5 text-rose-700 leading-relaxed">{application.rejectionReason}</p>
                    </div>
                </div>
            )}

            {/* Admin Feedback */}
            {application.adminComments && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                    <AlertCircle className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="font-bold text-slate-800">Admin Feedback</p>
                        <p className="mt-0.5 text-slate-600 leading-relaxed">{application.adminComments}</p>
                    </div>
                </div>
            )}
        </article>
    );
}