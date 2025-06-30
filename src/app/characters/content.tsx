"use client"

// Essentials
import { NextPage } from "next";
import { useQueryState } from "nuqs";

// Components
import FilterBar from "@/components/pages/filterBar";
import Pagination from "@/components/pages/pagination";

// Lib
import { useCharactersQuery } from "@/lib/useCharacterQuery";

const CONTENT: NextPage = () => {
    const [page, setPage] = useQueryState("page", { shallow: false });
    const [status] = useQueryState("status", { shallow: false });
    const [gender] = useQueryState("gender", { shallow: false });

    const pageNumber = page ? parseInt(page) : 1;

    const { data, isLoading, error } = useCharactersQuery({
        page: pageNumber,
        status: status || undefined,
        gender: gender || undefined,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error || !data) return <div>Error loading characters.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            <FilterBar />
            {data.results.map((char) => (
                <div key={char.id}>{char.id} | </div>
            ))}
            <Pagination
                currentPage={pageNumber}
                totalPages={data.info.pages}
                onPageChange={(newPage) => setPage(newPage === 1 ? null : String(newPage))}
            />
        </div>
    );
}

export default CONTENT;