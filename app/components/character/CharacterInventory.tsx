"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState } from "react";

export const CharacterInventory = () => {
  const { playerInventory, sellItem } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed cursor-pointer top-0 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}
      >
        📜
      </button>
      <div
        className={` ${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-99 bg-potion-shop-obsidian-black text-potion-shop-lunar-pearl  grid gap-8 w-fit p-8 fixed right-0`}
      >
        <div>
          <h2>Gold: {playerInventory.currency.gold} 🟡</h2>
          <h2>Gems: {playerInventory.currency.gems} 💎</h2>
        </div>
        <div className="grid gap-8">
          {Object.entries(playerInventory.items).map(
            ([category, items]) =>
              items.length > 0 && (
                <div className="grid" key={category}>
                  <h3>{category.toUpperCase()}</h3>
                  <ul className="grid gap-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-2">
                        <div className="flex justify-end relative w-12 h-12">
                        
                        <Image
                          className="w-full -z-10 h-full absolute top-0"
                          src={item.src}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <div className="bg-potion-shop-lunar-pearl rounded-full text-potion-shop-obsidian-black h-3.5 relative z-10 p-1 w-3.5">
                        <span className=" text-sm absolute -translate-y-1/2 top-1/2">{item.amount}</span>
                        </div>
                        </div>
                        <div className="text-xs flex flex-col justify-center gap-2">
                          <span>
                            {item.name}
                          </span>
                          <button className="cursor-pointer hover:scale-105 transition border-b-2 border-b-potion-shop-enchanted-gold" onClick={() => sellItem(item.id,
                            // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
                            category)}>
                              (Sell: {item.sellPrice} Gold)
                              </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};
