"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

import { adminService } from "@/services/adminService";
import { AnalyticsResponse } from "@/types";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminService.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load dashboard analytics:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totalApplications = analytics?.totalApplications ?? 0;

  const approvedApplications =
    analytics?.applicationsByStatus?.ACCEPTED ?? 0;

  const rejectedApplications =
    analytics?.applicationsByStatus?.REJECTED ?? 0;

  const pendingApplications =
    (analytics?.applicationsByStatus?.SUBMITTED ?? 0) +
    (analytics?.applicationsByStatus?.DOCUMENTS_PENDING ?? 0) +
    (analytics?.applicationsByStatus?.UNDER_REVIEW ?? 0);

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      description: "All submitted applications",
      icon: FileText,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Pending Review",
      value: pendingApplications,
      description: "Applications awaiting review",
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Approved",
      value: approvedApplications,
      description: "Successfully approved",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Rejected",
      value: rejectedApplications,
      description: "Applications rejected",
      icon: XCircle,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of the Uni Admit admission system.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>

                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {loading ? "—" : stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage student admission applications.
            </p>
          </div>

          <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            Live Data
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/admin/applications"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            View Applications
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/admin/analytics"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}