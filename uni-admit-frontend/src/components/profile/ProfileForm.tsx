"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    User,
    Calendar,
    Phone,
    MapPin,
    GraduationCap,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Building2,
    Globe,
} from "lucide-react";

import { ProfileRequest } from "@/types";
import { profileSchema, ProfileFormData } from "@/validations/profileSchema";
import { useProfileStore } from "@/store/profileStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProfileForm() {
    const {
        profile,
        loading,
        error,
        createProfile,
        updateProfile,
        getMyProfile,
    } = useProfileStore();

    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            tenthPercentage: 0,
            twelfthPercentage: 0,
        },
    });

    useEffect(() => {
        async function loadProfile() {
            try {
                await getMyProfile();
            } catch {
                // Ignore if profile doesn't exist yet.
            }
        }

        loadProfile();
    }, [getMyProfile]);

    useEffect(() => {
        if (!profile) return;

        reset({
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            dateOfBirth: profile.dateOfBirth ?? "",
            phone: profile.phone ?? "",
            address: profile.address ?? "",
            city: profile.city ?? "",
            state: profile.state ?? "",
            country: profile.country ?? "",
            tenthPercentage: profile.tenthPercentage ?? 0,
            twelfthPercentage: profile.twelfthPercentage ?? 0,
        });
    }, [profile, reset]);

    async function onSubmit(data: ProfileFormData) {
        try {
            setSuccessMessage("");

            const payload: ProfileRequest = {
                ...data,
                tenthPercentage: Number(data.tenthPercentage),
                twelfthPercentage: Number(data.twelfthPercentage),
            };

            if (profile) {
                await updateProfile(payload);
                setSuccessMessage("Profile updated successfully.");
            } else {
                await createProfile(payload);
                setSuccessMessage("Profile created successfully.");
            }
        } catch {
            // Error is handled in profile store
        }
    }

    return (
        <Card className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs shrink-0">
                    <User className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Student Profile
                    </h2>
                    <p className="text-xs text-slate-500">
                        Complete your personal, contact, and academic details below.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-600" />
                        Personal Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                First Name
                            </label>
                            <input
                                {...register("firstName")}
                                placeholder="John"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                            />
                            {errors.firstName?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.firstName?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Last Name
                            </label>
                            <input
                                {...register("lastName")}
                                placeholder="Doe"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                            />
                            {errors.lastName?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.lastName?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Date of Birth
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="date"
                                    {...register("dateOfBirth")}
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 text-sm text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                                />
                            </div>
                            {errors.dateOfBirth?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.dateOfBirth?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    {...register("phone")}
                                    placeholder="+1 (555) 000-0000"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                                />
                            </div>
                            {errors.phone?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.phone?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Location & Address Section */}
                <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-600" />
                        Address & Location
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Residential Address
                            </label>
                            <textarea
                                {...register("address")}
                                rows={3}
                                placeholder="Street address, apartment, or suite number"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                            />
                            {errors.address?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.address?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                City
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    {...register("city")}
                                    placeholder="City name"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                                />
                            </div>
                            {errors.city?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.city?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                State / Province
                            </label>
                            <input
                                {...register("state")}
                                placeholder="State"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                            />
                            {errors.state?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.state?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Country
                            </label>
                            <div className="relative">
                                <Globe className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    {...register("country")}
                                    placeholder="Country"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                                />
                            </div>
                            {errors.country?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.country?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Academic Qualifications Section */}
                <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-slate-600" />
                        Academic Performance
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                10th Percentage (%)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("tenthPercentage")}
                                placeholder="e.g. 88.5"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                            />
                            {errors.tenthPercentage?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.tenthPercentage?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                12th Percentage (%)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("twelfthPercentage")}
                                placeholder="e.g. 91.2"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
                            />
                            {errors.twelfthPercentage?.message && (
                                <p className="mt-1 text-xs text-rose-600">
                                    {errors.twelfthPercentage?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 flex items-start gap-2.5 text-xs text-rose-700">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Banner */}
                {successMessage && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 flex items-center gap-2.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Form Action */}
                <div className="border-t border-slate-100 pt-6 flex justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-10 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                                <span>Saving...</span>
                            </>
                        ) : profile ? (
                            "Update Profile"
                        ) : (
                            "Create Profile"
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
}