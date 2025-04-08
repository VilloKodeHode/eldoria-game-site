import { cache } from "react";
import { sanityClient } from "@/app/lib/sanity/client";
// import { allIngredients, allPotions } from "./queries/items";
// import { allClasses, allRaces } from "./queries/characters";
import { gameContentEntryPointQuery } from "./queries/gameData";

export const cacheFetchGameContentEntryPoint = cache(async () => {
  return await sanityClient.fetch(
    gameContentEntryPointQuery,
    {},
    {
      next: { revalidate: 86400 }, // 24 hours cache
    }
  );
});


// export const cacheFetchAllIngredients = cache(async () => {
//   return await sanityClient.fetch(
//     allIngredients,
//     {},
//     {
//       next: { revalidate: 86400 }, // 24 hours
//     }
//   );
// });

// export const cacheFetchAllPotions = cache(async () => {
//   return await sanityClient.fetch(
//     allPotions,
//     {},
//     {
//       next: { revalidate: 86400 }, // 24 hours
//     }
//   );
// });

// export const cacheFetchAllCharacterRaces = cache(async () => {
//   return await sanityClient.fetch(
//     allRaces,
//     {},
//     {
//       next: { revalidate: 86400 }, // 24 hours
//     }
//   );
// });

// export const cacheFetchAllCharacterClasses = cache(async () => {
//   return await sanityClient.fetch(
//     allClasses,
//     {},
//     {
//       next: { revalidate: 86400 }, // 24 hours
//     }
//   );
// });
