/**
 * ============================================================================
 * Uni Admit Frontend
 * Shared Type Definitions
 * ============================================================================
 *
 * Mirrors backend DTOs exactly.
 * Do not modify field names unless backend changes.
 */

/* ==========================================================================
   COMMON TYPES
   ========================================================================== */

/**
 * Universally Unique Identifier (UUID)
 */


export type UUID = string;

/**
 * ISO 8601 Date / Date-Time String
 * Examples:
 * - 2005-04-30
 * - 2026-07-28T10:30:00Z
 */
export type ISODateString = string;

/* ==========================================================================
   AUTH SERVICE DTOs
   ========================================================================== */

/**
 * Login Request
 * POST /auth/login
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Register Request
 * POST /auth/register
 */
export interface RegisterRequest {
    email: string;
    password: string;
}

/**
 * Refresh Token Request
 * POST /auth/refresh
 */
export interface RefreshRequest {
    refreshToken: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    role: string;
}

/* ==========================================================================
   PROFILE SERVICE DTOs
   ========================================================================== */

/**
 * Profile Request
 * Used for creating/updating a student profile.
 */
export interface ProfileRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: ISODateString;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    tenthPercentage: number;
    twelfthPercentage: number;
}

/**
 * Profile Response
 */
export interface ProfileResponse {
    id: UUID;
    userId: UUID;
    firstName: string;
    lastName: string;
    dateOfBirth: ISODateString;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    tenthPercentage: number;
    twelfthPercentage: number;
    status: string;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/* ==========================================================================
   ADMISSION SERVICE DTOs
   ========================================================================== */

/**
 * Application Request
 * Used to create a new admission application.
 */
export interface ApplicationRequest {
    profileId: UUID;
    courseName: string;
    university: string;
    intakeYear: number;
}

/**
 * Application Response
 */
export interface ApplicationResponse {
    id: UUID;
    studentId: UUID;
    profileId: UUID;
    courseName: string;
    university: string;
    intakeYear: number;
    status: string;
    rejectionReason: string;
    adminComments: string;
    submittedAt: ISODateString;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/* ==========================================================================
   DOCUMENT SERVICE DTOs
   ========================================================================== */

/**
 * Document Response
 * Returned after a successful documents upload or retrieval.
 */
export interface DocumentResponse {
    id: UUID;
    applicationId: UUID;
    studentId: UUID;
    originalFileName: string;
    contentType: string;
    fileSize: number;
    documentType: string;
    status: string;
    downloadUrl: string;
    uploadedAt: ISODateString;
}

/* ==========================================================================
   ADMIN SERVICE DTOs
   ========================================================================== */

/**
 * Analytics Response
 */
export interface AnalyticsResponse {
    totalApplications: number;
    applicationsByStatus: Record<string, number>;
    totalStudents: number;
}

/**
 * Aggregated Application Details
 */
export interface ApplicationDetailResponse {
    applicationId: UUID;
    courseName: string;
    university: string;
    intakeYear: number;
    status: string;
    rejectionReason: string;
    adminComments: string;
    submittedAt: ISODateString;

    studentFirstName: string;
    studentLastName: string;
    studentPhone: string;
    studentCity: string;
    tenthPercentage: number;
    twelfthPercentage: number;
}

/**
 * Status Update Request
 */
export interface StatusUpdateRequest {
    newStatus: string;
    reason: string;
    adminComments: string;
}

export * from './application';
