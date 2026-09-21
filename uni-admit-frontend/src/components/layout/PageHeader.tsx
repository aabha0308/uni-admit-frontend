import React from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    badge?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function PageHeader({
                                       title,
                                       description,
                                       badge,
                                       children,
                                       className = "",
                                   }: PageHeaderProps) {
    return (
        <div
            className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 ${className}`}
        >
            <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        {title}
                    </h1>
                    {badge && (
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
                            {badge}
                        </span>
                    )}
                </div>
                {description && (
                    <p className="text-sm text-slate-600 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {children && (
                <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                    {children}
                </div>
            )}
        </div>
    );
}