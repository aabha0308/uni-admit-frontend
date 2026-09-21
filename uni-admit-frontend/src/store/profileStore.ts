"use client";

import { create } from "zustand";

import profileService from "@/services/profileService";

import {
    ProfileRequest,
    ProfileResponse,
} from "@/types";

interface ProfileState {
    profile: ProfileResponse | null;
    loading: boolean;
    error: string | null;

    createProfile: (
        request: ProfileRequest
    ) => Promise<void>;

    getMyProfile: () => Promise<void>;

    updateProfile: (
        request: ProfileRequest
    ) => Promise<void>;

    clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    profile: null,
    loading: false,
    error: null,

    createProfile: async (request) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const profile =
                await profileService.createProfile(request);

            set({
                profile,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Unable to create profile.",
            });

            throw error;
        }
    },

    getMyProfile: async () => {
        try {
            set({
                loading: true,
                error: null,
            });

            const profile =
                await profileService.getMyProfile();

            set({
                profile,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Unable to fetch profile.",
            });

            throw error;
        }
    },

    updateProfile: async (request) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const profile =
                await profileService.updateProfile(request);

            set({
                profile,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Unable to update profile.",
            });

            throw error;
        }
    },

    clearProfile: () =>
        set({
            profile: null,
            loading: false,
            error: null,
        }),
}));