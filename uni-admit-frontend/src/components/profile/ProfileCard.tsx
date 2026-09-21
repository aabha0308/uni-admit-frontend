"use client";

import { ProfileResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    User,
    Calendar,
    Phone,
    MapPin,
    GraduationCap,
    Pencil,
    CheckCircle2,
    Building2,
    Globe,
} from "lucide-react";

interface ProfileCardProps {
    profile: ProfileResponse;
    onEdit: () => void;
}

export default function ProfileCard({ profile, onEdit }: ProfileCardProps) {
    return (
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 p-6 bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        {profile.firstName ? profile.firstName.charAt(0).toUpperCase() : <User className="h-6 w-6" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                {profile.firstName} {profile.lastName}
                            </h2>
                            {profile.status && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {profile.status}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Student Academic Profile
                        </p>
                    </div>
                </div>

                <Button
                    onClick={onEdit}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors self-start sm:self-auto"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit Profile
                </Button>
            </div>

            {/* Personal & Contact Details */}
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Personal & Contact Details
                </h3>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    <InfoItem
                        icon={Calendar}
                        label="Date of Birth"
                        value={profile.dateOfBirth || "Not provided"}
                    />
                    <InfoItem
                        icon={Phone}
                        label="Phone Number"
                        value={profile.phone || "Not provided"}
                    />
                    <InfoItem
                        icon={Building2}
                        label="City"
                        value={profile.city || "Not provided"}
                    />
                    <InfoItem
                        icon={MapPin}
                        label="State"
                        value={profile.state || "Not provided"}
                    />
                    <InfoItem
                        icon={Globe}
                        label="Country"
                        value={profile.country || "Not provided"}
                    />
                    <div className="sm:col-span-2 md:col-span-3">
                        <InfoItem
                            icon={MapPin}
                            label="Residential Address"
                            value={profile.address || "Not provided"}
                        />
                    </div>
                </div>
            </div>

            {/* Academic Information */}
            <div className="p-6 bg-slate-50/30">
                <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                        Academic Qualifications
                    </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                        <p className="text-xs font-semibold text-slate-500">
                            10th Secondary Percentage
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-indigo-600">
                            {profile.tenthPercentage != null ? `${profile.tenthPercentage}%` : "—"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                        <p className="text-xs font-semibold text-slate-500">
                            12th Senior Secondary Percentage
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-emerald-600">
                            {profile.twelfthPercentage != null ? `${profile.twelfthPercentage}%` : "—"}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

interface InfoItemProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">{value}</p>
            </div>
        </div>
    );
}