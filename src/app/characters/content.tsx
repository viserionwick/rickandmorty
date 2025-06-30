"use client"

// Essentials
import { NextPage } from "next";
import { useQueryState } from "nuqs";

// Components
import FilterBar from "@/components/pages/filterBar";
import Pagination from "@/components/pages/pagination";

// Lib
import { useCharactersQuery } from "@/lib/api/useCharacterQuery";
import Character from "@/components/pages/character";

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
        <div className="flex flex-col w-full max-w-6xl">
            <FilterBar />
            {
                data.results.map(character => (
                    <Character
                        key={character.id}
                        character={character}
                    />
                ))
            }
            <Pagination
                currentPage={pageNumber}
                totalPages={data.info.pages}
                onPageChange={(newPage) => setPage(newPage === 1 ? null : String(newPage))}
            />
        </div>
    );
}

export default CONTENT;