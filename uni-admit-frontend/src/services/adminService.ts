import api from "@/lib/axios";

import {
  ApplicationResponse,
  ApplicationDetailResponse,
  AnalyticsResponse,
  StatusUpdateRequest,
} from "@/types";

const BASE = "/admin";

export const adminService = {

  getApplications: async (): Promise<ApplicationResponse[]> => {
    const response = await api.get<ApplicationResponse[]>(
      `${BASE}/applications`
    );

    return response.data;
  },

  getApplicationDetails: async (
    id: string
  ): Promise<ApplicationDetailResponse> => {

    const response =
      await api.get<ApplicationDetailResponse>(
        `${BASE}/applications/${id}`
      );

    return response.data;
  },

  reviewApplication: async (
    id: string,
    payload: StatusUpdateRequest
  ): Promise<ApplicationResponse> => {

    const response =
      await api.patch<ApplicationResponse>(
        `${BASE}/applications/${id}/review`,
        payload
      );

    return response.data;
  },

  getAnalytics: async (): Promise<AnalyticsResponse> => {

    const response =
      await api.get<AnalyticsResponse>(
        `${BASE}/analytics`
      );

    return response.data;
  },
};