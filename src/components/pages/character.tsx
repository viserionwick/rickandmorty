"use client";

// Essentials
import clsx from "clsx";

// Models
import { Character } from "@/models/character";

interface PROPS {
    className?: string;
    character: Character;
}

const Character: React.FC<PROPS> = ({
    className,
    character
}) => {
    return (
        <div className={clsx("flex items-center justify-center gap-2", className)}>
            {
                "ID: " + character.id
            }
        </div>
    );
};

export default Character;
