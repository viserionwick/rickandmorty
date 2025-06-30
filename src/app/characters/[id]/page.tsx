// Essentials
import { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import CONTENT from "./content";

// Lib
import fetchCharacterById from "@/lib/api/fetchCharacterById";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: Promise<PageProps["params"]> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const characterID = resolvedParams.id;

    const character = await fetchCharacterById(characterID);

    return await generateServerSEO({
      title: `${character.name}`,
      description: `Details for character ${character.name}`,
      route: `/characters/${character.id}`,
    });

  } catch {
    return await generateServerSEO({
      disableIndexing: true
    });
  }
}

const CHARACTER = async ({ params }: { params: Promise<PageProps["params"]> }) => {
  try {
    const resolvedParams = await params;
    const characterID = resolvedParams.id;

    const character = await fetchCharacterById(characterID);

    if (!character) {
      redirect("/characters");
    }

    return <CONTENT character={character} />;
  } catch (error) {
    redirect("/characters");
  }
};

export default CHARACTER;