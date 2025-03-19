// import Link from "next/link";
// import Image from "next/image";

import Image from "next/image";
import { sanityFetch } from "./sanity/live";
import { allItems } from "./sanity/items";



export default async function Home() {
  const { data } = await sanityFetch({query: allItems});
  return (
    <>
      <section
        className={`flex flex-col items-center min-h-screen justify-center `}
      >
        {/* {loading && <span>Loading...</span>} */}

        <h1 className={`text-9xl`}>Eldoria game</h1>
        <div className="flex flex-wrap">
        {data?.map((item) => (
          <div className="" key={item._id}>
            <h2>{item.name}</h2>
            <Image src={item.imageUrl} alt={item.name} width={250} height={250} />
            {/* <p>Type: {item.itemType?.join(", ")}</p> */}
            {/* <p>Subtype: {item.subType?.join(", ")}</p> */}
            <p>Buy Price: {item.buyPrice}</p>
            <p>Sell Price: {item.sellPrice}</p>
          </div>
        ))}
        </div>
        {/* <Link
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
        <span>Potion Shop</span> */}
        <p>use the compass in the top left corner to check out locations!</p>
      </section>
    </>
  );
}
// public\images\potionShop\background\potion-shop.webp
