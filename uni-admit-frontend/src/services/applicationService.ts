import api from "@/lib/axios";

import { APPLICATION_ENDPOINTS } from "@/lib/constants";

import type {
    ApplicationRequest,
    ApplicationResponse,
} from "@/types/application";

export const applicationService = {
    async getMyApplications(): Promise<ApplicationResponse[]> {
        const { data } =
            await api.get<ApplicationResponse[]>(
                APPLICATION_ENDPOINTS.MY_APPLICATIONS
            );

        return data;
    },

    async getApplicationById(
        applicationId: string
    ): Promise<ApplicationResponse> {
        const { data } =
            await api.get<ApplicationResponse>(
                APPLICATION_ENDPOINTS.BY_ID(applicationId)
            );

        return data;
    },

    async submitApplication(
        payload: ApplicationRequest
    ): Promise<ApplicationResponse> {
        const { data } =
            await api.post<ApplicationResponse>(
                APPLICATION_ENDPOINTS.SUBMIT,
                payload
            );

        return data;
    },
};