import { PlayerInventory } from "@/app/interfaces/inventory";
import Image from "next/image";

interface ItemRecipesProp {
  playerInventory: PlayerInventory;
  itemType: string;
}

export const ItemRecipes = ({ playerInventory, itemType }: ItemRecipesProp) => {
  const knownRecipes = playerInventory.items.filter(
    (item) => item.knowRecipe && item.type === itemType
  );

  return (
    <ul className="grid gap-6">
      {knownRecipes.map((item) => (
        <li key={item.sanityId}>
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
  );
};
