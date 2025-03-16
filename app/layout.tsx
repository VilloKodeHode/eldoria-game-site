import type { Metadata } from "next";
import "./globals.css";
import { CharacterInventory } from "./components/character/CharacterInventory";
import { Astloch, Figtree } from "next/font/google";
import { Map } from "./components/map/Map";
import { CharacterRecipeBook } from "./components/character/CharacterRecipeBook";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${astloch.className} bg-[#1f2326] antialiased overflow-x-hidden`}>
        <CharacterInventory />
        <CharacterRecipeBook/>
        <Map/>
        <main className="min-h-screen text-potion-shop-lunar-pearl items-center py-16 flex flex-col px-2 md:px-8 lg:px-16">
          {children}
        </main>
      </body>
    </html>
  );
}
