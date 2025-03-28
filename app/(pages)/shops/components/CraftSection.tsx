"use client";

import Image from "next/image";

export const CraftSection = ({ setIngredients, items }) => {
  const updateItemAmount = (id: string, change: number) => {
    setIngredients((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, amount: Math.max(0, item.amount + change) }
          : item
      )
    );
  };

  return (
    <>
      <section className="flex flex-wrap gap-16 justify-center">
        {items.map((item) => {
          return (
            <div
              key={item._id}
              className={`h-50 w-50 relative flex flex-col justify-between border-4 border-lunar-pearl/50 bg-lunar-pearl/20`}>
              <Image
                className="absolute select-none top-0 left-0 -z-10"
                width={200}
                height={200}
                src={item.src}
                alt=""
              />
              <p className="text-center text-xl text-enchanted-gold font-bold border-b-4 bg-obsidian-black/70 border-lunar-pearl/50 select-none">
                {item.name}
              </p>
              <div className="flex flex-col w-full justify-center">
                <div className="flex justify-between items-center border-t-4 text-center border-lunar-pearl/50 bg-obsidian-black/70">
                  <ChangeAmountButton
                    onClick={() => updateItemAmount(item._id, 1)}
                  />

                  <span
                    className={`text-2xl select-none flex-1/2 transition ${
                      item.amount > 0
                        ? "text-forest-emerald"
                        : "text-crimson-flame"
                    }`}>
                    {item.amount}
                  </span>
                  <ChangeAmountButton
                    addButton={false}
                    onClick={() => updateItemAmount(item._id, -1)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

const ChangeAmountButton = ({ onClick, addButton = true }) => {
  return (
    <div
      className={`${
        addButton ? "border-r-4" : "border-l-4"
      } flex-1/3 border-lunar-pearl/50`}>
      <button
        className="text-4xl hover:scale-120 origin-center cursor-pointer select-none active:scale-95 p-2 text-enchanted-gold"
        onClick={onClick}>
        {addButton ? "+" : "-"}
      </button>
    </div>
  );
};
