"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState } from "react";

export const CharacterInventory = () => {
  const { playerInventory, sellItem } = usePlayerInventory();
  const [open, setOpen] = useState(false);

  // Group by type (e.g., potion, weapon, etc.)
  const groupedItems = playerInventory.items.reduce<
    Record<string, typeof playerInventory.items>
  >((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <>
      <button
        className="fixed cursor-pointer top-0 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}>
        📜
      </button>

      <div
        className={`${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-99 bg-obsidian-black text-lunar-pearl grid gap-8 w-full h-full p-8 fixed top-0 right-0`}>
        <div>
          <h2>Gold: {playerInventory?.currency?.gold ?? 0} 🟡</h2>
          <h2>Gems: {playerInventory?.currency?.gems ?? 0} 💎</h2>
        </div>

        <div className="grid gap-8">
          {Object.entries(groupedItems).map(([type, items]) => (
            <div key={type}>
              <h3>{type.toUpperCase()}</h3>
              <ul className="grid gap-4">
                {items.map((item) => (
                  <li
                    key={item.sanityId}
                    className="flex items-center gap-2">
                    <div className="flex justify-end relative w-12 h-12">
                      <Image
                        className="w-full -z-10 h-full absolute top-0"
                        src={item.src ?? "/images/default.webp"}
                        alt={item.name ?? "Inventory item"}
                        width={50}
                        height={50}
                      />
                      <div className="bg-lunar-pearl rounded-full text-obsidian-black h-3.5 relative z-10 p-1 w-3.5">
                        <span className="text-sm absolute -translate-y-1/2 top-1/2">
                          {item.amount > 9 ? "9+" : item.amount}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs flex flex-col justify-center gap-2">
                      <span>{item.name ?? "Unnamed"}</span>
                      <button
                        className="cursor-pointer hover:scale-105 transition border-b-2 border-b-enchanted-gold"
                        onClick={() =>
                          sellItem(item.sanityId, item.sellPrice || 0)
                        }>
                        (Sell: {item.sellPrice ?? 0} Gold)
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
