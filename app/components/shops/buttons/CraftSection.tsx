"use client";

import { StoreItem } from "@/app/interfaces/shopTypes";
import { useShopStore } from "@/app/stores/shopStore/CraftingItemStore";
import Image from "next/image";

interface CraftSectionProps {
  items: StoreItem[];
}

export const CraftSection: React.FC<CraftSectionProps> = ({ items }) => {
  const { craftingItemData, increaseCraftingItemAmount, decreaseCraftingItemAmount } = useShopStore(items)();

  return (
    <>
      <div className="flex flex-wrap gap-16 justify-center">
        {
          craftingItemData.map((item) => {
            
            return (
              <div
                key={item.id}
                className={`h-50 w-50 relative flex flex-col justify-between bg-potion-shop-lunar-pearl-translucent`}
              >
                <Image
                  className="absolute top-0 left-0 -z-10"
                  width={200}
                  height={200}
                  src={item.src}
                  alt=""
                />
                <p>{item.name}</p>
                <div className="flex flex-col w-full justify-center">
                  <span className="">{item.amount}</span>
                  <div className="flex justify-between">
                    <button
                      className="text-2xl active:scale-95"
                      onClick={() => increaseCraftingItemAmount(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="text-2xl active:scale-95"
                      onClick={() => decreaseCraftingItemAmount(item.id)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
