export type ApplicationStatus =
    | "DRAFT"
    | "SUBMITTED"
    | "DOCUMENTS_PENDING"
    | "UNDER_REVIEW"
    | "ACCEPTED"
    | "REJECTED";

export interface ApplicationRequest {
    profileId: string;
    courseName: string;
    university: string;
    intakeYear: number;
}

export interface ApplicationResponse {
    id: string;
    studentId: string;
    profileId: string;

    courseName: string;
    university: string;
    intakeYear: number;

    status: ApplicationStatus;

    rejectionReason: string | null;
    adminComments: string | null;

    submittedAt: string | null;

    createdAt: string;
    updatedAt: string;
}

export interface ApiProblemDetail {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}