"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState, useMemo } from "react";
import Book, { Page, Bookmark } from "./components/Book";

// 🧩 Item Type
interface InventoryItem {
  sanityId: string;
  src?: string;
  name?: string;
  type: string;
  amount: number;
  sellPrice?: number;
}

export const CharacterInventory = () => {
  const { playerInventory } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Group and normalize item types (e.g., "Potion" → "potion")
  const groupedItems = useMemo(() => {
    return playerInventory.items.reduce<Record<string, InventoryItem[]>>((acc, item) => {
      const type = item.type.toLowerCase();
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});
  }, [playerInventory]);

  const types = useMemo(() => Object.keys(groupedItems), [groupedItems]);

  const bookPages: Page[] = useMemo(() => {
    const selectedItems = selectedType ? groupedItems[selectedType] ?? [] : [];

    const overviewPage: Page = {
      pageNumber: 1,
      content: (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Character Journal</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Wealth</h3>
            <p>Gold: {playerInventory.currency.gold} 🟡</p>
            <p>Gems: {playerInventory.currency.gems} 💎</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Collection Stats</h3>
            <p>Total Items: {playerInventory.items.length}</p>
            <p>Unique Categories: {types.length}</p>
          </div>
        </div>
      ),
    };

    const infoPage: Page = {
      pageNumber: 2,
      content: (
        <div className="p-8">
          <h2 className="text-2xl font-bold">Welcome to Your Inventory Book</h2>
          <p className="text-black/60 mt-2">Use the bookmarks or category buttons to browse items.</p>
        </div>
      ),
    };

    const inventoryPage: Page = {
      pageNumber: 3,
      content: (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Inventory</h2>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full transition font-semibold text-sm ${
                  selectedType === type
                    ? "bg-white text-black"
                    : "bg-white/10 hover:bg-white/20 text-black/80"
                }`}
              >
                {type}
              </button>
            ))}
            {selectedType && (
              <button
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Item List */}
          {selectedType ? (
            selectedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {selectedItems.map((item, index) => (
                  <ItemCard key={`${item.sanityId}-${index}`} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-black/50">No items in this category.</p>
            )
          ) : (
            <p className="text-black/40 italic">Select a category to view items.</p>
          )}
        </div>
      ),
    };

    return [overviewPage, infoPage, inventoryPage];
  }, [playerInventory, groupedItems, selectedType, types]);

  const bookmarks: Bookmark[] = [
    { label: "Overview", pageNumber: 1, color: "#ff9999" },
    { label: "Items", pageNumber: 3, color: "#99ff99" },
  ];

  const toggleBook = () => {
    setShowBook((prev) => !prev);
    if (!showBook) setOpen(false);
  };

  const togglePanel = () => {
    setOpen((prev) => !prev);
    if (!open) setShowBook(false);
  };

  return (
    <>
      <div className="fixed top-0 right-0 z-[100] flex gap-2 p-4">
        <button
          className="cursor-pointer text-5xl hover:scale-110 transition-transform"
          onClick={togglePanel}
        >
          {open ? "❌" : "📜"}
        </button>
        <button
          className="cursor-pointer text-5xl hover:scale-110 transition-transform"
          onClick={toggleBook}
        >
          {showBook ? "❌" : "📖"}
        </button>
      </div>

      <div
        className={`${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-50 bg-obsidian-black text-lunar-pearl w-full h-full fixed top-0 right-0 p-4 md:p-8 overflow-hidden`}
      />

      {showBook && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-full max-h-[90vh]">
            <Book
              title="Inventory Journal"
              author="Adventurer's Log"
              pages={bookPages}
              bookmarks={bookmarks}
              width={1000}
              height={650}
            />
            <button
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setShowBook(false)}
            >
              Close Book
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// 🔹 Compact & Visible ItemCard
const ItemCard = ({ item }: { item: InventoryItem }) => (
  <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-md p-3 shadow-sm hover:bg-white/20 transition duration-200">
    <div className="relative w-10 h-10 flex-shrink-0">
      <Image
        src={item.src ?? "/images/default.webp"}
        alt={item.name ?? "Inventory item"}
        width={40}
        height={40}
        className="rounded object-cover w-full h-full"
      />
      {item.amount > 1 && (
        <div className="absolute bottom-0 right-0 bg-lunar-pearl text-obsidian-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-black/20 shadow-sm">
          {item.amount}
        </div>
      )}
    </div>
    <div className="flex flex-col justify-center text-sm leading-tight min-w-0">
      <p
        className="font-semibold text-gray-100 truncate whitespace-nowrap overflow-hidden max-w-[140px]"
        title={item.name}
      >
        {item.name}
      </p>
      <p className="text-xs text-gray-400 capitalize">{item.type}</p>
      <p className="text-xs text-yellow-400 mt-[2px]">{item.sellPrice ?? 0} 🟡</p>
    </div>
  </div>
);

export default CharacterInventory;
