"use client";

import { useEffect, useState } from "react";
import {
    AlertCircle,
    FileText,
    Loader2,
    PlusCircle,
    UserCircle,
} from "lucide-react";

import { useApplicationStore } from "@/store/applicationStore";
import { useProfileStore } from "@/store/profileStore";

import { ApplicationForm } from "@/components/student/application/ApplicationForm";
import { ApplicationProgress } from "@/components/student/application/ApplicationProgress";
import { ApplicationCard } from "@/components/student/application/ApplicationCard";

import type { ApplicationFormValues } from "@/validations/applicationSchema";

export default function ApplicationPage() {
    const {
        applications,
        loading,
        submitting,
        error,
        fetchApplications,
        submitApplication,
        clearError,
    } = useApplicationStore();

    const {
        profile,
        loading: profileLoading,
        getMyProfile,
    } = useProfileStore();

    const [showForm, setShowForm] = useState(false);
    const [successId, setSuccessId] = useState<string | null>(null);

    /*
     * Load the student's profile and existing applications
     * when the page opens.
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchApplications(),
                    getMyProfile(),
                ]);
            } catch {
                // Errors are handled by the respective stores.
            }
        };

        loadData();
    }, [fetchApplications, getMyProfile]);

    const hasProfile = Boolean(profile?.id);
    const hasApplications = applications.length > 0;

    /*
     * Safely obtain the profile ID only when a profile exists.
     * This avoids the TypeScript "possibly null" error.
     */
    const profileId = profile?.id ?? "";

    /*
     * Get the status of the most recent application to drive the progress bar stage
     */
    const latestStatus = hasApplications ? applications[0]?.status : undefined;

    async function handleSubmit(values: ApplicationFormValues) {
        try {
            clearError();
            setSuccessId(null);

            const created = await submitApplication(values);

            if (created) {
                setSuccessId(created.id);
                setShowForm(false);

                /*
                 * Refresh the list so the newly created application
                 * appears immediately.
                 */
                await fetchApplications();
            }
        } catch {
            // applicationStore already handles the error.
        }
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Page Header */}
                <header className="mb-8">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Student Portal
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        Admission Application
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        Submit and track your university admission applications.
                        Complete each stage carefully to keep your admission
                        process up to date.
                    </p>
                </header>

                {/* Application Progress */}
                <section className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                    <ApplicationProgress status={latestStatus} />
                </section>

                {/* Backend / Application Error */}
                {error && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        <AlertCircle
                            className="mt-0.5 h-5 w-5 shrink-0"
                            aria-hidden="true"
                        />

                        <div className="flex-1">
                            <p className="font-medium">
                                Unable to process your application
                            </p>

                            <p className="mt-1">
                                {error}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearError}
                            className="text-xs font-medium underline underline-offset-2 hover:no-underline cursor-pointer"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Success Message */}
                {successId && (
                    <div
                        role="status"
                        className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700"
                    >
                        <p className="font-semibold">
                            Application submitted successfully.
                        </p>

                        <p className="mt-1">
                            Your application has been created and is now being
                            processed. You can track it below.
                        </p>
                    </div>
                )}

                {/* Profile Required */}
                {!profileLoading && !hasProfile && (
                    <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                        <div className="flex items-start gap-3">
                            <UserCircle
                                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                                aria-hidden="true"
                            />

                            <div>
                                <h2 className="text-sm font-semibold text-amber-900">
                                    Complete your profile first
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-amber-800">
                                    A student profile is required before you can
                                    start an admission application. Complete
                                    your profile and return here to continue.
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Profile Loading */}
                {profileLoading && (
                    <section className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <Loader2
                                className="h-5 w-5 animate-spin motion-reduce:animate-none"
                                aria-hidden="true"
                            />

                            Loading your profile...
                        </div>
                    </section>
                )}

                {/* Application Section */}
                {hasProfile && (
                    <section>
                        {/* Section Header */}
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Your Applications
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    View existing applications or start a new
                                    admission application.
                                </p>
                            </div>

                            {!showForm && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        clearError();
                                        setSuccessId(null);
                                        setShowForm(true);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:bg-slate-950 cursor-pointer"
                                >
                                    <PlusCircle
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />

                                    Start New Application
                                </button>
                            )}
                        </div>

                        {/* Loading Applications */}
                        {loading && (
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-10 shadow-xs">
                                <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
                                    <Loader2
                                        className="h-5 w-5 animate-spin motion-reduce:animate-none"
                                        aria-hidden="true"
                                    />

                                    Loading your applications...
                                </div>
                            </div>
                        )}

                        {/* New Application Form */}
                        {!loading && showForm && hasProfile && (
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        New Admission Application
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Enter your intended course, university,
                                        and intake year.
                                    </p>
                                </div>

                                <ApplicationForm
                                    profileId={profileId}
                                    isSubmitting={submitting}
                                    onSubmit={handleSubmit}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    disabled={submitting}
                                    className="mt-4 text-sm font-medium text-slate-500 transition hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Existing Applications */}
                        {!loading &&
                            !showForm &&
                            hasApplications && (
                                <div className="grid gap-5 md:grid-cols-2">
                                    {applications.map((application) => (
                                        <ApplicationCard
                                            key={application.id}
                                            application={application}
                                        />
                                    ))}
                                </div>
                            )}

                        {/* Empty State */}
                        {!loading &&
                            !showForm &&
                            !hasApplications && (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-xs">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                        <FileText
                                            className="h-6 w-6 text-slate-500"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="mt-4 text-base font-semibold text-slate-900">
                                        No applications yet
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                        You have not started an admission
                                        application yet. Start your first
                                        application to begin the admission
                                        process.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            clearError();
                                            setSuccessId(null);
                                            setShowForm(true);
                                        }}
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 active:bg-slate-950 cursor-pointer"
                                    >
                                        <PlusCircle
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />

                                        Start Application
                                    </button>
                                </div>
                            )}
                    </section>
                )}
            </div>
        </main>
    );
}