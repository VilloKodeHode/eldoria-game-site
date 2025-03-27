import { cache } from "react";
import { sanityClient } from "@/app/lib/sanity/client";
import { allIngredients, allPotions } from "./items";

export const cacheFetchAllIngredients = cache(async () => {
  return await sanityClient.fetch(
    allIngredients,
    {},
    {
      next: { revalidate: 86400 }, // 24 hours
    }
  );
});

export const cacheFetchAllPotions = cache(async () => {
  return await sanityClient.fetch(
    allPotions,
    {},
    {
      next: { revalidate: 86400 }, // 24 hours
    }
  );
});
