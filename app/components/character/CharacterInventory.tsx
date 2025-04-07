"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState } from "react";

export const CharacterInventory = () => {
  const { playerInventory } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const groupedItems = playerInventory.items.reduce<
    Record<string, typeof playerInventory.items>
  >((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const types = Object.keys(groupedItems);

  return (
    <>
      <button
        className="fixed cursor-pointer top-0 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}>
        {open ? "❌" : "📜"}
      </button>

      <div
        className={`${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-50 bg-obsidian-black text-lunar-pearl w-full h-full fixed top-0 right-0 p-4 md:p-8 overflow-hidden`}>
        {/* Sticky Header */}
        <div className="sticky top-0 bg-obsidian-black z-50 pb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg">
                Gold: {playerInventory.currency.gold} 🟡
              </h2>
              <h2 className="text-lg">
                Gems: {playerInventory.currency.gems} 💎
              </h2>
            </div>
            {/* <button
              className="text-3xl hover:scale-110 transition"
              onClick={() => setOpen(false)}
            >
              ❌
            </button> */}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-lunar-pearl/30 pb-2">
            {types.map((type) => (
              <button
                key={type}
                className={`px-3 py-1 rounded text-sm border ${
                  activeTab === type
                    ? "bg-lunar-pearl text-obsidian-black font-semibold"
                    : "border-lunar-pearl/30 hover:bg-lunar-pearl/10"
                }`}
                onClick={() => setActiveTab(type === activeTab ? null : type)}>
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(100vh-140px)] pr-2 mt-4 grid gap-8">
          {(activeTab ? [activeTab] : types).map((type) => (
            <div key={type}>
              {!activeTab && (
                <h3 className="text-xl font-semibold border-b border-lunar-pearl/30 mb-2">
                  {type.toUpperCase()}
                </h3>
              )}
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {groupedItems[type].map((item) => (
                  <li
                    key={item.sanityId}
                    className="flex flex-col items-center gap-1 bg-lunar-pearl/5 p-2 rounded-lg">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.src ?? "/images/default.webp"}
                        alt={item.name ?? "Inventory item"}
                        width={64}
                        height={64}
                        className="rounded object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 right-0 bg-lunar-pearl text-obsidian-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.amount > 99 ? "99+" : item.amount}
                      </div>
                    </div>
                    <div className="text-xs text-center mt-1">
                      <p
                        className="truncate w-20"
                        title={item.name}>
                        {item.name ?? "Unnamed"}
                      </p>
                      <p className="italic text-lunar-pearl/60 text-[10px]">
                        {item.sellPrice ?? 0} 🟡
                      </p>
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
