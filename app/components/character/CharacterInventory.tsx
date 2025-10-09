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
  description?: string;
}

export const CharacterInventory = () => {
  const { playerInventory, removeItem } = usePlayerInventory();
  const [showBook, setShowBook] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [itemPageIndex, setItemPageIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const ITEMS_PER_PAGE = 18;

  const groupedItems = useMemo(() => {
    return playerInventory.items.reduce<Record<string, InventoryItem[]>>((acc, item) => {
      const type = item.type.toLowerCase();
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});
  }, [playerInventory]);

  const types = useMemo(() => Object.keys(groupedItems), [groupedItems]);

  const currentItems = useMemo(() => {
    if (!selectedType) return [];
    const items = groupedItems[selectedType] || [];
    const start = itemPageIndex * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [groupedItems, selectedType, itemPageIndex]);

  const totalPages = selectedType
    ? Math.ceil((groupedItems[selectedType]?.length || 0) / ITEMS_PER_PAGE)
    : 0;

  const getActionLabel = (type: string, name?: string) => {
    const lowerType = type.toLowerCase();
    const lowerName = name?.toLowerCase() ?? "";

    if (lowerType === "potion") return "Drink";
    if (
      lowerType === "ingredient" ||
      lowerType === "food" ||
      lowerName.includes("soup") ||
      lowerName.includes("tea") ||
      lowerName.includes("water")
    ) return "Eat";
    if (lowerType === "armor" || lowerType === "clothing") return "Equip";
    return "Use";
  };

  const bookPages: Page[] = [
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
            {types.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setItemPageIndex(0);
                }}
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
            ))}
          </div>
        </div>
      ),
    },
    {
      pageNumber: 4,
      content: (
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-2">
              <button
                disabled={itemPageIndex === 0}
                onClick={() => setItemPageIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1 rounded bg-white/10 text-sm hover:bg-white/20 disabled:opacity-30"
              >
                ◀ Prev
              </button>
              <button
                disabled={itemPageIndex >= totalPages - 1}
                onClick={() => setItemPageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
                className="px-3 py-1 rounded bg-white/10 text-sm hover:bg-white/20 disabled:opacity-30"
              >
                Next ▶
              </button>
            </div>
          </div>

          {selectedType && currentItems.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 auto-rows-fr gap-1">
              {currentItems.map((item) => (
                <SmallItemCard key={item.sanityId} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-sm text-black/50 italic">Select a category to view items.</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  const bookmarks: Bookmark[] = [
    { label: " 🧑", pageNumber: 1, color: "#ff9999" },
    { label: "🎒 ", pageNumber: 3, color: "#9999ff" },
  ];

  return (
    <>
      <div className="fixed top-0 right-0 z-[100] flex gap-2 p-4">
        <button
          className="cursor-pointer text-5xl hover:scale-110 transition-transform"
          onClick={() => setShowBook((prev) => !prev)}
        >
          {showBook ? "❌" : "📖"}
        </button>
      </div>

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
                if (page !== 4) {
                  setSelectedType(null);
                  setItemPageIndex(0);
                }
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

      {selectedItem && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 max-w-xs w-full text-center shadow-lg relative">
            <Image
              src={selectedItem.src ?? "/images/default.webp"}
              alt={selectedItem.name ?? "Item"}
              width={100}
              height={100}
              className="mx-auto rounded mb-2"
            />
            <h2 className="text-lg font-semibold mb-2">{selectedItem.name}</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                onClick={() => {
                  const action = getActionLabel(selectedItem.type, selectedItem.name).toLowerCase();
                  const confirmed = confirm(`Are you sure you want to ${action} the ${selectedItem.name}?`);
                  if (!confirmed) return;
                  removeItem(selectedItem.sanityId, selectedItem.type, 1);
                  alert(`You ${action}ed the ${selectedItem.name}.`);
                  setSelectedItem(null);
                }}
              >
                {getActionLabel(selectedItem.type, selectedItem.name)}
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 transition"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SmallItemCard = ({
  item,
  onClick,
}: {
  item: InventoryItem;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="relative flex flex-col items-center bg-white/5 border border-white/10 rounded-md p-1 hover:bg-white/10 transition overflow-hidden text-xs h-full group cursor-pointer"
  >
    <div className="relative w-full aspect-square mb-1 transform transition-transform duration-300 hover:scale-105">
      <Image
        src={item.src ?? "/images/default.webp"}
        alt={item.name ?? "Inventory item"}
        fill
        className="rounded object-cover"
      />
      {item.amount > 1 && (
        <div className="absolute bottom-1 right-1 bg-white text-black text-[0.55rem] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-black/20">
          {item.amount}
        </div>
      )}
    </div>

    <div className="w-full text-center px-0.5">
      <h3 className="font-medium text-[0.65rem] leading-tight break-words">{item.name}</h3>
      <div className="text-[0.55rem] text-white/60 capitalize">{item.type}</div>
    </div>
  </div>
);

export default CharacterInventory;
