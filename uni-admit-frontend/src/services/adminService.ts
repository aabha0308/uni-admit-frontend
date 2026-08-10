import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
    AnalyticsResponse,
    ApplicationDetailResponse,
    ApplicationResponse,
    StatusUpdateRequest,
} from "@/types";

class AdminService {
    /**
     * Get all applications
     * GET /admin/applications
     */
    async getApplications(): Promise<ApplicationResponse[]> {
        const { data } = await api.get<ApplicationResponse[]>(
            API_ENDPOINTS.ADMIN.APPLICATIONS
        );

        return data;
    }

    /**
     * Get application details
     * GET /admin/applications/{id}
     */
    async getApplicationDetails(
        applicationId: string
    ): Promise<ApplicationDetailResponse> {
        const { data } = await api.get<ApplicationDetailResponse>(
            API_ENDPOINTS.ADMIN.APPLICATION_DETAIL(applicationId)
        );

        return data;
    }

    /**
     * Review application
     * PATCH /admin/applications/{id}/review
     */
    async reviewApplication(
        applicationId: string,
        request: StatusUpdateRequest
    ): Promise<ApplicationResponse> {
        const { data } = await api.patch<ApplicationResponse>(
            API_ENDPOINTS.ADMIN.REVIEW_APPLICATION(applicationId),
            request
        );

        return data;
    }

    /**
     * Get analytics
     * GET /admin/analytics
     */
    async getAnalytics(): Promise<AnalyticsResponse> {
        const { data } = await api.get<AnalyticsResponse>(
            API_ENDPOINTS.ADMIN.ANALYTICS
        );

        return data;
    }
}

export const adminService = new AdminService();