// Essentials
import { Metadata } from "next";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Characters",
    description: "All the Rick and Morty characters.",
    route: "/characters"
  });
}

const CHARACTERS = async () => {
  return <CONTENT />
}

export default CHARACTERS;