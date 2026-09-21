import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";

import {
    AuthResponse,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
} from "@/types";

import {
    clearTokens,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from "@/lib/auth";

class AuthService {
    /**
     * Register a new student account
     * POST /auth/register
     */
    async register(request: RegisterRequest): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            request
        );

        // Store tokens if registration returns them.
        if (data.accessToken) {
            setAccessToken(data.accessToken);
        }

        if (data.refreshToken) {
            setRefreshToken(data.refreshToken);
        }

        return data;
    }

    /**
     * Login
     * POST /auth/login
     */
    async login(request: LoginRequest): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            request
        );

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        return data;
    }

    /**
     * Refresh JWT access token
     * POST /auth/refresh
     */
    async refresh(): Promise<AuthResponse> {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            throw new Error("Refresh token not found");
        }

        const request: RefreshRequest = {
            refreshToken,
        };

        const { data } = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REFRESH,
            request
        );

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        return data;
    }

    /**
     * Logout
     * POST /auth/logout
     */
    async logout(): Promise<void> {
        const refreshToken = getRefreshToken();

        try {
            if (refreshToken) {
                const request: RefreshRequest = {
                    refreshToken,
                };

                await api.post(
                    API_ENDPOINTS.AUTH.LOGOUT,
                    request
                );
            }
        } finally {
            clearTokens();
        }
    }

    /**
     * Verify whether a user exists
     * GET /auth/users/{userId}/exists
     */
    async userExists(userId: string): Promise<boolean> {
        const { data } = await api.get<boolean>(
            API_ENDPOINTS.AUTH.USER_EXISTS(userId)
        );

        return data;
    }
}

const authService = new AuthService();

export default authService;