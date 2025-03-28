"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { useState } from "react";
import { ItemRecipes } from "./components/ItemRecipes";

export const CharacterRecipeBook = () => {
  const { playerInventory } = usePlayerInventory();
  // console.log(playerInventory);

  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed cursor-pointer top-36 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}>
        📔
      </button>
      <div
        className={` ${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-99 text-lunar-pearl bg-obsidian-black flex flex-col gap-8 h-screen w-screen fixed top-0 right-0 p-8`}>
        <h4 className="text-4xl">Recipe Book (discovered recipes)</h4>
        <ItemRecipes
          playerInventory={playerInventory}
          itemType="ingredients"
        />
        <ItemRecipes
          playerInventory={playerInventory}
          itemType="potions"
        />
        <ItemRecipes
          playerInventory={playerInventory}
          itemType="armour"
        />
        <ItemRecipes
          playerInventory={playerInventory}
          itemType="weapons"
        />
      </div>
    </>
  );
};
