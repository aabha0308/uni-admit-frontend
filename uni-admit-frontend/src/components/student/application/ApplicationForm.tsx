"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, Building2, GraduationCap, Calendar, UserCheck } from "lucide-react";
import { applicationSchema, type ApplicationFormValues } from "@/validations/applicationSchema";

interface ApplicationFormProps {
    profileId: string;
    onSubmit: (values: ApplicationFormValues) => Promise<void>;
    isSubmitting: boolean;
}

export function ApplicationForm({ profileId, onSubmit, isSubmitting }: ApplicationFormProps) {
    const currentYear = new Date().getFullYear();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            profileId: profileId || "",
            courseName: "",
            university: "",
            intakeYear: currentYear,
        },
    });

    // Ensure form registers dynamic profileId updates from store
    useEffect(() => {
        if (profileId) {
            setValue("profileId", profileId);
        }
    }, [profileId, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <input type="hidden" {...register("profileId")} value={profileId} />

            <div className="space-y-4">
                {/* University Field */}
                <div>
                    <label htmlFor="university" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        University Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Building2 className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        </div>
                        <input
                            id="university"
                            {...register("university")}
                            type="text"
                            placeholder="e.g. Stanford University"
                            aria-invalid={!!errors.university}
                            aria-describedby={errors.university ? "university-error" : undefined}
                            className={`block w-full rounded-lg border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                                errors.university
                                    ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            }`}
                        />
                    </div>
                    {errors.university && (
                        <p id="university-error" role="alert" className="mt-1 text-xs text-rose-600">
                            {errors.university.message}
                        </p>
                    )}
                </div>

                {/* Course Name Field */}
                <div>
                    <label htmlFor="courseName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Course / Degree Program <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <GraduationCap className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        </div>
                        <input
                            id="courseName"
                            {...register("courseName")}
                            type="text"
                            placeholder="e.g. M.S. in Computer Science"
                            aria-invalid={!!errors.courseName}
                            aria-describedby={errors.courseName ? "courseName-error" : undefined}
                            className={`block w-full rounded-lg border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                                errors.courseName
                                    ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            }`}
                        />
                    </div>
                    {errors.courseName && (
                        <p id="courseName-error" role="alert" className="mt-1 text-xs text-rose-600">
                            {errors.courseName.message}
                        </p>
                    )}
                </div>

                {/* Intake Year Field */}
                <div>
                    <label htmlFor="intakeYear" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Intake Year <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Calendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        </div>
                        <input
                            id="intakeYear"
                            {...register("intakeYear", { valueAsNumber: true })}
                            type="number"
                            min={currentYear}
                            max={currentYear + 5}
                            aria-invalid={!!errors.intakeYear}
                            aria-describedby={errors.intakeYear ? "intakeYear-error" : undefined}
                            className={`block w-full rounded-lg border pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                                errors.intakeYear
                                    ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            }`}
                        />
                    </div>
                    {errors.intakeYear && (
                        <p id="intakeYear-error" role="alert" className="mt-1 text-xs text-rose-600">
                            {errors.intakeYear.message}
                        </p>
                    )}
                </div>

                {/* Bound Profile Context Banner */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center gap-2.5 text-xs text-slate-600">
                    <UserCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>
                        Bound Profile ID:{" "}
                        <code className="font-mono font-semibold text-slate-800">
                            {profileId ? (profileId.length > 12 ? `${profileId.slice(0, 10)}...` : profileId) : "Active Profile"}
                        </code>
                    </span>
                </div>
            </div>

            {errors.profileId && (
                <p role="alert" className="text-xs text-rose-600">
                    {errors.profileId.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting || !profileId}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" aria-hidden="true" />
                        Submitting Application...
                    </>
                ) : (
                    <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Submit Application
                    </>
                )}
            </button>
        </form>
    );
}