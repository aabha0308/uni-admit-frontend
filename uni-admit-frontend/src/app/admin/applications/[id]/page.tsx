"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import documentService from "@/services/documentService";
import { adminService } from "@/services/adminService";
import {
  ApplicationDetailResponse,
  StatusUpdateRequest,
  DocumentResponse,
} from "@/types";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const applicationId = params.id as string;

  const [application, setApplication] =
    useState<ApplicationDetailResponse | null>(null);

    
    const [documents, setDocuments] = useState<DocumentResponse[]>([]);
    const [documentsLoading, setDocumentsLoading] = useState(true);
    const [documentsError, setDocumentsError] = useState("");

  const [loading, setLoading] = useState(true);

 const [reviewing, setReviewing] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [adminComments, setAdminComments] = useState("");

  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
  loadApplication();
  loadDocuments();
}, [applicationId]);

  const loadApplication = async () => {
  try {
    setLoading(true);
    setError("");

    const data =
      await adminService.getApplicationDetails(applicationId);

    setApplication(data);

    console.log("REAL APPLICATION FROM BACKEND:", data);

    setAdminComments(data.adminComments || "");
    setRejectionReason(data.rejectionReason || "");

  } catch (err) {
    console.error("Failed to load application:", err);
    setError("Failed to load application.");
  } finally {
    setLoading(false);
  }
};

const loadDocuments = async () => {
  try {
    setDocumentsLoading(true);
    setDocumentsError("");

    const data =
      await documentService.getDocumentsByApplication(applicationId);

    console.log("REAL DOCUMENTS FROM BACKEND:", data);

    setDocuments(data);
  } catch (err) {
    console.error("Failed to load documents:", err);
    setDocumentsError("Failed to load documents.");
  } finally {
    setDocumentsLoading(false);
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

    await adminService.reviewApplication(
      application.applicationId,
      payload
    );

    console.log("Review payload:", payload);

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
  value={application.submittedAt}
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

    {/* Documents */}

<section className="mb-6 rounded-xl bg-white p-6 shadow-sm">

  <div className="mb-5">
    <h2 className="text-xl font-semibold text-slate-900">
      Documents
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Documents submitted by the student.
    </p>
  </div>

  {documentsLoading ? (
    <div className="rounded-lg border border-slate-200 p-6 text-center">
      <p className="text-sm text-slate-500">
        Loading documents...
      </p>
    </div>
  ) : documentsError ? (
    <div className="rounded-lg border border-red-200 bg-red-50 p-5">
      <p className="text-sm text-red-600">
        {documentsError}
      </p>
    </div>
  ) : documents.length === 0 ? (
    <div className="rounded-lg border border-slate-200 p-6 text-center">
      <p className="text-sm text-slate-500">
        No documents have been uploaded for this application.
      </p>
    </div>
  ) : (
    <div className="space-y-3">
      {documents.map((document) => (
        <DocumentRow
          key={document.id}
          document={document}
        />
      ))}
    </div>
  )}

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

   <ApplicationTimeline
  application={application}
  documents={documents}
/>


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

<div className="flex flex-wrap gap-4">

  {/* SUBMITTED → UNDER_REVIEW */}
  {application.status === "SUBMITTED" && (
    <button
      disabled={reviewing !== null}
      onClick={() => reviewApplication("UNDER_REVIEW")}
      className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {reviewing === "UNDER_REVIEW"
        ? "Starting Review..."
        : "Start Review"}
    </button>
  )}

  {/* UNDER_REVIEW → ACCEPTED */}
  {application.status === "UNDER_REVIEW" && (
    <button
      disabled={reviewing !== null}
      onClick={() => reviewApplication("ACCEPTED")}
      className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
    >
      {reviewing === "ACCEPTED"
        ? "Approving..."
        : "Approve Application"}
    </button>
  )}

  {/* UNDER_REVIEW → REJECTED */}
  {application.status === "UNDER_REVIEW" && (
    <button
      disabled={reviewing !== null}
      onClick={() => reviewApplication("REJECTED")}
      className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50"
    >
      {reviewing === "REJECTED"
        ? "Rejecting..."
        : "Reject Application"}
    </button>
  )}

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
  SUBMITTED:
    "bg-yellow-100 text-yellow-800",

  PENDING:
    "bg-yellow-100 text-yellow-800",

  ACCEPTED:
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
  document,
}: {
  document: DocumentResponse;
}) {
  const handleView = () => {
    if (!document.downloadUrl) {
      alert("Download link is not available for this document.");
      return;
    }

    window.open(
      document.downloadUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const formattedDate = document.uploadedAt
    ? new Date(document.uploadedAt).toLocaleString()
    : "—";

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <span className="text-xs font-bold text-slate-600">
            {document.contentType === "application/pdf"
              ? "PDF"
              : "FILE"}
          </span>
        </div>

        <div>
          <p className="font-medium text-slate-900">
            {document.originalFileName}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {document.documentType}
            {" • "}
            {formatFileSize(document.fileSize)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Uploaded: {formattedDate}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            document.status === "VERIFIED"
              ? "bg-green-100 text-green-700"
              : document.status === "REJECTED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {document.status || "PENDING"}
        </span>

        <button
          type="button"
          onClick={handleView}
          disabled={!document.downloadUrl}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View
        </button>

      </div>

    </div>
  );
}

function formatFileSize(bytes: number) {
  if (!bytes) return "Unknown size";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ApplicationTimeline({
  application,
  documents,
}: {
  application: ApplicationDetailResponse;
  documents: DocumentResponse[];
}) {
  const status = application.status;

  const submitted = Boolean(application.submittedAt);

  const latestDocumentDate =
    documents.length > 0
      ? documents.reduce((latest, document) => {
          if (!latest) return document.uploadedAt;

          return new Date(document.uploadedAt).getTime() >
            new Date(latest).getTime()
            ? document.uploadedAt
            : latest;
        }, "")
      : "";

  const documentsUploaded = documents.length > 0;

  const underReview =
    status === "UNDER_REVIEW" ||
    status === "ACCEPTED" ||
    status === "REJECTED";

  const decisionMade =
    status === "ACCEPTED" ||
    status === "REJECTED";

  const timeline = [
    {
      title: "Application Submitted",
      description: submitted
        ? "Student submitted the admission application."
        : "Application has not been submitted yet.",
      date: application.submittedAt
        ? formatDate(application.submittedAt)
        : "Not available",
      completed: submitted,
    },

    {
      title: "Documents Uploaded",
      description: documentsUploaded
        ? `${documents.length} document${
            documents.length === 1 ? "" : "s"
          } uploaded by the student.`
        : "No documents have been uploaded yet.",
      date: latestDocumentDate
        ? formatDate(latestDocumentDate)
        : "Not available",
      completed: documentsUploaded,
    },

    {
      title: "Application Under Review",
      description: underReview
        ? "Application has entered the administrative review stage."
        : "Application has not entered review yet.",
      date: "Date not provided by backend",
      completed: underReview,
    },

    {
      title: "Application Decision",
      description:
        status === "ACCEPTED"
          ? "Application was accepted by the administrator."
          : status === "REJECTED"
            ? "Application was rejected by the administrator."
            : "Waiting for the administrator's decision.",
      date: decisionMade
  ? "Decision recorded"
  : "Pending",
      completed: decisionMade,
    },
  ];

  return (
    <div className="space-y-6">
      {timeline.map((item, index) => (
        <TimelineItem
          key={item.title}
          title={item.title}
          description={item.description}
          date={item.date}
          completed={item.completed}
          last={index === timeline.length - 1}
        />
      ))}
    </div>
  );
}

function formatDate(date: string) {
  if (!date) return "Not available";

  return new Date(date).toLocaleString();
}

function TimelineItem({
  title,
  description,
  date,
  completed,
  last,
}: {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  last: boolean;
}) {
  return (
    <div className="flex gap-4">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            completed
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {completed ? "✓" : "○"}
        </div>

        {!last && (
          <div
            className={`mt-2 h-full min-h-12 w-0.5 ${
              completed ? "bg-blue-300" : "bg-gray-200"
            }`}
          />
        )}
      </div>

      {/* Timeline content */}
      <div className="pb-6">
        <h3
          className={`font-semibold ${
            completed ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {date}
        </p>
      </div>
    </div>
  );
}