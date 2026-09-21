import Link from "next/link";
import {
    GraduationCap,
    ArrowRight,
    ShieldCheck,
    UserCheck,
    FileText,
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
            {/* Navigation Bar */}
            <header className="border-b border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-slate-900 text-lg tracking-tight">
                            Uni Admit
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-5xl mx-auto px-6 py-20 text-center flex-1 flex flex-col items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm mb-6">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>University Admission System</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl">
                    Streamline Your University Admission Journey
                </h1>

                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                    Apply to degree programs, track status updates in real-time,
                    upload required documents, and manage your student profile
                    seamlessly.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/student"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-colors"
                    >
                        Go to Student Portal
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                        href="/login"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Quick Features */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full">
                    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <FileText className="h-8 w-8 text-indigo-600 mb-3" />
                        <h3 className="font-semibold text-slate-900">
                            Easy Applications
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Submit and track degree program applications with
                            automated workflow statuses.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <UserCheck className="h-8 w-8 text-indigo-600 mb-3" />
                        <h3 className="font-semibold text-slate-900">
                            Profile Management
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Keep your academic background, contact details, and
                            credentials up to date.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <ShieldCheck className="h-8 w-8 text-indigo-600 mb-3" />
                        <h3 className="font-semibold text-slate-900">
                            Document Uploads
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Securely attach required transcripts and identity
                            documents for review.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <p>
                        © {new Date().getFullYear()} Uni Admit Portal. All
                        rights reserved.
                    </p>
                    <p className="font-medium text-slate-700">
                        Enterprise Admission Portal
                    </p>
                </div>
            </footer>
        </div>
    );
}