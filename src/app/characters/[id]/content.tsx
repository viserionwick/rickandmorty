"use client"

// Essentials
import { NextPage } from "next";

// Models
import { Character } from "@/models/character";

interface PROPS {
    character: Character;
}

const CONTENT: NextPage<PROPS> = ({
    character
}) => {

    return (
        <div className="flex flex-col w-full max-w-6xl">
            {
                character.name
            }
        </div>
    );
}

export default CONTENT;