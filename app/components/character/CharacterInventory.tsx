"use client";

import { figtree } from "@/app/fonts/fonts";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { useState } from "react";

export const CharacterInventory = () => {
  const { playerInventory } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="absolute cursor-pointer top-0 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}>
        📜
      </button>
      <div
        className={`${figtree.className} ${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-99 bg-potion-shop-obsidian-black text-potion-shop-lunar-pearl  grid gap-8 w-fit p-8 absolute right-0`}>
        <div>
          <h2>Gold: {playerInventory.currency.gold} 🪙</h2>
          <h2>Gems: {playerInventory.currency.gems} 💎</h2>
        </div>
        <div className="grid gap-8">
          {Object.entries(playerInventory.items).map(
            ([category, items]) =>
              items.length > 0 && (
                <div
                  className="grid"
                  key={category}>
                  <h3>{category.toUpperCase()}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id}>
                        {item.itemName} - {item.amount}x (Sell: {item.sellPrice}{" "}
                        Gold)
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
