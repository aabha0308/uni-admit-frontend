"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
    LayoutDashboard,
    FileText,
    User,
    Folder,
    Activity,
    GraduationCap,
    LogOut
} from "lucide-react";

const navigationItems = [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "Applications", href: "/student/application", icon: FileText },
    { name: "Profile", href: "/student/profile", icon: User },
    { name: "Documents", href: "/student/documents", icon: Folder },
    { name: "Status", href: "/student/status", icon: Activity },
];

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const email = useAuthStore((state) => state.email);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const getInitial = (emailVal?: string | null) => {
        if (!emailVal) return "S";
        return emailVal.charAt(0).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Left Sidebar Shell */}
            <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0">
                <div>
                    {/* Brand Header */}
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 leading-tight">Uni Admit</h2>
                            <p className="text-xs text-slate-500">Student Portal</p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-4 space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                item.href === "/student"
                                    ? pathname === "/student"
                                    : pathname === item.href || pathname?.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                        isActive
                                            ? "bg-slate-900 text-white shadow-xs"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    }`}
                                >
                                    <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile Footer Badge */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {getInitial(email)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 truncate">
                                Student User
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                                {email || "student@uniadmit.com"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Log out"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-sm font-semibold text-slate-900">Portal Workspace</h1>
                        <p className="text-xs text-slate-500">Manage your university applications & profile</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>Student Account</span>
                        </div>
                    </div>
                </header>

                {/* Body Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}