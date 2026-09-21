"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    User,
    FileText,
    FolderCheck,
    BarChart3,
    LogOut,
    ShieldCheck,
    GraduationCap,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const studentNavItems: NavItem[] = [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "Profile", href: "/student/profile", icon: User },
    { label: "Applications", href: "/student/application", icon: FileText },
    { label: "Documents", href: "/student/documents", icon: FolderCheck },
    { label: "Status Track", href: "/student/status", icon: BarChart3 },
];

const adminNavItems: NavItem[] = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "Students", href: "/admin/students", icon: User },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { role, email, logout } = useAuthStore();

    const isAdmin = role === "ROLE_ADMIN";
    const navItems = isAdmin ? adminNavItems : studentNavItems;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <aside className="w-64 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4">
            {/* Top Navigation Links */}
            <div className="space-y-6">
                {/* Brand / Role Indicator */}
                <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-slate-800" />
                        <span className="text-xs font-semibold text-slate-900">
                            {isAdmin ? "Admin Portal" : "Student Portal"}
                        </span>
                    </div>
                    {isAdmin && (
                        <ShieldCheck className="h-4 w-4 text-indigo-600" />
                    )}
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                                    isActive
                                        ? "bg-slate-900 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Footer User Info & Logout */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
                {email && (
                    <div className="px-3">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Signed in as
                        </p>
                        <p className="text-xs font-semibold text-slate-700 truncate">
                            {email}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}