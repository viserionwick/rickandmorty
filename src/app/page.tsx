// Essentials
import { Metadata } from "next";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Dashboard",
    description: "Rick and Morty dashboard.",
    route: "/",
  });
}

const ROOT = async () => {
  return <CONTENT />
}

export default ROOT;