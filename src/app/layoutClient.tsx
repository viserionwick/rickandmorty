"use client";

// Essentials
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cn } from "@/lib/utils"; // Optional: Tailwind merge utility
import { buttonVariants } from "@/components/ui/button";

interface PROPS {
    children: ReactNode;
}

const LayoutClient: React.FC<PROPS> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Dashboard" },
        { href: "/characters", label: "Characters" },
    ];

    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                <div className="min-h-screen bg-background text-foreground flex flex-col">
                    <nav className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-border shadow-sm z-50">
                        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 sm:gap-4">
                            {
                                navItems.map(({ href, label }) => {
                                    const isActive = pathname === href;
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={cn(
                                                buttonVariants({ variant: isActive ? "default" : "ghost" }),
                                                "text-sm font-medium"
                                            )}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </nav>
                    <main className="flex justify-center px-4 mt-8">
                        {children}
                    </main>
                </div>
            </NuqsAdapter>
        </QueryClientProvider>
    );
}

export default LayoutClient;