import { PlayerInventory } from "@/app/interfaces/inventory";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import Image from "next/image";

interface ItemRecipesProps {
  playerInventory: PlayerInventory;
}

export const ItemRecipes = ({ playerInventory }: ItemRecipesProps) => {
  const sanityData = useSanityDataStore();

  const sanityTypes = {
    potions: sanityData.potions,
    ingredients: sanityData.ingredients,
        //! Use these when we have more items types:
    // armour: sanityData.armour || [],
    // weapons: sanityData.weapons || [],
    // materials: sanityData.materials || [],
    // foods: sanityData.foods || [],
  };

  return (
    <div className="grid gap-10">
      {Object.entries(sanityTypes).map(([type, items]) => {
        const knownRecipes = items.filter((item) =>
          playerInventory.learnedRecipes?.includes(item._id)
        );

        if (knownRecipes.length === 0) return null;

        return (
          <div key={type}>
            <h3 className="text-3xl font-bold text-enchanted-gold mb-6 underline decoration-lunar-pearl">
              {type.toUpperCase()}
            </h3>
            <ul className="grid gap-8">
              {knownRecipes.map((item) => (
                <li
                  key={item._id}
                  className="p-4 border border-lunar-pearl rounded-lg shadow-inner bg-obsidian-black/40">
                  <div className="flex items-center gap-4 mb-3">
                    <Image
                      className="object-cover rounded"
                      src={item.src}
                      alt={item.name ?? "Recipe item"}
                      width={64}
                      height={64}
                    />
                    <p className="text-xl text-enchanted-gold font-semibold">
                      {item.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-lunar-pearl mb-1">Ingredients:</p>
                    <ul className="ml-4 list-disc text-lunar-pearl space-y-1">
                      {item.recipe?.map((r) => (
                        <li key={r.ingredient._id}>
                          <span className="font-semibold">{r.ingredient.name}</span> × {r.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
