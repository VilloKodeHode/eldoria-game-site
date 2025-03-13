import Link from "next/link";
import Image from "next/image";
import { astloch } from "./fonts/fonts";

export default function Home() {
  return (
    <>
      <section
        className={`flex flex-col items-center min-h-screen justify-center ${astloch.className} `}>
        <h1 className={`text-9xl`}>Eldoria game</h1>
        <Link
          className="h-32 w-32"
          href="/shops/potionShop">
          <Image
            className="w-full h-full bg-black/30"
            src="/images/potionShop/background/potion-shop.webp"
            width={1920}
            height={1080}
            alt="Potion Shop"
          />
        </Link>
        <span>Potion Shop</span>
      </section>
    </>
  );
}
// public\images\potionShop\background\potion-shop.webp
