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
      {/* Open Button */}
      <button
        className="fixed top-0 right-0 z-[100] p-4 text-5xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        📜
      </button>

      {/* Book-style Inventory UI */}
      {open && (
        <div className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-[90vh]">


            {/* Inventory Content Layer */}
            <div className="absolute inset-0 p-8 grid grid-cols-2 gap-8 z-10 text-lunar-pearl">
              {/* Left Page: Currency + Tabs */}
              <div className="flex flex-col justify-start">
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button
                    className="text-3xl hover:scale-110 transition"
                    onClick={() => setOpen(false)}
                  >
                    ❌
                  </button>
                </div>

                {/* Currency Info */}
                <div className="flex gap-8 text-lg font-semibold mb-4">
                  <p>Gold: {playerInventory.currency.gold} 🟡</p>
                  <p>Gems: {playerInventory.currency.gems} 💎</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-lunar-pearl/30 pb-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded text-sm border ${
                        activeTab === type
                          ? "bg-lunar-pearl text-obsidian-black font-semibold"
                          : "border-lunar-pearl/30 hover:bg-lunar-pearl/10"
                      }`}
                      onClick={() => setActiveTab(type === activeTab ? null : type)}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Page: Inventory Grid */}
              <div className="overflow-y-auto max-h-[75vh] pr-2">
                {(activeTab ? [activeTab] : types).map((type) => (
                  <div key={type} className="mb-6">
                    {!activeTab && (
                      <h3 className="text-xl font-semibold border-b border-lunar-pearl/30 mb-2">
                        {type.toUpperCase()}
                      </h3>
                    )}
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {groupedItems[type].map((item) => (
                        <li
                          key={item.sanityId}
                          className="flex flex-col items-center gap-1 bg-lunar-pearl/10 p-2 rounded-lg"
                        >
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
                            <p className="truncate w-20" title={item.name}>
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
          </div>
        </div>
      )}
    </>
  );
};
