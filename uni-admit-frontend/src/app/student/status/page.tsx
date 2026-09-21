"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useApplicationStore } from "@/store/applicationStore";
import { ApplicationProgress } from "@/components/student/application/ApplicationProgress";
import { ApplicationCard } from "@/components/student/application/ApplicationCard";
import {
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    FileText,
    ArrowRight,
    RefreshCw
} from "lucide-react";

export default function StudentStatusPage() {
    const { applications, fetchApplications, loading, error } = useApplicationStore();

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <RefreshCw className="h-8 w-8 animate-spin text-slate-800" />
                <p className="text-slate-600 text-sm font-medium">Loading your application status...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center max-w-2xl mx-auto my-8">
                <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-red-900">Failed to load status</h2>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                    onClick={() => fetchApplications()}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const currentApplication = applications[0];

    if (!currentApplication) {
        return (
            <div className="max-w-3xl mx-auto py-12 text-center">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 mb-4">
                        <FileText className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">No Application Found</h2>
                    <p className="mt-2 text-slate-600 max-w-md mx-auto text-sm">
                        You have not submitted an admission application yet. Complete your profile and submit an application to track your status here.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link
                            href="/student/application"
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
                        >
                            Start Application
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const { status, adminComments, rejectionReason } = currentApplication;

    return (
        <main className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Application Status
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Track the real-time review progress of your university admission application.
                    </p>
                </div>

                {/* Step Progress Bar */}
                <section>
                    <ApplicationProgress status={status} />
                </section>

                {/* Decision / High-Level Alerts */}
                {status === "ACCEPTED" && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-xs">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-xl font-bold text-emerald-900">Congratulations! Application Accepted</h2>
                                <p className="mt-1 text-sm text-emerald-700">
                                    Your admission application has been formally approved by the admissions committee.
                                </p>
                                {adminComments && (
                                    <div className="mt-3 rounded-xl bg-white/80 p-3 text-xs text-emerald-800 border border-emerald-100">
                                        <span className="font-semibold">Committee Note: </span> {adminComments}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {status === "REJECTED" && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 shadow-xs">
                        <div className="flex items-start gap-4">
                            <XCircle className="h-8 w-8 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-xl font-bold text-rose-900">Application Status: Rejected</h2>
                                <p className="mt-1 text-sm text-rose-700">
                                    Unfortunately, your admission application was not accepted for this intake.
                                </p>
                                {rejectionReason && (
                                    <div className="mt-3 rounded-xl bg-white/80 p-3 text-xs text-rose-800 border border-rose-100">
                                        <span className="font-semibold">Reason: </span> {rejectionReason}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {status === "DOCUMENTS_PENDING" && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-xs">
                        <div className="flex items-start gap-4">
                            <Clock className="h-8 w-8 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-xl font-bold text-amber-900">Documents Pending</h2>
                                <p className="mt-1 text-sm text-amber-700">
                                    Additional document verification is required before final evaluation. Please check the document upload section.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Application Detail Card */}
                <section className="mt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Application Details</h2>
                    <ApplicationCard application={currentApplication} />
                </section>
            </div>
        </main>
    );
}