## 🐉 Rick and Morty

...

**🌐 [Live Demo](https://rickandmorty-iota-two.vercel.app)**

## 🧱 Built With

This project was built using these technologies:

- **Next.js** (with app folder routing)
- **TypeScript** (for type safe development)
- **TanStack/Query** (for queries)
- **Shadcn** (for custom components)
- **Tailwind** (for custom styling)

## ⚡ TanStack Query Usage

This project uses `@tanstack/react-query` for managing server state, specifically for fetching the list of characters.

### Query Hook (`useCharactersQuery.ts`)

This custom hook (`src/hooks/useCharactersQuery.ts`) abstracts the logic for fetching a paginated and filterable list of characters. It is built on top of TanStack Query's `useQuery` hook.

```ts
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
```

## 🔍 Filters & Pagination
The application allows users to filter the list of characters by status and gender, and to navigate through paginated results. Both features leverage the `nuqs` library to synchronize state with the URL query string.

### URL State Management with `nuqs`

We use the `useQueryState` hook from `nuqs` to bind React state for filters and pagination to URL search parameters. This approach has several advantages:
- **Shareable URLs**: The current filter and page state is reflected in the URL, making it easy to share or bookmark filtered views.
- **Browser History**: Users can use the browser's back and forward buttons to navigate through filter and page changes.
- **Decoupled State**: The state is decoupled from component hierarchy and managed by the URL, simplifying state management.

### Filters Component (`filterBar.tsx`)

The `FilterBar` component (`src/components/pages/filterBar.tsx`) uses `useQueryState` to manage the `status` and `gender` search parameters:

```ts
...
const FilterBar: React.FC<PROPS> = ({
  className
}) => {
  const [status, setStatus] = useQueryState("status", { shallow: false });
  const [gender, setGender] = useQueryState("gender", { shallow: false });
  ...
  return (
    ...
    <Select
        value={status || "all"}
        onValueChange={(val) => setStatus(val === "all" ? null : val || null)}
    >
    ...
    <Select
        value={gender || "all"}
        onValueChange={(val) => setGender(val === "all" ? null : val || null)}
    >
    ...
}
```

### Pagination Component (`pagination.tsx`)
```ts
...
const Pagination: React.FC<PROPS> = ({
  className,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className={clsx("flex items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
...
```

## 💾 Caching

This project leverages React's `cache` function to optimize data fetching on the server. By wrapping our data fetching functions, such as `fetchCharacters` in `src/lib/api/fetchCharacters.ts` and `fetchCharacterById` in `src/lib/api/fetchCharacterById.ts`, we can deduplicate requests within a single server-render pass.

### How It Works

When a component tree is rendered on the server, multiple components might request the same data. Without caching, this would result in multiple identical API calls to the Rick and Morty API.

By using `import { cache } from "react";`, we ensure that if the same function is called with the same arguments during a single render, the function is only executed once. Subsequent calls will receive the cached result, saving valuable server resources and reducing latency by avoiding redundant network requests.

**Example from `src/lib/api/fetchCharacterById.ts`:**
```ts
export const fetchCharacterById = cache(async (id: string): Promise<Character> => {
    ...
}
```

## 🚀 SEO

Each server-side page in this project uses Next.js's `generateMetadata` function for SEO. Inside, we use a custom utility called `generateServerSEO` to standardize and enhance SEO metadata across the app.

### `generateServerSEO` Interface

```ts
interface GenerateServerSEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    route?: string;
    disableIndexing?: boolean;
}
```

- **title**: Appended to the site name with a `|` prefix (e.g., `Rick and Morty | Page Title`).
- **description**: Used as the page meta description.
- **keywords**: Merged with global keywords for the page.
- **route**: Used to set the canonical URL and enable indexing. If not provided, indexing is turned off for the page.
- **disableIndexing**: If true, prevents the page from being indexed by search engines.

This approach ensures consistent, customizable SEO metadata for all server-rendered pages.

**Example: `/src/app/characters/page.tsx`**
```ts
export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Characters",
    description: "All the Rick and Morty characters.",
    route: "/characters"
  });
}
```

**Example: `/src/app/characters/[id]/page.tsx`**

For dynamic pages, data can be fetched directly within `generateMetadata` to create page-specific SEO content. This is demonstrated in the character details page, where an API call is made to retrieve the character's name for the page title.

**Example: `/src/app/characters/page.tsx`**
```ts
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
```


## 📁 Folder Structure
By making the best out of what **NextJS App Router** can offer from `Server` and `Client` side rendering I was able to implement **SEO** and any other server side render before rendering client side for each page.


```
.
├── 📁src
.   ├── 📁app
    .   ├── 📁page-name		# Each page has a folder.
        .   ├── page.tsx	# Server side rendered file.
            ├── content.tsx	# Client side rendered file.
            .
```

## 🖥️ How to run this project on your computer
To get this project up and running on your local machine, follow these steps:

1. **Prerequisites**:
   Ensure you have the following installed on your computer:
   - **Node.js** (version 14.x or later) – [Download Node.js](https://nodejs.org/)
   - **Git** – [Download Git](https://git-scm.com/)

2. **Clone the Repository**:
   Open your terminal or command prompt and run the following command to clone the repository to the folder that you're currently in:
   ```bash
   git clone https://github.com/viserionwick/rickandmorty.git
   ```
3. **Navigate to the Project Directory:** Change to the project directory using:
   ```bash
   cd rickandmorty
   ```
4. **Install Dependencies:** Install the required dependencies using your preferred package manager:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
5. **Run the Development Server:** Start the development server with:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
6. **Open the Application:** Once the server is running, open your web browser and go to: [http://localhost:3000](http://localhost:3000)