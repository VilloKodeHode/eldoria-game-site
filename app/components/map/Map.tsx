"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Map = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed cursor-pointer top-18 right-0 z-100 p-4 text-5xl"
        onClick={() => setOpen(!open)}
      >
        🧭
      </button>
      <div
        className={` ${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-1000 z-99 text-potion-shop-lunar-pearl bg-potion-shop-obsidian-black grid gap-8 h-screen w-screen fixed top-0 right-0`}
      >
        <div className="relative h-full w-full">
            <Image src="/images/maps/einswald/einswald-city-map.webp" alt="Map" width={1920} height={1024} className="object-cover absolute h-full w-full top-0 right-0" />
            <Link onClick={() => setOpen(false)} href="/shops/potionShop" className="absolute p-2 bg-potion-shop-lunar-pearl/80 border-2 border-potion-shop-enchanted-wood top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 text-potion-shop-obsidian-black text-2xl rounded-full text-bold">PotionShop</Link>
        </div>
      </div>
    </>
  );
};
