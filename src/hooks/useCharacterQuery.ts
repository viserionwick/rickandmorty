// Essentials
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// Lib
import fetchCharacters, { FetchCharacterVariables } from "../lib/api/fetchCharacters";

export const useCharactersQuery = (variables: FetchCharacterVariables) => {
    return useQuery({
        queryKey: ["characters", variables],
        queryFn: () => fetchCharacters(variables),
        placeholderData: keepPreviousData,
    });
};