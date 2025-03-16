"use client";

import Image from "next/image";
import { ShopItem } from '../../../interfaces/inventory';

export const CraftSection = ({setIngredients, items }) => {

  const updateItemAmount = (id: string, change: number) => {
    setIngredients((prevInventory) =>
      prevInventory.map((item:ShopItem) =>
        item.id === id ? { ...item, amount: Math.max(0, item.amount + change) } : item
      )
    );
  };

  return (
    <>
      <section className="flex flex-wrap gap-16 justify-center">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`h-50 w-50 relative flex flex-col justify-between border-4 border-potion-shop-lunar-pearl/50 bg-potion-shop-lunar-pearl/20`}
            >
              <Image
                className="absolute top-0 left-0 -z-10"
                width={200}
                height={200}
                src={item.src}
                alt=""
              />
              <p className="text-center text-2xl text-potion-shop-enchanted-gold font-bold border-b-4 bg-potion-shop-obsidian-black/70 border-potion-shop-lunar-pearl/50">
                {item.name}
              </p>
              <div className="flex flex-col w-full justify-center">
                <div className="flex justify-between items-center border-t-4 text-center border-potion-shop-lunar-pearl/50 bg-potion-shop-obsidian-black/70">
                  <div className="border-r-4 flex-1/3 border-potion-shop-lunar-pearl/50">
                    <button
                      className="text-4xl active:scale-95 p-2 text-potion-shop-enchanted-gold"
                      onClick={() => updateItemAmount(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <span
                    className={`text-2xl flex-1/2 transition ${
                      item.amount > 0
                        ? "text-potion-shop-forest-emerald"
                        : "text-potion-shop-crimson-flame"
                    }`}
                  >
                    {item.amount}
                  </span>
                  <div className="border-l-4 border-potion-shop-lunar-pearl/50 flex-1/3">
                    <button
                      className="text-4xl p-2 active:scale-95 text-potion-shop-enchanted-gold"
                      onClick={() => updateItemAmount(item.id, -1)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
