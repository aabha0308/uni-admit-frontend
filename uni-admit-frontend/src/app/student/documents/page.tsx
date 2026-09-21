"use client";

import { useEffect, useState } from "react";
import {
    Folder,
    Upload,
    FileText,
    AlertCircle,
    Loader2,
    FileCheck,
    Trash2,
} from "lucide-react";

import {
    useDocumentStore,
} from "@/store/documentStore";

import {
    useApplicationStore,
} from "@/store/applicationStore";

import documentService from "@/services/documentService";

const DOCUMENT_TYPES = [
    {
        value: "TRANSCRIPT",
        label: "Academic Transcript",
    },
    {
        value: "ID_PROOF",
        label: "Passport / ID Proof",
    },
    {
        value: "CERTIFICATE",
        label: "Certificate",
    },
    {
        value: "PHOTO",
        label: "Photograph",
    },
    {
        value: "OTHER",
        label: "Other Support Document",
    },
];

function DocumentUpload({
                            applicationId,
                            onSuccess,
                        }: {
    applicationId: string;
    onSuccess: () => Promise<void> | void;
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState("TRANSCRIPT");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!applicationId) {
            setUploadError("Please select an application first.");
            return;
        }

        if (!selectedFile) {
            setUploadError("Please select a file.");
            return;
        }

        try {
            setUploading(true);
            setUploadError(null);

            await documentService.uploadDocument(
                applicationId,
                documentType,
                selectedFile
            );

            setSelectedFile(null);

            const fileInput = document.getElementById(
                "document-file"
            ) as HTMLInputElement | null;

            if (fileInput) {
                fileInput.value = "";
            }

            await onSuccess();
        } catch (error: any) {
            setUploadError(
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Failed to upload document. Please try again."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpload} className="space-y-5">
            <div>
                <label
                    htmlFor="document-type"
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                    Document Type
                </label>

                <select
                    id="document-type"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    disabled={uploading}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {DOCUMENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor="document-file"
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                    File
                </label>

                <input
                    id="document-file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    disabled={uploading}
                    onChange={(e) => {
                        setSelectedFile(e.target.files?.[0] || null);
                        setUploadError(null);
                    }}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-800 disabled:cursor-not-allowed"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                    Accepted formats: PDF, JPG, JPEG, PNG. Maximum size: 10 MB.
                </p>
            </div>

            {selectedFile && (
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <FileText className="h-5 w-5 shrink-0 text-slate-600" />

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            {selectedFile.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </div>
                </div>
            )}

            {uploadError && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{uploadError}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={!selectedFile || !applicationId || uploading}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                {uploading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload className="h-4 w-4" />
                        Upload Document
                    </>
                )}
            </button>
        </form>
    );
}

function DocumentList({
                          documents,
                          onDelete,
                      }: {
    documents: ReturnType<
        typeof useDocumentStore.getState
    >["documents"];
    onDelete: (documentId: string) => Promise<void>;
}) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    if (!documents || documents.length === 0) {
        return (
            <div className="py-10 text-center">
                <FileText className="mx-auto mb-3 h-9 w-9 text-slate-300" />

                <p className="text-sm font-medium text-slate-700">
                    No documents uploaded yet.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    Upload your required admission documents above.
                </p>
            </div>
        );
    }

    const handleDelete = async (documentId: string) => {
        try {
            setDeletingId(documentId);
            await onDelete(documentId);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="divide-y divide-slate-100">
            {documents.map((document) => (
                <div
                    key={document.id}
                    className="flex items-center justify-between gap-4 py-4"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                            <FileCheck className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {document.originalFileName}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                {document.documentType}
                                {document.fileSize
                                    ? ` • ${(document.fileSize / (1024 * 1024)).toFixed(2)} MB`
                                    : ""}
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {document.status}
                        </span>

                        <button
                            type="button"
                            disabled={deletingId === document.id}
                            onClick={() => handleDelete(document.id)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Delete document"
                        >
                            {deletingId === document.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function StudentDocumentsPage() {
    const {
        documents,
        fetchDocuments,
        loading,
        error,
    } = useDocumentStore();

    const {
        applications,
        fetchApplications,
        loading: applicationsLoading,
    } = useApplicationStore();

    const [selectedApplicationId, setSelectedApplicationId] =
        useState("");

    const [pageError, setPageError] = useState<string | null>(null);

    useEffect(() => {
        fetchApplications();
        fetchDocuments();
    }, [fetchApplications, fetchDocuments]);

    useEffect(() => {
        if (!selectedApplicationId && applications.length > 0) {
            setSelectedApplicationId(applications[0].id);
        }
    }, [applications, selectedApplicationId]);

    const handleDelete = async (documentId: string) => {
        try {
            setPageError(null);

            await documentService.deleteDocument(documentId);
            await fetchDocuments();
        } catch (error: any) {
            setPageError(
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Failed to delete document."
            );
        }
    };

    const selectedApplication = applications.find(
        (application) => application.id === selectedApplicationId
    );

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Document Management
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Upload and manage the documents required for your university
                    admission application.
                </p>
            </div>

            {/* Application Selection */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-900">
                        Select Application
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Documents are uploaded against a specific admission
                        application.
                    </p>
                </div>

                {applicationsLoading ? (
                    <div className="flex items-center gap-2 py-3 text-sm text-slate-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading applications...
                    </div>
                ) : applications.length === 0 ? (
                    <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        You need to have an application before uploading
                        documents.
                    </div>
                ) : (
                    <select
                        value={selectedApplicationId}
                        onChange={(e) =>
                            setSelectedApplicationId(e.target.value)
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-100"
                    >
                        {applications.map((application) => (
                            <option
                                key={application.id}
                                value={application.id}
                            >
                                {application.university} —{" "}
                                {application.courseName} —{" "}
                                {application.intakeYear}
                            </option>
                        ))}
                    </select>
                )}

                {selectedApplication && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Selected Application
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {selectedApplication.university}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                            {selectedApplication.courseName} •{" "}
                            {selectedApplication.intakeYear}
                        </p>
                    </div>
                )}
            </section>

            {/* Upload */}
            <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <Upload className="h-5 w-5 text-slate-700" />
                        Upload New Document
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Supported formats: PDF, JPG, JPEG and PNG.
                    </p>
                </div>

                {selectedApplicationId ? (
                    <DocumentUpload
                        applicationId={selectedApplicationId}
                        onSuccess={fetchDocuments}
                    />
                ) : (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                        Select an application above to upload a document.
                    </div>
                )}
            </section>

            {/* Documents */}
            <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <Folder className="h-5 w-5 text-slate-700" />
                        Uploaded Documents
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Documents uploaded to your account.
                    </p>
                </div>

                {pageError && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                        {pageError}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
                        <Loader2 className="h-5 w-5 animate-spin text-slate-700" />
                        Loading documents...
                    </div>
                ) : error ? (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                        {error}
                    </div>
                ) : (
                    <DocumentList
                        documents={documents}
                        onDelete={handleDelete}
                    />
                )}
            </section>
        </div>
    );
}