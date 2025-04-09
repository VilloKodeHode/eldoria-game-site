import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { CharacterInventory } from "./components/character/CharacterInventory";
import { Astloch, Figtree } from "next/font/google";
import { Map } from "./components/map/Map";
import { CharacterRecipeBook } from "./components/character/CharacterRecipeBook";
import { DevCheats } from "./components/cheat/DevCheats";
// import { SanityLive } from "./lib/sanity/live";
import { getCharacter } from "./lib/mongoDB/getCharacter";
import { CreateCharacter } from "./components/character/CreateCharacter";
import { SanityDataLoader } from "./lib/sanity/SanityDataLoader";
import { PlayerInventoryLoader } from "./lib/mongoDB/PlayerInventoryLoader";
// import {
//   liveFetchAllIngredients,
//   liveFetchAllPotions,
// } from "./lib/sanity/live";
// import Image from "next/image";

export const figtree = Figtree({
  subsets: ["latin"],
});

export const astloch = Astloch({
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen text-lunar-pearl items-center py-16 flex flex-col px-2 md:px-8 lg:px-16">
      {children}
    </main>
  );
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const character = await getCharacter();


  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${figtree.className} bg-[#1f2326] antialiased overflow-x-hidden`}>
          <header className="flex z-999 absolute justify-start text-amber-50 items-center p-4 gap-4 h-16">
            <SanityDataLoader />
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <SignedIn>
            {character ? (
              <>
                <SanityDataLoader />
                <PlayerInventoryLoader />
                <DevCheats />
                <CharacterInventory />
                <CharacterRecipeBook />
                <Map />
                <MainLayout>
                  <>{children}</>
                  {/* <SanityLive /> */}
                </MainLayout>
              </>
            ) : (
              <MainLayout>
                <CreateCharacter />
              </MainLayout>
            )}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
