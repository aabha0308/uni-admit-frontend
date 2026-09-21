"use client";

import { CheckCircle2, Circle } from "lucide-react";
import type { ApplicationStatus } from "@/types/application";

interface ApplicationProgressProps {
    status?: ApplicationStatus;
}

const STEPS = [
    { id: "PROFILE", label: "Profile Setup" },
    { id: "APPLICATION", label: "Application Details" },
    { id: "DOCUMENTS", label: "Document Upload" },
    { id: "SUBMISSION", label: "Review & Decision" },
];

export function ApplicationProgress({ status }: ApplicationProgressProps) {
    const getStepState = (index: number) => {
        if (!status) return index === 1 ? "active" : index === 0 ? "completed" : "upcoming";

        const statusOrder: Record<ApplicationStatus, number> = {
            DRAFT: 1,
            SUBMITTED: 2,
            DOCUMENTS_PENDING: 2,
            UNDER_REVIEW: 3,
            ACCEPTED: 3,
            REJECTED: 3,
        };

        const currentStep = statusOrder[status] ?? 1;

        if (index < currentStep) return "completed";
        if (index === currentStep) return "active";
        return "upcoming";
    };

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="mb-6 flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Admission Journey Progress
                </h4>
                {status && (
                    <span className="text-[11px] font-semibold text-slate-500">
                        Status: <span className="text-slate-800">{status.replace("_", " ")}</span>
                    </span>
                )}
            </div>

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                {STEPS.map((step, index) => {
                    const state = getStepState(index);
                    const isLast = index === STEPS.length - 1;

                    return (
                        <div
                            key={step.id}
                            className="relative flex items-center gap-3 sm:flex-1 sm:flex-col sm:items-center text-left sm:text-center group"
                        >
                            {/* Connecting Line for Desktop */}
                            {!isLast && (
                                <div className="hidden sm:block absolute top-3.5 left-[calc(50%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-slate-100 z-0">
                                    <div
                                        className="h-full bg-slate-900 transition-all duration-300"
                                        style={{
                                            width: state === "completed" ? "100%" : "0%",
                                        }}
                                    />
                                </div>
                            )}

                            {/* Indicator Icon */}
                            <div className="relative z-10 flex h-7 w-7 items-center justify-center shrink-0 rounded-full bg-white">
                                {state === "completed" && (
                                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                )}
                                {state === "active" && (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-900 shadow-xs ring-4 ring-slate-100">
                                        <div className="h-2 w-2 rounded-full bg-white" />
                                    </div>
                                )}
                                {state === "upcoming" && (
                                    <Circle className="h-6 w-6 text-slate-300" />
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={`text-xs transition-colors ${
                                    state === "active"
                                        ? "text-slate-900 font-bold"
                                        : state === "completed"
                                            ? "text-slate-700 font-medium"
                                            : "text-slate-400 font-normal"
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}