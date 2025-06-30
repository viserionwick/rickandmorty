"use client";

// Essentials
import Link from "next/link";
import clsx from "clsx";

// Models
import { Character as CharacterType } from "@/models/character";

const statusColors = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-400",
};

interface PROPS {
    className?: string;
    character: CharacterType;
}

const Character: React.FC<PROPS> = ({
    className,
    character
}) => {
    return (
        <Link
            className={clsx(
                "bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden flex flex-col",
                "hover:shadow-lg transition-shadow duration-300",
                className
            )}
            href={"/characters/" + character.id}
        >
            <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover"
                loading="lazy"
            />

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                    {character.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <span
                        className={clsx(
                            "inline-block w-3 h-3 rounded-full",
                            statusColors[character.status]
                        )}
                        title={character.status}
                    />
                    <span className="text-sm text-muted-foreground">
                        {character.status} - {character.species}
                    </span>
                </div>

                <div className="text-sm text-muted-foreground mb-1">
                    <strong>Gender:</strong> {character.gender}
                </div>

                <div className="text-sm text-muted-foreground mb-1 truncate" title={character.location.name}>
                    <strong>Location:</strong> {character.location.name}
                </div>

                <div className="text-sm text-muted-foreground truncate" title={character.origin.name}>
                    <strong>Origin:</strong> {character.origin.name}
                </div>
            </div>
        </Link>
    );
};

export default Character;
