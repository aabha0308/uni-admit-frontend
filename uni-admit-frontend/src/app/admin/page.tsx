"use client";

import Link from "next/link";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Applications",
    value: "124",
    description: "All submitted applications",
    icon: FileText,
  },
  {
    title: "Pending Review",
    value: "42",
    description: "Applications awaiting review",
    icon: Clock3,
  },
  {
    title: "Approved",
    value: "68",
    description: "Successfully approved",
    icon: CheckCircle2,
  },
  {
    title: "Rejected",
    value: "14",
    description: "Applications rejected",
    icon: XCircle,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of the Uni Admit admission system.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage student admission applications.
            </p>
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