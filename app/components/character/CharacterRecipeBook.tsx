"use client";

import { InventoryItem } from "@/app/interfaces/inventory";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState } from "react";

export const CharacterRecipeBook = () => {
  const { playerInventory } = usePlayerInventory();
  console.log(playerInventory);

  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed cursor-pointer top-36 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}
      >
        📔
      </button>
      <div
        className={` ${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-99 text-potion-shop-lunar-pearl bg-potion-shop-obsidian-black grid gap-8 h-screen w-screen fixed top-0 right-0 p-8`}
      >
        <ul>
            {/* //TODO: continue here. Look at the issue that items that are added already from the start already have known recipes */}
          {playerInventory.items.potions.map((item: InventoryItem) => {
            console.log(item)
            return item.knowRecipe === true
              ? Object.values(item).map((canCraft, value) => {
                //   console.log(canCraft); // log the canCraft value
                //   console.log(value);
                  return (
                    <p key={value + "canCraft"}>1</p>
                    //  <li key={canCraft + value + "canCraft"}>
                    //   <p>{canCraft}</p>
                    //   <p></p>
                    //   <Image src={canCraft.src} alt={canCraft.name} width={100} height={100} />
                    // </li>
                  );
                })
              : null;
          })}
        </ul>
      </div>
    </>
  );
};
