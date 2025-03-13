// creating an object for the ingredients:

export const ingredients = [
  {
    name: "Herbs",
    amount: 0,
    id: "herbs",
    src: "/images/ingredients/herbs-ingredient.webp",
  },
  {
    name: "Berries",
    amount: 0,
    id: "berries",
    src: "/images/ingredients/berries-ingredient.webp",
  },
  {
    name: "Water",
    amount: 0,
    id: "water",
    src: "/images/ingredients/water-ingredient.webp",
  },
  {
    name: "Mushrooms",
    amount: 0,
    id: "mushrooms",
    src: "/images/ingredients/mushrooms-ingredient.webp",
  },
  {
    name: "Flowers",
    amount: 0,
    id: "flowers",
    src: "/images/ingredients/flowers-ingredient.webp",
  },
  {
    name: "Crystals",
    amount: 0,
    id: "crystals",
    src: "/images/ingredients/crystals-ingredient.webp",
  },
];

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
