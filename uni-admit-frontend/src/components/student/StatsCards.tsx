"use client";

import { useEffect } from "react";
import {
    FileText,
    Folder,
    UserCheck,
    Loader2,
    Clock,
} from "lucide-react";

import { useDocumentStore } from "@/store/documentStore";
import { useApplicationStore } from "@/store/applicationStore";
import { useProfileStore } from "@/store/profileStore";

export default function StatsCards() {
    const {
        documents,
        fetchDocuments,
        loading: docsLoading,
    } = useDocumentStore();

    const {
        applications,
        fetchApplications,
        loading: appsLoading,
    } = useApplicationStore();

    const {
        profile,
        getMyProfile,
        loading: profileLoading,
    } = useProfileStore();

    useEffect(() => {
        // Fetch fresh data when student dashboard mounts or user re-logs in
        fetchDocuments();
        fetchApplications();
        getMyProfile();
    }, [fetchDocuments, fetchApplications, getMyProfile]);

    const activeApplication = applications && applications.length > 0 ? applications[0] : null;

    // Dynamically check if profile has completed details (avoiding properties not on ProfileResponse)
    const isProfileComplete = Boolean(
        profile && (profile.firstName || profile.lastName || profile.phone || profile.address)
    );

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* 1. Active Application Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Active Application
                    </span>
                    <FileText className="h-5 w-5 text-indigo-600" />
                </div>

                {appsLoading ? (
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
                        <span>Loading...</span>
                    </div>
                ) : activeApplication ? (
                    <div className="mt-3">
                        <p className="truncate text-xl font-extrabold text-slate-900">
                            {activeApplication.university || "Submitted Program"}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                            {activeApplication.courseName || "Degree Application"}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{activeApplication.status || "SUBMITTED"}</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3">
                        <p className="text-lg font-bold text-slate-900">
                            No Application
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                            Submit an application to get started
                        </p>
                    </div>
                )}
            </div>

            {/* 2. Uploaded Documents Card (Dynamic & Persisted) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Uploaded Documents
                    </span>
                    <Folder className="h-5 w-5 text-emerald-600" />
                </div>

                {docsLoading ? (
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div className="mt-3">
                        <p className="text-3xl font-extrabold text-slate-900">
                            {documents ? documents.length : 0}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            {documents && documents.length === 1
                                ? "1 document attached"
                                : `${documents ? documents.length : 0} documents attached`}
                        </p>
                    </div>
                )}
            </div>

            {/* 3. Profile Completion Status Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Profile Status
                    </span>
                    <UserCheck className="h-5 w-5 text-amber-500" />
                </div>

                {profileLoading ? (
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div className="mt-3">
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                    isProfileComplete ? "bg-emerald-500" : "bg-amber-400"
                                }`}
                            />
                            <p className="text-xl font-bold text-slate-900">
                                {isProfileComplete ? "Active Profile" : "Incomplete Profile"}
                            </p>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            {isProfileComplete
                                ? "Personal information updated"
                                : "Please complete your profile details"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}