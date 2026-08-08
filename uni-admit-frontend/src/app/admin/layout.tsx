"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  GraduationCap,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: FileText,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Uni Admit
            </h1>

            <p className="text-xs text-slate-500">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
              <span className="text-sm font-semibold text-slate-700">
                A
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-900">
                Administrator
              </p>

              <p className="text-xs text-slate-500">
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="ml-64 min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Admin Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Manage the Uni Admit admission system
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                Administrator
              </p>

              <p className="text-xs text-slate-500">
                admin@uniadmit.com
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900">
              <span className="text-sm font-semibold text-white">
                A
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}