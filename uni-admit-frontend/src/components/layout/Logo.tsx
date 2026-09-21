import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface LogoProps {
    className?: string;
    showText?: boolean;
    href?: string;
}

export default function Logo({
                                 className = "",
                                 showText = true,
                                 href = "/",
                             }: LogoProps) {
    const content = (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm shrink-0">
                <GraduationCap className="h-5 w-5" />
            </div>
            {showText && (
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                    Uni Admit
                </span>
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-flex items-center">
                {content}
            </Link>
        );
    }

    return content;
}