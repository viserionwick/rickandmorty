// Essentials
import { cache } from "react";
import axios from "axios";

// Models
import { Character } from "@/models/character";

export const fetchCharacterById = cache(async (id: string): Promise<Character> => {
  const { data } = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  return data;
});

export default fetchCharacterById;