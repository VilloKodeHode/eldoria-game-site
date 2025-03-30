"use client";

import { useState } from "react";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import shopData from "../potionShop/data/potionShopInfo.json";

export const TradeSection = ({ tradeItems, buySection = true }) => {
  const { buyItem, sellItem } = usePlayerInventory();
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setOpenDetailsId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="grid gap-8">
      <h2 className="text-6xl">{buySection ? "Buy" : "Sell"}</h2>

      {/* Use grid but make inner cards flexible height */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
        {tradeItems.length > 0 ? (
          tradeItems.map((item) => {
            const isOpen = openDetailsId === item._id;

            return (
              <div
                key={item._id}
                className="bg-obsidian-black/70 p-4 rounded-lg border-2 border-lunar-pearl/50 flex flex-col gap-4"
              >
                {/* Top: Header, Image, Stats */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <Image
                      src={item.src}
                      alt={`Picture of ${item.name}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-enchanted-gold">{item.name}</h3>
                      <p className="text-sm text-lunar-pearl">
                        Sell Value: {item.sellPrice ?? 0} gold
                      </p>
                      <p className="text-sm text-lunar-pearl">
                        <strong>Effect:</strong>{" "}
                        {item.potion?.effectCategory[0] ?? "N/A"} –{" "}
                        {item.potion?.affectedStat[0] ?? "N/A"} (+{item.potion?.effectAmount})
                      </p>
                      <p className="text-sm text-lunar-pearl">
                        <strong>Duration:</strong> {item.potion?.duration ?? "Unknown"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDetails(item._id)}
                    className="w-8 h-8 rounded-full border border-lunar-pearl/50 text-enchanted-gold font-bold hover:scale-105 transition cursor-pointer"
                    aria-label="Toggle Details"
                  >
                    {isOpen ? "–" : "+"}
                  </button>
                </div>

                {/* Expandable Description */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm italic text-lunar-pearl bg-obsidian-black/50 p-2 rounded">
                    {item.description ?? "No description available."}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  className="border-2 border-lunar-pearl/50 text-xl hover:scale-105 origin-center cursor-pointer select-none active:scale-95 p-2 text-enchanted-gold w-full"
                  onClick={async () => {
                    const sanityId = item._id;
                    const type = item.subCategory?.[0] ?? "potion";

                    if (buySection) {
                      try {
                        await fetch("/api/player/inventory", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            itemId: sanityId,
                            itemType: type,
                            amount: 1,
                          }),
                        });
                        buyItem(item._id, item.buyPrice, type);
                      } catch (err) {
                        console.error("Buy failed:", err);
                      }
                    } else {
                      try {
                        await fetch("/api/player/inventory/sell", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            itemId: sanityId,
                            amount: 1,
                            gold: item.sellPrice,
                          }),
                        });
                        sellItem(item._id, item.sellPrice);
                      } catch (err) {
                        console.error("Sell failed:", err);
                      }
                    }
                  }}
                >
                  {buySection
                    ? `Buy: ${item.buyPrice} gold`
                    : `Sell: ${item.sellPrice} gold`}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-2xl text-center text-lunar-pearl">
            {shopData.nothingToSell}
          </p>
        )}
      </div>
    </section>
  );
};
