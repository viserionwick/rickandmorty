"use client";

// Essentials
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app"

interface PROPS {
    children: ReactNode;
}

const LayoutClient: React.FC<PROPS> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                {children}
            </NuqsAdapter>
        </QueryClientProvider>
    );
}

export default LayoutClient;