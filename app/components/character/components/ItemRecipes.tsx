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
    <div className="grid gap-8">
      {Object.entries(sanityTypes).map(([type, items]) => {
        const knownRecipes = items.filter((item) =>
          playerInventory.learnedRecipes?.includes(item._id)
        );

        if (knownRecipes.length === 0) return null;

        return (
          <div key={type}>
            <h3 className="text-2xl font-bold text-enchanted-gold mb-4">
              {type.toUpperCase()}
            </h3>
            <ul className="grid gap-6">
              {knownRecipes.map((item) => (
                <li key={item._id}>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-enchanted-gold">{item.name}</p>
                    {item.src && (
                      <Image
                        className="object-cover rounded"
                        src={item.src}
                        alt={item.name ?? "Recipe item"}
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-lunar-pearl">Recipe:</p>
                    <div className="flex flex-col gap-1">
                      {item.recipe?.map((r) => (
                        <div
                          key={r.ingredient._id}
                          className="flex justify-between">
                          <span>{r.ingredient.name}</span>
                          <span>x{r.amount}</span>
                        </div>
                      ))}
                    </div>
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
