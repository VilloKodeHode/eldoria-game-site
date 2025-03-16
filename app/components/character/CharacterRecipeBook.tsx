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
        } transition duration-1000 z-99 text-potion-shop-lunar-pearl bg-potion-shop-obsidian-black flex flex-col gap-8 h-screen w-screen fixed top-0 right-0 p-8`}
      >
        <h4 className="text-4xl">Recipe Book (discovered recipes)</h4>
        <ul>
          {/* //TODO: continue here. Look at the issue that items that are added already from the start already have known recipes */}
          {playerInventory.items.potions
            .filter((item: InventoryItem) => item.knowRecipe)
            .map((item) => {
              console.log(item);
              return (
                <li key={item.id}>
                  <div className="flex flex-col gap-4">
                    <p>{item.name}</p>
                    <Image
                      className="object-cover"
                      src={item.src}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex gap-2">
                    <p>Recipe:</p>
                    {Object.entries(item.recipe?.ingredients as object).map(
                      ([ingredient, value]) => {
                        return (
                          value >= 1 && (
                            <div
                              className="flex gap-2"
                              key={ingredient + item.name}
                            >
                              <p>{ingredient}</p>
                              <p>{value}</p>
                            </div>
                          )
                        );
                      }
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
        <ul>
          {playerInventory.items.armour
            .filter((item: InventoryItem) => item.knowRecipe)
            .map((item) => {
              console.log(item);
              return (
                <li key={item.id}>
                  <div className="flex flex-col gap-4">
                    <p>{item.name}</p>
                    <Image
                      className="object-cover"
                      src={item.src}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex gap-2">
                    <p>Recipe:</p>
                    {Object.entries(item.recipe?.materials as object).map(
                      ([ingredient, value]) => {
                        return (
                          value >= 1 && (
                            <div
                              className="flex gap-2"
                              key={ingredient + item.name}
                            >
                              <p>{ingredient}</p>
                              <p>{value}</p>
                            </div>
                          )
                        );
                      }
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
