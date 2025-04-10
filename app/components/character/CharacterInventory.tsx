"use client";

import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import { useState, useMemo } from "react";
import Book, { Page, Bookmark } from "./components/Book";

export const CharacterInventory = () => {
  const { playerInventory } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  const [showBook, setShowBook] = useState(false);

  // Group items by type (e.g. potions, ingredients, etc.)
  const groupedItems = useMemo(() => {
    return playerInventory.items.reduce<Record<string, typeof playerInventory.items>>((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [playerInventory]);

  const types = Object.keys(groupedItems);

  // Custom navigation event dispatcher
  const handleBookmarkClick = (pageNumber: number) => {
    const bookElement = document.querySelector(".bookContainer");
    if (bookElement) {
      const event = new CustomEvent("navigateToPage", {
        detail: { pageNumber },
      });
      bookElement.dispatchEvent(event);
    }
  };

  // All book pages
  const bookPages: Page[] = useMemo(() => {
    // Page 1 — Overview
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

    // Page 2 — Item category navigator
    const categoryNavPage: Page = {
      pageNumber: 2,
      content: (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Browse Item Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {types.map((type, index) => (
              <button
                key={type}
                onClick={() => handleBookmarkClick(index + 3)} // Pages start from 3
                className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition"
              >
                <span className="font-semibold">{type.toUpperCase()}</span>
                <p className="text-sm">{groupedItems[type].length} items</p>
              </button>
            ))}
          </div>
        </div>
      ),
    };

    // Pages 3+ — Per-category item pages
    const categoryPages: Page[] = types.map((type, i) => ({
      pageNumber: i + 3,
      content: (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">{type.toUpperCase()}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groupedItems[type].map((item) => (
              <div
                key={item.sanityId}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={item.src ?? "/images/default.webp"}
                    alt={item.name ?? "Inventory item"}
                    width={48}
                    height={48}
                    className="rounded object-cover w-full h-full"
                  />
                  {item.amount > 1 && (
                    <div className="absolute bottom-0 right-0 bg-lunar-pearl text-obsidian-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {item.amount}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-white/60">{item.type}</p>
                  <p className="text-sm">{item.sellPrice ?? 0} 🟡</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    }));

    return [overviewPage, categoryNavPage, ...categoryPages];
  }, [playerInventory, groupedItems, types]);

  // Bookmarks at the top of the book
  const bookmarks: Bookmark[] = [
    { label: "Character", pageNumber: 1, color: "#ff9999" },
    { label: "Items", pageNumber: 3, color: "#99ff99" }, // goes to category picker
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
      {/* Top-right buttons */}
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

      {/* Slide-in inventory panel */}
      <div
        className={`${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-50 bg-obsidian-black text-lunar-pearl w-full h-full fixed top-0 right-0 p-4 md:p-8 overflow-hidden`}
      >
        {/* Optional inventory panel content */}
      </div>

      {/* Book view */}
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
