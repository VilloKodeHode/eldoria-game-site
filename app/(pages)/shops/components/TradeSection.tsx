import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import Image from "next/image";
import shopData from "../potionShop/data/potionShopInfo.json";

export const TradeSection = ({ tradeItems, buySection = true }) => {
  const { buyItem, sellItem } = usePlayerInventory();
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
                key={item._id + "shopSellingItem"}>
                <div className="group relative">
                  <Image
                    className="h-full w-full object-cover"
                    src={item.src}
                    alt={`Picture of item you can ${
                      buySection ? "buy" : "sell"
                    }:  + ${item.name}`}
                    width={150}
                    height={150}
                  />
                  <p className="opacity-0 text-sm p-2 overflow-y-scroll scrollbar font-shadow font-mono h-full bg-obsidian-black/50 top-0 group-hover:opacity-100 transition-opacity w-full absolute">
                    {item.description}
                  </p>
                </div>

                <div className="p-4 flex flex-col gap-1 justify-between">
                  <h3 className="text-xl underline underline-offset-8">
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

                  {["resistance"].includes(item.potion.effectCategory[0]) ? (
                    <>
                      <p>
                        Effect:{" "}
                        <span className="capitalize">
                          {item.potion.affectedStat[0]}
                        </span>{" "}
                        {item.potion.effectCategory[0].replace("_", " ")} (+
                        {item.potion.effectAmount})
                      </p>
                    </>
                  ) : ["acquire", "buff", "restore"].includes(
                      item.potion.effectCategory[0]
                    ) ? (
                    <p>
                      Effect:{" "}
                      <span className="capitalize">
                        {item.potion.effectCategory[0]}
                      </span>{" "}
                      {item.potion.affectedStat[0].replace("_", " ")} (+
                      {item.potion.effectAmount})
                    </p>
                  ) : (
                    <p></p>
                  )}
                  <p>
                    Duration:{" "}
                    <span className="capitalize">{item.potion.duration}</span>
                  </p>

                  <button
                    className="border-2 border-lunar-pearl/50 text-xl hover:scale-105 origin-center cursor-pointer select-none active:scale-95 p-2 text-enchanted-gold"
                    onClick={async () => {
                      const sanityId = item._id;
                      const type = item.subCategory?.[0] ?? "potion";

                      if (buySection) {
                        try {
                          await fetch("/api/player/inventory", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              itemId: sanityId,
                              itemType: type,
                              amount: 1,
                            }),
                          });

                          // Update local UI
                          buyItem(item.id, item.buyPrice, type);
                        } catch (err) {
                          console.error("Buy failed:", err);
                        }
                      } else {
                        try {
                          await fetch("/api/player/inventory/sell", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              itemId: sanityId,
                              amount: 1,
                              gold: item.sellPrice,
                            }),
                          });

                          // Update local UI
                          sellItem(item.id, item.sellPrice);
                        } catch (err) {
                          console.error("Sell failed:", err);
                        }
                      }
                    }}>
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
