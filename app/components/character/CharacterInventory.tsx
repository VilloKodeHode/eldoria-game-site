"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState, useMemo } from "react";
import Book, { Page, Bookmark } from "./components/Book";

interface InventoryItem {
  sanityId: string;
  src?: string;
  name?: string;
  type: string;
  amount: number;
  sellPrice?: number;
  description?: string; // ← Add this
}

export const CharacterInventory = () => {
  const { playerInventory } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // 3 columns × 4 rows = 12 items per page
  const ITEMS_PER_PAGE = 9;

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
    const fixedPages: Page[] = [
      {
        pageNumber: 1,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">Character Journal</h2>
            <div className="mb-4">
              <h3 className="text-md font-semibold">Wealth</h3>
              <p className="text-sm">Gold: {playerInventory.currency.gold} 🟡</p>
              <p className="text-sm">Gems: {playerInventory.currency.gems} 💎</p>
            </div>
            <div>
              <h3 className="text-md font-semibold">Collection Stats</h3>
              <p className="text-sm">Total Items: {playerInventory.items.length}</p>
              <p className="text-sm">Unique Categories: {types.length}</p>
            </div>
          </div>
        ),
      },
      {
        pageNumber: 2,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold">Welcome to Your Inventory Book</h2>
            <p className="text-black/60 text-sm mt-2">Select a category from the left page to view items.</p>
          </div>
        ),
      },
      {
        pageNumber: 3,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">Inventory Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
              types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-3 rounded-md transition-all font-medium text-sm text-left flex justify-between items-center ${
                    selectedType === type
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20 text-black/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {type === "potion" && <span>🧪</span>}
                    {type === "ingredient" && <span>🌿</span>}
                    <span className="capitalize">{type}</span>
                  </div>
                  <span className="text-xs opacity-70">{groupedItems[type].length} items</span>
                </button>
              ))
            }
            </div>
          </div>
        ),
      }
    ];

    if (selectedType) {
      const items = groupedItems[selectedType] || [];
      const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        const startIdx = pageNum * ITEMS_PER_PAGE;
        const pageItems = items.slice(startIdx, startIdx + ITEMS_PER_PAGE);

        fixedPages.push({
          pageNumber: fixedPages.length + 1,
          content: (
            <div className="p-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold capitalize">{selectedType}</h2>
                {totalPages > 1 && (
                  <span className="text-xs text-black/60">
                    Page {pageNum + 1} of {totalPages}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {pageItems.map((item) => (
                  <SmallItemCard key={`${item.sanityId}-${item.amount}`} item={item} />
                ))}
              </div>
            </div>
          ),
        });
      }

      if (items.length === 0) {
        fixedPages.push({
          pageNumber: fixedPages.length + 1,
          content: (
            <div className="p-6">
              <h2 className="text-xl font-bold capitalize mb-2">{selectedType}</h2>
              <p className="text-black/50 text-sm">No items in this category.</p>
            </div>
          ),
        });
      }
    }

    return fixedPages;
  }, [playerInventory, groupedItems, selectedType, types]);

  const bookmarks: Bookmark[] = [
    { label: "Overview", pageNumber: 1, color: "#ff9999" },
    { label: "Categories", pageNumber: 3, color: "#99ff99" },
  ];

  const toggleBook = () => {
    setShowBook((prev) => !prev);
    if (!showBook) setOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 right-0 z-[100] flex gap-2 p-4">
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
              onPageChange={(page) => {
                if (page === 3) setSelectedType(null);
              }}
            />
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
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

const SmallItemCard = ({ item }: { item: InventoryItem }) => (
  <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-md p-1.5 hover:bg-white/10 transition overflow-hidden">
    <div className="relative aspect-square w-25 mb-1">
      <Image
        src={item.src ?? "/images/default.webp"}
        alt={item.name ?? "Inventory item"}
        fill
        className="rounded object-cover"
      />
      {item.amount > 1 && (
        <div className="absolute bottom-0 right-0 bg-white text-black text-[0.55rem] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center border border-black/20">
          {item.amount}
        </div>
      )}
    </div>
    <div className="mt-auto">
      <h3 className="font-medium text-[0.7rem] truncate w-full block max-w-full">{item.name}</h3>
      <div className="flex justify-between items-center mt-0.5">
        <span className="text-[0.55rem] text-white/60 capitalize">{item.type}</span>
        {/* <span className="text-[0.55rem] font-medium text-yellow-400">
          {item.sellPrice ?? 0} 🟡
        </span> */}
      </div>
    </div>
  </div>
);


export default CharacterInventory;