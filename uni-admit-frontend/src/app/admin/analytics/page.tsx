"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const statusData = [
  {
    name: "Pending",
    value: 42,
  },
  {
    name: "Approved",
    value: 68,
  },
  {
    name: "Rejected",
    value: 14,
  },
];

const intakeData = [
  {
    year: "2024",
    applications: 82,
  },
  {
    year: "2025",
    applications: 105,
  },
  {
    year: "2026",
    applications: 124,
  },
];

const recentApplications = [
  {
    student: "Aarav Sharma",
    course: "Computer Science",
    status: "PENDING",
  },
  {
    student: "Priya Mehta",
    course: "Data Science",
    status: "APPROVED",
  },
  {
    student: "Rohan Patel",
    course: "Artificial Intelligence",
    status: "REJECTED",
  },
  {
    student: "Ananya Singh",
    course: "Software Engineering",
    status: "UNDER_REVIEW",
  },
];

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800",

  APPROVED:
    "bg-green-100 text-green-800",

  REJECTED:
    "bg-red-100 text-red-800",

  UNDER_REVIEW:
    "bg-blue-100 text-blue-800",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of admission applications and
          application trends.
        </p>
      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Applications"
          value="124"
        />

        <StatCard
          title="Pending Applications"
          value="42"
        />

        <StatCard
          title="Approved Applications"
          value="68"
        />

        <StatCard
          title="Rejected Applications"
          value="14"
        />

      </div>


      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Status Chart */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Application Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current application distribution
          </p>

          <div className="mt-6 h-[300px]">

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
                  outerRadius={100}
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

          </div>

        </div>


        {/* Intake Chart */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Applications by Intake
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Application volume by year
          </p>

          <div className="mt-6 h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={intakeData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Recent applications */}

      <div className="rounded-xl border border-slate-200 bg-white">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest admission application activity
          </p>

        </div>


        <div className="divide-y divide-slate-100">

          {recentApplications.map(
            (application) => (

              <div
                key={application.student}
                className="flex items-center justify-between p-5"
              >

                <div>

                  <p className="font-medium text-slate-900">
                    {application.student}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {application.course}
                  </p>

                </div>


                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[
                      application.status
                    ]
                  }`}
                >
                  {application.status.replace(
                    "_",
                    " "
                  )}
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}


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