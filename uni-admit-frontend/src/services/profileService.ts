import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
    ProfileRequest,
    ProfileResponse,
} from "@/types";

const profileService = {
    /**
     * Create Student Profile
     * POST /profile
     */
    async createProfile(
        request: ProfileRequest
    ): Promise<ProfileResponse> {
        const { data } = await api.post<ProfileResponse>(
            API_ENDPOINTS.PROFILE.CREATE,
            request
        );

        return data;
    },

    /**
     * Get Logged-in Student Profile
     * GET /profile/me
     */
    async getMyProfile(): Promise<ProfileResponse> {
        const { data } = await api.get<ProfileResponse>(
            API_ENDPOINTS.PROFILE.GET_ME
        );

        return data;
    },

    /**
     * Get Profile By Profile ID
     * GET /profile/{profileId}
     */
    async getProfileById(
        profileId: string
    ): Promise<ProfileResponse> {
        const { data } = await api.get<ProfileResponse>(
            API_ENDPOINTS.PROFILE.GET_BY_ID(profileId)
        );

        return data;
    },

    /**
     * Update Logged-in Student Profile
     * PUT /profile/me
     */
    async updateProfile(
        request: ProfileRequest
    ): Promise<ProfileResponse> {
        const { data } = await api.put<ProfileResponse>(
            API_ENDPOINTS.PROFILE.UPDATE_ME,
            request
        );

        return data;
    },
};

export default profileService;