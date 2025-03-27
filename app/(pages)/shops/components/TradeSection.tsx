import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import shopData from "../potionShop/data/potionShopInfo.json";

export const TradeSection = ({ tradeItems, buySection = true }) => {
  const { buyItem, sellItem } = usePlayerInventory();
console.log(tradeItems)
  return (
    <section className="grid gap-8">
      <h2 className="text-6xl">{buySection ? "Buy" : "Sell"}</h2>
      <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {tradeItems.length > 0 ? (
          tradeItems.map((item) => {
            // console.log("potion information: ",item.potion);
            return (
              
              <div
                className="bg-obsidian-black/70 h-44 grid grid-cols-[150px_1fr]"
                key={item.id + "shopSellingItem"}
              >
                <Image
                  className="h-full w-full object-cover"
                  src={item.src}
                  alt={`Picture of item you can ${
                    buySection ? "buy" : "sell"
                  }:  + ${item.name}`}
                  width={150}
                  height={150}
                />
                <div className="p-4 flex flex-col gap-1 justify-between">
                  <h3 className="text-2xl underline underline-offset-8">
                    {item.name}
                  </h3>
                  {/* {item.equippable?.slot ? (
                    <>
                      <p>Equippable</p>
                      <p>Slot: {item.equippable.slot}</p>
                    </>
                  ) : (
                    ""
                  )} */}
                  
                    {/* <p>Effect:{item.potion.effectCategory[0]} {item.potion.affectedStat[0]}</p> */}
                  
                   
                  
                  <button
                    className="border-2 border-lunar-pearl/50 text-xl hover:scale-105 origin-center cursor-pointer select-none active:scale-95 p-2 text-enchanted-gold"
                    onClick={async () => {
                      if (buySection) {
                        try {
                          await fetch("/api/player/inventory", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              itemId: item._id, // Sanity ID
                              itemType: item.subCategory?.[0] || "potion",
                              amount: 1,
                            }),
                          });
                          buyItem(item.id, item.subType); // update local store
                        } catch (err) {
                          console.error("Buy failed:", err);
                        }
                      } else {
                        try {
                          await fetch("/api/player/inventory/sell", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              itemId: item._id,
                              itemType: item.subCategory?.[0] || "potion",
                              amount: 1,
                              gold: item.sellPrice, // Pass gold gain to server
                            }),
                          });
                          sellItem(item.id, item.subType); // update local store
                        } catch (err) {
                          console.error("Sell failed:", err);
                        }
                      }
                    }}
                  >
                    {buySection
                      ? "Buy: " + item.buyPrice
                      : "Sell: " + item.sellPrice}{" "}
                    gold
                  </button>
                </div>
                {/* <div className="flex justify-center items-center p-4">
       
                </div> */}
              </div>
            );
          })
        ) : (
          <p className="text-2xl">{shopData.nothingToSell}</p>
        )}
      </div>
    </section>
  );
};
