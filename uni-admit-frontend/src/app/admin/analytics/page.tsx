"use client";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { adminService } from "@/services/adminService";
import { AnalyticsResponse } from "@/types";

const statusStyles: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-800",
  DOCUMENTS_PENDING: "bg-orange-100 text-orange-800",
  UNDER_REVIEW: "bg-blue-100 text-blue-800",
  ACCEPTED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function AnalyticsPage() {
  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminService.getAnalytics();

        setAnalytics(data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Overview of admission applications and application trends.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (error || !analytics) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Overview of admission applications and application trends.
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            Failed to load analytics.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Please make sure the backend services are running.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Real status data received from backend
   */
  const applicationsByStatus =
    analytics.applicationsByStatus || {};

  const pendingApplications =
    (applicationsByStatus["SUBMITTED"] ?? 0) +
    (applicationsByStatus["DOCUMENTS_PENDING"] ?? 0) +
    (applicationsByStatus["UNDER_REVIEW"] ?? 0);

  const approvedApplications =
    applicationsByStatus["ACCEPTED"] ?? 0;

  const rejectedApplications =
    applicationsByStatus["REJECTED"] ?? 0;

  /*
   * Data for pie chart
   */
  const statusData = [
    {
      name: "Pending",
      value: pendingApplications,
    },
    {
      name: "Approved",
      value: approvedApplications,
    },
    {
      name: "Rejected",
      value: rejectedApplications,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of admission applications and application trends.
        </p>
      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Applications"
          value={analytics.totalApplications.toString()}
        />

        <StatCard
          title="Pending Applications"
          value={pendingApplications.toString()}
        />

        <StatCard
          title="Approved Applications"
          value={approvedApplications.toString()}
        />

        <StatCard
          title="Rejected Applications"
          value={rejectedApplications.toString()}
        />

      </div>


      {/* Student Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <StatCard
          title="Total Students"
          value={analytics.totalStudents.toString()}
        />

        <StatCard
          title="Applications per Student"
          value={
            analytics.totalStudents > 0
              ? (
                  analytics.totalApplications /
                  analytics.totalStudents
                ).toFixed(1)
              : "0"
          }
        />

      </div>


      {/* Application Status Chart */}

      <div className="rounded-xl border border-slate-200 bg-white p-6">

        <h2 className="text-lg font-semibold text-slate-900">
          Application Status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current application distribution
        </p>

        <div className="mt-6 h-[350px]">

          {statusData.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-slate-500">
                No application status data available.
              </p>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {statusData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>


      {/* Status Breakdown */}

      <div className="rounded-xl border border-slate-200 bg-white">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Application Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Detailed application status information
          </p>

        </div>

        <div className="divide-y divide-slate-100">

          {Object.entries(applicationsByStatus).map(
            ([status, count]) => (

              <div
                key={status}
                className="flex items-center justify-between p-5"
              >

                <div>

                  <p className="font-medium text-slate-900">
                    {status.replaceAll("_", " ")}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Applications currently in this status
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[status] ||
                      "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {status.replaceAll("_", " ")}
                  </span>

                  <span className="text-xl font-bold text-slate-900">
                    {count}
                  </span>

                </div>

              </div>

            )
          )}

          {Object.keys(applicationsByStatus).length === 0 && (
            <div className="p-6">
              <p className="text-slate-500">
                No application status information available.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}


/*
 * Statistics Card
 */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}