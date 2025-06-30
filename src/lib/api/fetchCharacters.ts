// Essentials
import { cache } from "react";
import axios from "axios";

// Models
import { Character } from "@/models/character";

export interface FetchCharactersResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

export interface FetchCharacterVariables {
    page?: number;
    status?: string;
    gender?: string;
}

const fetchCharacters = cache(async ({ page = 1, status, gender }: FetchCharacterVariables): Promise<FetchCharactersResponse> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);

    const { data } = await axios.get<FetchCharactersResponse>(`https://rickandmortyapi.com/api/character?${params.toString()}`);
    return data;
});

export default fetchCharacters;