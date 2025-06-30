// Essentials
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
    image: string;
}

interface CharactersResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

interface Variables {
    page?: number;
    status?: string;
    gender?: string;
}

export const fetchCharacters = async ({ page = 1, status, gender }: Variables): Promise<CharactersResponse> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);

    const { data } = await axios.get<CharactersResponse>(`https://rickandmortyapi.com/api/character?${params.toString()}`);
    return data;
};

export const useCharactersQuery = (variables: Variables) => {
    return useQuery({
        queryKey: ["characters", variables],
        queryFn: () => fetchCharacters(variables),
        placeholderData: keepPreviousData,
    });
};