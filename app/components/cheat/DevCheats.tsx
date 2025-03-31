"use client";

import { useState } from "react";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";

export const DevCheats = () => {
  const [open, setOpen] = useState(false);
  const ingredients = useSanityDataStore((state) => state.ingredients);

  const runDevCheats = async () => {
    try {
      const ingredientIds = ingredients.map((i) => i._id);
      const res = await fetch("/api/devcheats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientIds }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ DevCheats failed:", err);
      } else {
        console.log("✅ DevCheats applied!");
      }
    } catch (err) {
      console.error("❌ Failed to apply dev cheats:", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-forest-emerald text-obsidian-black text-lg font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Dev Cheats"
      >
        ?
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 bg-obsidian-black border border-forest-emerald text-forest-emerald p-6 rounded-xl shadow-2xl w-[320px] space-y-4 font-mono animate-fade-in">
          <h3 className="text-lg font-semibold text-center underline decoration-forest-emerald">
            Dev Cheats
          </h3>

          <button
            onClick={runDevCheats}
            className="w-full px-3 py-2 border border-forest-emerald rounded hover:bg-forest-emerald hover:text-obsidian-black transition"
          >
            🧪 +50 of all ingredients + 💰10,000 gold + 💎1,000 gems
          </button>
        </div>
      )}
    </>
  );
};
