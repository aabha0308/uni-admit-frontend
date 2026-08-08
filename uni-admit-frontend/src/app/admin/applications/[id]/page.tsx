"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminService } from "@/services/adminService";
import {
  ApplicationDetailResponse,
  StatusUpdateRequest,
} from "@/types";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const applicationId = params.id as string;

  const [application, setApplication] =
    useState<ApplicationDetailResponse | null>(null);

  const [loading, setLoading] = useState(true);

 const [reviewing, setReviewing] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [adminComments, setAdminComments] = useState("");

  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
  loadMockApplication();
}, [applicationId]);

const loadMockApplication = () => {
  const mockApplications: Record<
    string,
    ApplicationDetailResponse
  > = {
    "APP-001": {
      applicationId: "APP-001",
      courseName: "Computer Science",
      university: "Technical University of Munich",
      intakeYear: 2026,
      status: "PENDING",
      rejectionReason: "",
      adminComments: "",
      submittedAt: "2026-08-01T10:30:00Z",

      studentFirstName: "Aarav",
      studentLastName: "Sharma",
      studentPhone: "+91 9876543210",
      studentCity: "Mumbai",

      tenthPercentage: 91,
      twelfthPercentage: 88,
    },

    "APP-002": {
      applicationId: "APP-002",
      courseName: "Data Science",
      university: "RWTH Aachen University",
      intakeYear: 2026,
      status: "APPROVED",
      rejectionReason: "",
      adminComments: "Strong academic profile.",
      submittedAt: "2026-07-29T09:15:00Z",

      studentFirstName: "Priya",
      studentLastName: "Mehta",
      studentPhone: "+91 9876543211",
      studentCity: "Pune",

      tenthPercentage: 94,
      twelfthPercentage: 92,
    },

    "APP-003": {
      applicationId: "APP-003",
      courseName: "Artificial Intelligence",
      university: "University of Stuttgart",
      intakeYear: 2026,
      status: "REJECTED",
      rejectionReason: "Academic requirements not met.",
      adminComments: "",
      submittedAt: "2026-07-25T14:20:00Z",

      studentFirstName: "Rohan",
      studentLastName: "Patel",
      studentPhone: "+91 9876543212",
      studentCity: "Ahmedabad",

      tenthPercentage: 78,
      twelfthPercentage: 74,
    },

    "APP-004": {
      applicationId: "APP-004",
      courseName: "Software Engineering",
      university: "University of Hamburg",
      intakeYear: 2026,
      status: "UNDER_REVIEW",
      rejectionReason: "",
      adminComments: "Documents currently under review.",
      submittedAt: "2026-07-22T11:45:00Z",

      studentFirstName: "Ananya",
      studentLastName: "Singh",
      studentPhone: "+91 9876543213",
      studentCity: "Delhi",

      tenthPercentage: 89,
      twelfthPercentage: 90,
    },
  };

  const selected =
    mockApplications[applicationId] ||
    mockApplications["APP-001"];

  setApplication(selected);

  setAdminComments(selected.adminComments || "");
  setRejectionReason(selected.rejectionReason || "");

  setLoading(false);
};

  const loadApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await adminService.getApplicationDetails(applicationId);

      setApplication(data);

      setAdminComments(data.adminComments || "");
      setRejectionReason(data.rejectionReason || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load application.");
    } finally {
      setLoading(false);
    }
  };

  const reviewApplication = async (status: string) => {
    if (!application) return;
    if (
  status === "REJECTED" &&
  !rejectionReason.trim()
) {
  alert("Please provide a rejection reason.");
  return;
}

    try {
      setReviewing(status);

      const payload: StatusUpdateRequest = {
        newStatus: status,
        reason:
          status === "REJECTED"
            ? rejectionReason
            : "",
        adminComments,
      };

    //   await adminService.reviewApplication(
    //     application.applicationId,
    //     payload
    //   );
    console.log("Review payload:", payload);

await new Promise((resolve) =>
  setTimeout(resolve, 800)
);

      alert(`Application ${status.toLowerCase()} successfully.`);

      router.push("/admin/applications");
    } catch (err) {
      console.error(err);
      alert("Failed to review application.");
    } finally {
      setReviewing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <p>Loading application...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">
          Application Details
        </h1>

        <p className="text-red-500">
          {error || "Application not found."}
        </p>

        <button
          onClick={() => router.push("/admin/applications")}
          className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>
          <button
            onClick={() => router.push("/admin/applications")}
            className="mb-3 text-sm text-gray-600 hover:text-black"
          >
            ← Back to Applications
          </button>

          <h1 className="text-3xl font-bold">
            Application Details
          </h1>

          <p className="mt-1 text-gray-500">
            Application ID: {application.applicationId}
          </p>
        </div>

        <div>
          <StatusBadge status={application.status} />
        </div>

      </div>


      {/* Student Information */}

      <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Student Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <InfoItem
            label="First Name"
            value={application.studentFirstName}
          />

          <InfoItem
            label="Last Name"
            value={application.studentLastName}
          />

          <InfoItem
            label="Phone"
            value={application.studentPhone}
          />

          <InfoItem
            label="City"
            value={application.studentCity}
          />

        </div>

      </section>


      {/* Application Information */}

      <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Application Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <InfoItem
            label="Course"
            value={application.courseName}
          />

          <InfoItem
            label="University"
            value={application.university}
          />

          <InfoItem
            label="Intake Year"
            value={String(application.intakeYear)}
          />

          <InfoItem
            label="Submitted At"
            value={new Date(
              application.submittedAt
            ).toLocaleString()}
          />

        </div>

      </section>


      {/* Academic Information */}

      <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Academic Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <InfoItem
            label="10th Percentage"
            value={`${application.tenthPercentage}%`}
          />

          <InfoItem
            label="12th Percentage"
            value={`${application.twelfthPercentage}%`}
          />

        </div>

      </section>

      {/* Documents Section */}

<section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-5">
    <h2 className="text-xl font-semibold text-slate-900">
      Documents
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Documents submitted by the student for verification.
    </p>
  </div>

  <div className="space-y-3">

    <DocumentRow
      name="10th Marksheet"
      type="PDF"
      status="VERIFIED"
    />

    <DocumentRow
      name="12th Marksheet"
      type="PDF"
      status="VERIFIED"
    />

    <DocumentRow
      name="Passport"
      type="PDF"
      status="PENDING"
    />

    <DocumentRow
      name="Statement of Purpose"
      type="PDF"
      status="VERIFIED"
    />

  </div>

</section>

{/* Application Timeline */}

<section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-6">
    <h2 className="text-xl font-semibold text-slate-900">
      Application Timeline
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Track the progress of this application.
    </p>
  </div>


  <div className="space-y-6">

    <TimelineItem
      title="Application Submitted"
      description="Student submitted the admission application."
      date="August 1, 2026"
      completed
    />

    <TimelineItem
      title="Documents Uploaded"
      description="Required admission documents were uploaded."
      date="August 1, 2026"
      completed
    />

    <TimelineItem
      title="Application Under Review"
      description="Application was opened for administrative review."
      date="August 2, 2026"
      completed
    />

    <TimelineItem
      title="Application Decision"
      description="Waiting for administrator approval or rejection."
      date="Pending"
      completed={false}
      last
    />

  </div>

</section>


      {/* Review Section */}

      <section className="rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Review Application
        </h2>


        {/* Admin Comments */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-medium">
            Admin Comments
          </label>

          <textarea
            value={adminComments}
            onChange={(e) =>
              setAdminComments(e.target.value)
            }
            placeholder="Add comments about this application..."
            className="min-h-[120px] w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
          />

        </div>


        {/* Rejection Reason */}

        <div className="mb-6">

          <label className="mb-2 block text-sm font-medium">
            Rejection Reason
          </label>

          <textarea
            value={rejectionReason}
            onChange={(e) =>
              setRejectionReason(e.target.value)
            }
            placeholder="Required when rejecting an application..."
            className="min-h-[100px] w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
          />

        </div>


        {/* Buttons */}

        <div className="flex gap-4">

          <button
  disabled={reviewing !== null}
  onClick={() => reviewApplication("APPROVED")}
  className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
>
  {reviewing === "APPROVED"
    ? "Approving..."
    : "Approve Application"}
</button>


         <button
  disabled={reviewing !== null}
  onClick={() => reviewApplication("REJECTED")}
  className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50"
>
  {reviewing === "REJECTED"
    ? "Rejecting..."
    : "Reject Application"}
</button>

        </div>

      </section>

    </div>
  );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value || "—"}
      </p>
    </div>
  );
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
    PENDING:
      "bg-yellow-100 text-yellow-800",

    APPROVED:
      "bg-green-100 text-green-800",

    REJECTED:
      "bg-red-100 text-red-800",

    UNDER_REVIEW:
      "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}

function DocumentRow({
  name,
  type,
  status,
}: {
  name: string;
  type: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
          <span className="text-sm font-semibold text-slate-600">
            PDF
          </span>
        </div>

        <div>
          <p className="font-medium text-slate-900">
            {name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {type} document
          </p>
        </div>

      </div>


      <div className="flex items-center gap-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "VERIFIED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => alert(`Opening ${name}`)}
        >
          View
        </button>

      </div>

    </div>
  );
}

function TimelineItem({
  title,
  description,
  date,
  completed,
  last = false,
}: {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">

      {/* Timeline indicator */}

      <div className="flex flex-col items-center">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            completed
              ? "bg-slate-900 text-white"
              : "border-2 border-slate-300 bg-white text-slate-400"
          }`}
        >
          {completed ? "✓" : "•"}
        </div>

        {!last && (
          <div className="mt-2 h-10 w-px bg-slate-200" />
        )}

      </div>


      {/* Timeline content */}

      <div className="pb-4">

        <div className="flex items-center gap-3">

          <h3 className="font-medium text-slate-900">
            {title}
          </h3>

          <span className="text-xs text-slate-400">
            {date}
          </span>

        </div>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}