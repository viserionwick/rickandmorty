"use client"

// Essentials
import { NextPage } from "next";

// Models
import { Character } from "@/models/character";

interface PROPS {
    character: Character;
}

const CONTENT: NextPage<PROPS> = ({ character }) => {
    return (
        <main className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6">{character.name}</h1>

            <section className="flex flex-col md:flex-row gap-10">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full max-w-sm rounded-lg shadow-lg object-cover"
                />
                <div className="flex flex-col justify-start space-y-4 text-lg">
                    <div>
                        <span className="font-semibold">Status: </span>
                        <span
                            className={
                                character.status === "Alive"
                                    ? "text-green-600"
                                    : character.status === "Dead"
                                        ? "text-red-600"
                                        : "text-gray-500"
                            }
                        >
                            {character.status}
                        </span>
                    </div>

                    <div>
                        <span className="font-semibold">Species: </span>
                        {character.species}
                    </div>

                    {character.type && (
                        <div>
                            <span className="font-semibold">Type: </span>
                            {character.type}
                        </div>
                    )}

                    <div>
                        <span className="font-semibold">Gender: </span>
                        {character.gender}
                    </div>

                    <div>
                        <span className="font-semibold">Origin: </span>
                        {character.origin.name}
                    </div>

                    <div>
                        <span className="font-semibold">Last Known Location: </span>
                        {character.location.name}
                    </div>

                    <div>
                        <span className="font-semibold">Episodes Appeared: </span>
                        {character.episode.length}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CONTENT;
