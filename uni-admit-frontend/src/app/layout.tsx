import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Uni Admit — University Admission Portal",
    description: "Enterprise University Admission Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full bg-slate-50">
            <body
                className={`${geistSans.variable} ${geistMono.variable} h-full bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white`}
            >
                {children}
            </body>
        </html>
    );
}