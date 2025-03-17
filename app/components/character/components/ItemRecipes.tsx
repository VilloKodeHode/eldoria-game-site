import { InventoryItem, PlayerInventory } from "@/app/interfaces/inventory";
import Image from "next/image";

interface ItemRecipesProp {
    playerInventory: PlayerInventory;
    itemType: string;
}

export const ItemRecipes = ({playerInventory, itemType}: ItemRecipesProp) => {
    return (
      <ul>
        {playerInventory.items[itemType]
          .filter((item: InventoryItem) => item.knowRecipe)
          .map((item) => {
            return (
              <li key={item.id}>
                <div className="flex flex-col gap-4">
                  <p>{item.name}</p>
                  <Image
                    className="object-cover"
                    src={item.src}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Recipe:</p>
                  {Object.entries(item.recipe?.materials as object).map(
                    ([ingredient, value]) => {
                      return (
                        value >= 1 && (
                          <div
                            className="flex flex-col gap-2"
                            key={ingredient + item.name}
                          >
                            <p>{ingredient}</p>
                            <p>{value}</p>
                          </div>
                        )
                      );
                    }
                  )}
                  {Object.entries(item.recipe?.ingredients as object).map(
                    ([ingredient, value]) => {
                      return (
                        value >= 1 && (
                          <div
                            className="flex gap-2"
                            key={ingredient + item.name}
                          >
                            <p>{ingredient}</p>
                            <p>{value}</p>
                          </div>
                        )
                      );
                    }
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    );
  };


//   const RecipeList = (item, type) => {
//     {Object.entries(item.recipe?[type] as object).map(
//         ([ingredient, value]) => {
//           return (
//             value >= 1 && (
//               <div
//                 className="flex flex-col gap-2"
//                 key={ingredient + item.name}
//               >
//                 <p>{ingredient}</p>
//                 <p>{value}</p>
//               </div>
//             )
//           );
//         }
//       )}
//   }
  