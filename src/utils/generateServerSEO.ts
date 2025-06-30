// Essentials
import { Metadata } from "next";
import { headers } from "next/headers";

interface GenerateServerSEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    route?: string;
    disableIndexing?: boolean;
}

export async function generateServerSEO({
    title,
    description,
    keywords,
    route,
    disableIndexing
}: GenerateServerSEOProps): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const domain = `${protocol}://${host}`;
    const fullURL = domain + (route ?? "/");

    const pageKeywords = keywords ? (keywords || []) : [];
    const globalKeywords = ["Rick and Morty", "auth0"];

    const mergedKeywords = [...pageKeywords, ...globalKeywords];

    const generatedTitle = title
        ? "Rick and Morty | " + title
        : "Rick and Morty"

    return {
        title: generatedTitle || undefined,
        description: description || undefined,
        keywords: (mergedKeywords.length && mergedKeywords) || undefined,
        openGraph: {
            title: generatedTitle || undefined,
            description: description || undefined,
            url: domain,
            siteName: "Rick and Morty",
            type: "website",
        },
        robots: {
            index: (route && !disableIndexing) ? true : false,
            follow: (route && !disableIndexing) ? true : false,
        },
        alternates: {
            canonical: route ? fullURL : undefined,
        }
    };
}
