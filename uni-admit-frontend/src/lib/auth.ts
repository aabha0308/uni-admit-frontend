/**
 * ============================================================================
 * Uni Admit Frontend
 * Authentication Utilities
 * ============================================================================
 *
 * Handles JWT token storage and retrieval.
 * Mirrors backend JWT authentication flow.
 */

import { STORAGE_KEYS } from "./constants";

/* ==========================================================================
   ACCESS TOKEN
   ========================================================================== */

export const setAccessToken = (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const removeAccessToken = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/* ==========================================================================
   REFRESH TOKEN
   ========================================================================== */

export const setRefreshToken = (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
};

export const getRefreshToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const removeRefreshToken = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/* ==========================================================================
   TOKEN MANAGEMENT
   ========================================================================== */

export const saveTokens = (
    accessToken: string,
    refreshToken: string
): void => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
};

export const clearTokens = (): void => {
    removeAccessToken();
    removeRefreshToken();
};

export const isAuthenticated = (): boolean => {
    return !!getAccessToken();
};

export const logout = (): void => {
    clearTokens();
};