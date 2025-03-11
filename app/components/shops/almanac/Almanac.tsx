// import { potions } from "@/app/(pages)/stores/potionShop/data/potions";
// import Image from "next/image";

// export const Almanac = () => {
//     return (
//         <>
//         <div className="almanac-potion ${potion}">
//           <div className="almanac-potion-inner">
            
//             <div className="almanac-potion-front">
//             <div className="almanac-potion-background"></div>
//               <p>${potions[potion].name}</p>
//               <Image className="almanac-potion-image" src="${potions[potion].image}" alt="${potions[potion].name}" />
//               <div className="almanac-ingredients">
//                 ${Object.keys(ingredients).map((ingredient) => {
//         return `
//                     <div className="almanac-ingredient">
//                       <p>${getPotionIngredient(potion, ingredient)}</p>
//                       <img className="almanac-ingredient-image" src="${baseIngredientImageUrl(
//           ingredients[ingredient].ingredientName
//         )}" alt="${ingredients[ingredient].ingredientName}" />
//                     </div>
//                     `;
//       }).join("")}
//               </div>
//             </div>
            
        
//             <div className="almanac-potion-backface">
//                   <p id="${potion}-made" className="made">V</p>
//                   <img className="" src="${potions[potion].image}" alt="${potions[potion].name}" />
//             </div>
//           </div>
//         </div>
//         </>
//     )
// }