"use client";

import {
//   addItemToInventory,
  usePlayerInventory,
} from "@/app/stores/inventory/inventoryStore";
import { useState } from "react";

export const DevCheats = () => {
  const { addGems, addGold } = usePlayerInventory();
//   const [itemId, setItemId] = useState("");
  const [open, setOpen] = useState(false);
  window.addEventListener("keydown", (e) => {
    if (e.key === "|") {
      setOpen(!open);
    //   if (open) {
    //     new Audio("/sounds/jalle-cheater.mp3").play()
    //   }
    }
  });
  return (
    <div
      className={`flex flex-col gap-4 absolute ${
        open ? "translate-y-0" : "-translate-y-full"
      } transition duration-1000 top-0 right-1/2 z-1000 p-8 bg-potion-shop-obsidian-black border-2 border-potion-shop-forest-emerald text-potion-shop-forest-emerald font-mono`}
    >
      <div className="flex gap-2">
        <button
          className="cursor-pointer border-2 border-potion-shop-forest-emerald w-32 self-center p-1"
          onClick={() => addGold(1000)}
        >
          add 1000 gold
        </button>
        <button
          className="cursor-pointer border-2 border-potion-shop-forest-emerald w-32 self-center p-1"
          onClick={() => addGems(100)}
        >
          add 100 gems
        </button>
      </div>
      {/* does not work yet, because item is not put in the correct spot in the inventory logic  */}
      {/* <div className="">
        <input
          className="text-potion-shop-lunar-pearl border-2 border-potion-shop-forest-emerald p-2"
          type="text"
          onChange={(e) => setItemId(e.target.value)}
        />
        <button onClick={() => addItemToInventory(itemId)}>add item</button>
      </div> */}
    </div>
  );
};
