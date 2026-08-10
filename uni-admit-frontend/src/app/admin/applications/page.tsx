"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import axios from "axios";

import { adminService } from "@/services/adminService";
import { ApplicationResponse } from "@/types";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<ApplicationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /**
     * Fetch applications from backend
     */
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await adminService.getApplications();

                setApplications(data);
            // } catch (error: unknown) {
            //     console.error("Failed to fetch applications:", error);

            //     if (axios.isAxiosError(error)) {
            //         setError(
            //             error.response?.data?.detail ||
            //             "Failed to load applications."
            //         );
            //     } else if (error instanceof Error) {
            //         setError(error.message);
            //     } else {
            //         setError("Failed to load applications.");
            //     }
            // } 
            } catch (error: unknown) {
    console.error("FAILED TO LOAD APPLICATIONS:", error);

    if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("RESPONSE DATA:", error.response?.data);
        console.error("REQUEST URL:", error.config?.url);

        setError(
            error.response?.data?.detail ||
            error.response?.data?.message ||
            `Request failed with status ${error.response?.status}`
        );
    } else if (error instanceof Error) {
        console.error("ERROR MESSAGE:", error.message);
        setError(error.message);
    } else {
        setError("Failed to load applications.");
    }
}
            finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    /**
     * Search + status filtering
     */
    const filteredApplications = applications.filter((application) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
            application.id.toLowerCase().includes(searchValue) ||
            application.studentId.toLowerCase().includes(searchValue) ||
            application.courseName.toLowerCase().includes(searchValue) ||
            application.university.toLowerCase().includes(searchValue);

        const matchesStatus =
            statusFilter === "ALL" ||
            application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    /**
     * Loading state
     */
    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Applications
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Review and manage student admission applications.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                    <p className="text-sm text-slate-500">
                        Loading applications...
                    </p>
                </div>
            </div>
        );
    }

    /**
     * Error state
     */
    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Applications
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Review and manage student admission applications.
                    </p>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <p className="font-medium text-red-700">
                        Failed to load applications
                    </p>

                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}

            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Applications
                </h1>

                <p className="mt-2 text-slate-500">
                    Review and manage student admission applications.
                </p>
            </div>

            {/* Filters */}

            <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    {/* Search */}

                    <div className="relative w-full md:w-96">
                        <Search
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-900"
                        />
                    </div>

                    {/* Status filter */}

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none"
                    >
                        <option value="ALL">
                            All Statuses
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="UNDER_REVIEW">
                            Under Review
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>
                    </select>
                </div>
            </div>

            {/* Applications Table */}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Student
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Course
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    University
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Intake
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Submitted
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {filteredApplications.map((application) => (
                                <tr
                                    key={application.id}
                                    className="hover:bg-slate-50"
                                >

                                    {/* Student */}

                                    <td className="px-6 py-5">
                                        <p className="font-medium text-slate-900">
                                            Student
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {application.studentId}
                                        </p>
                                    </td>

                                    {/* Course */}

                                    <td className="px-6 py-5 text-sm text-slate-700">
                                        {application.courseName}
                                    </td>

                                    {/* University */}

                                    <td className="px-6 py-5 text-sm text-slate-700">
                                        {application.university}
                                    </td>

                                    {/* Intake */}

                                    <td className="px-6 py-5 text-sm text-slate-700">
                                        {application.intakeYear}
                                    </td>

                                    {/* Status */}

                                    <td className="px-6 py-5">
                                        <StatusBadge
                                            status={application.status}
                                        />
                                    </td>

                                    {/* Submitted */}

                                    <td className="px-6 py-5 text-sm text-slate-500">
                                        {formatDate(application.submittedAt)}
                                    </td>

                                    {/* Action */}

                                    <td className="px-6 py-5 text-right">
                                        <Link
                                            href={`/admin/applications/${application.id}`}
                                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                                        >
                                            <Eye className="h-4 w-4" />

                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Empty State */}

                {filteredApplications.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="font-medium text-slate-700">
                            No applications found
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Try changing your search or filter.
                        </p>
                    </div>
                )}
            </div>

            {/* Results Count */}

            <p className="text-sm text-slate-500">
                Showing {filteredApplications.length} of{" "}
                {applications.length} applications
            </p>
        </div>
    );
}

/**
 * Format ISO date without locale-dependent formatting.
 *
 * This avoids the hydration mismatch you encountered earlier.
 */
function formatDate(date: string): string {
    if (!date) {
        return "—";
    }

    return date.substring(0, 10);
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
    status,
}: {
    status: string;
}) {
    const styles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",

        APPROVED: "bg-green-100 text-green-800",

        REJECTED: "bg-red-100 text-red-800",

        UNDER_REVIEW: "bg-blue-100 text-blue-800",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
                styles[status] ||
                "bg-slate-100 text-slate-700"
            }`}
        >
            {status.replace("_", " ")}
        </span>
    );
}