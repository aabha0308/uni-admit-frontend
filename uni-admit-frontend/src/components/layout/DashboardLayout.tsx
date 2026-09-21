"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    GraduationCap,
    LayoutDashboard,
    User,
    FileText,
    FolderCheck,
    BarChart3,
    LogOut,
    Menu,
    X,
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
    { label: "Status", href: "/student/status", icon: BarChart3 },
];

const adminNavItems: NavItem[] = [
    { label: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "Students", href: "/admin/students", icon: User },
];

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { role, logout } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = role === "ROLE_ADMIN" ? adminNavItems : studentNavItems;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo / Brand */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-slate-900 text-lg tracking-tight">
                                    Uni Admit
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                                            isActive
                                                ? "bg-slate-900 text-white shadow-sm"
                                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                aria-label="Toggle Menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                )}
            </header>

            {/* Main Content Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}