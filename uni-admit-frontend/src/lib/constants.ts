/**
 * ============================================================================
 * Uni Admit Frontend
 * Application Constants
 * ============================================================================
 */

/* ==========================================================================
   USER ROLES
   ========================================================================== */

export const ROLES = {
    STUDENT: "ROLE_STUDENT",
    ADMIN: "ROLE_ADMIN",
} as const;

/* ==========================================================================
   LOCAL STORAGE KEYS
   ========================================================================== */

export const STORAGE_KEYS = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
} as const;

/* ==========================================================================
   API ENDPOINTS
   ========================================================================== */

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/logout",

        USER_EXISTS: (userId: string) =>
            `/auth/users/${userId}/exists`,
    },

    PROFILE: {
        CREATE: "/profile",
        GET_ME: "/profile/me",
        UPDATE_ME: "/profile/me",

        GET_BY_ID: (profileId: string) =>
            `/profile/${profileId}`,
    },

    ADMISSION: {
        SUBMIT: "/application",
        GET_ALL: "/application",
        GET_MY: "/application/my",

        GET_BY_ID: (applicationId: string) =>
            `/application/${applicationId}`,

        UPDATE_STATUS: (applicationId: string) =>
            `/application/${applicationId}/status`,
    },

    DOCUMENT: {
        UPLOAD: "/docs/upload",
        GET_MY: "/docs/my",

        GET_BY_ID: (documentId: string) =>
            `/docs/${documentId}`,

        GET_BY_APPLICATION: (applicationId: string) =>
            `/docs/application/${applicationId}`,

        DELETE: (documentId: string) =>
            `/docs/${documentId}`,
    },

    ADMIN: {
        TEST: "/admin/test",
        APPLICATIONS: "/admin/applications",

        APPLICATION_DETAIL: (applicationId: string) =>
            `/admin/applications/${applicationId}`,

        REVIEW_APPLICATION: (applicationId: string) =>
            `/admin/applications/${applicationId}/review`,

        ANALYTICS: "/admin/analytics",
    },
} as const;

/* ==========================================================================
   HTTP HEADERS
   ========================================================================== */

export const HEADERS = {
    AUTHORIZATION: "Authorization",
    BEARER_PREFIX: "Bearer ",
} as const;

/* ==========================================================================
   APPLICATION ENDPOINTS
   ========================================================================== */

export const APPLICATION_ENDPOINTS = {
    SUBMIT: "/application",

    MY_APPLICATIONS: "/application/my",

    BY_ID: (applicationId: string) =>
        `/application/${applicationId}`,
} as const;