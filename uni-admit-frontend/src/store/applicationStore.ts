"use client";

import { create } from "zustand";

import { applicationService } from "@/services/applicationService";

import type {
    ApplicationRequest,
    ApplicationResponse,
} from "@/types/application";

interface ApplicationState {
    applications: ApplicationResponse[];
    selectedApplication: ApplicationResponse | null;

    loading: boolean;
    submitting: boolean;
    error: string | null;

    fetchApplications: () => Promise<void>;

    fetchApplicationById: (
        applicationId: string
    ) => Promise<void>;

    submitApplication: (
        request: ApplicationRequest
    ) => Promise<ApplicationResponse | null>;

    clearError: () => void;

    clearApplications: () => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
    applications: [],
    selectedApplication: null,

    loading: false,
    submitting: false,
    error: null,

    fetchApplications: async () => {
        try {
            set({
                loading: true,
                error: null,
            });

            const applications =
                await applicationService.getMyApplications();

            set({
                applications,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Unable to fetch applications.",
            });
        }
    },

    fetchApplicationById: async (applicationId) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const application =
                await applicationService.getApplicationById(
                    applicationId
                );

            set({
                selectedApplication: application,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Unable to fetch application.",
            });

            throw error;
        }
    },

    submitApplication: async (request) => {
        try {
            set({
                submitting: true,
                error: null,
            });

            const application =
                await applicationService.submitApplication(
                    request
                );

            set((state) => ({
                applications: [
                    application,
                    ...state.applications,
                ],
                submitting: false,
            }));

            return application;
        } catch (error: any) {
            set({
                submitting: false,
                error:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Unable to submit application.",
            });

            return null;
        }
    },

    clearError: () =>
        set({
            error: null,
        }),

    clearApplications: () =>
        set({
            applications: [],
            selectedApplication: null,
            loading: false,
            error: null,
        }),
}));