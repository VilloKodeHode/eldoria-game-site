// creating an object for the ingredients:
export const ingredients = {
  herbs: {
    name: "herbs",
    amount: 0,
    id: "addHerbs",
    src: "/images/potionShop/ingredients/herbs-ingredient.webp",
  },
  berries: {
    name: "berries",
    amount: 0,
    id: "addBerries",
    src: "/images/potionShop/ingredients/berries-ingredient.webp",
  },
  water: {
    name: "water",
    amount: 0,
    id: "addWater",
    src: "/images/potionShop/ingredients/water-ingredient.webp",
  },
  mushrooms: {
    name: "mushrooms",
    amount: 0,
    id: "addMushrooms",
    src: "/images/potionShop/ingredients/mushrooms-ingredient.webp",
  },
  flowers: {
    name: "flowers",
    amount: 0,
    id: "addFlowers",
    src: "/images/potionShop/ingredients/flowers-ingredient.webp",
  },
  crystals: {
    name: "crystals",
    amount: 0,
    id: "addCrystals",
    src: "/images/potionShop/ingredients/crystals-ingredient.webp",
  },
};

// Function that can be called to get the amount of an ingredient
export default function ingredientAmount(ingredient) {
  return ingredients[ingredient].amount;
}

// console.log(ingredientAmount("herbs")) // 0
// console.log(ingredientAmount("crystals ")) // 0

// Function that can be called to get the amount for all ingredients
export function checkAllIngredientsAmount() {
  return Object.keys(ingredients).map(
    (ingredient) => ingredients[ingredient].amount
  );
}

// Function that can be called to increase the amount of an ingredient. Preventing amount over 10:
// function increaseAmount(ingredient, stateUpdater) {
//   if (ingredients[ingredient].amount >= 10) {
//     return null;
//   } else {
//     return stateUpdater(ingredients[ingredient].amount + 1);
//   }
// }

// Function that can be called to decrease the amount of an ingredient. Preventing negative amount:
// function decreaseAmount(ingredient) {
//   if (ingredients[ingredient].amount <= 0) {
//     return ingredients[ingredient].amount;
//   } else {
//       return stateUpdater(ingredients[ingredient].amount - 1);
//   }
// }

// Function that can be called to reset the amount of all ingredients:
export function resetIngredients() {
  // Loop through the ingredients and reset their amounts, using Object.keys because ingredients not an array
  Object.keys(ingredients).forEach((ingredient) => {
    // Sets each amount to 0:
    ingredients[ingredient].amount = 0;

    // Get the amount element so the UI can be updated:
    const amountElement = document.getElementById(
      `${ingredients[ingredient].id}-amount`
    );
    // Updated (resets back to 0) the amount in the UI if amountElement exists
    if (amountElement) {
      amountElement.textContent = ingredients[ingredient].amount;
    }
  });
}
