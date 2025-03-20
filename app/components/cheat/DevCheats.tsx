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

  return (
    <>
    <button onClick={() => setOpen(!open)} className="bottom-0 right-0 fixed z-100 cursor-pointer text-sm p-2 hover:scale-150 text-forest-emerald">?</button>
    <div
      className={`flex flex-col gap-4 absolute ${
        open ? "translate-y-0" : "-translate-y-full"
      } transition duration-1000 top-0 right-1/2 z-1000 p-8 bg-obsidian-black border-2 border-forest-emerald text-forest-emerald font-mono`}
    >
      <div className="flex gap-2">
        <button
          className="cursor-pointer border-2 border-forest-emerald w-32 self-center p-1"
          onClick={() => addGold(1000)}
        >
          add 1000 gold
        </button>
        <button
          className="cursor-pointer border-2 border-forest-emerald w-32 self-center p-1"
          onClick={() => addGems(100)}
        >
          add 100 gems
        </button>
      </div>
      {/* does not work yet, because item is not put in the correct spot in the inventory logic  */}
      {/* <div className="">
        <input
          className="text-lunar-pearl border-2 border-forest-emerald p-2"
          type="text"
          onChange={(e) => setItemId(e.target.value)}
        />
        <button onClick={() => addItemToInventory(itemId)}>add item</button>
      </div> */}
    </div>
    </>
  );
};
