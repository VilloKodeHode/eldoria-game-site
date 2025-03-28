"use client";

import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { useEffect } from "react";
import { cacheFetchAllIngredients, cacheFetchAllPotions } from "./fetchers";

export function SanityDataLoader() {
  const setIngredients = useSanityDataStore((state) => state.setIngredients);
  const setPotions = useSanityDataStore((state) => state.setPotions);

  useEffect(() => {
    async function fetchAndStore() {
      const [ingredients, potions] = await Promise.all([
        cacheFetchAllIngredients(),
        cacheFetchAllPotions(),
      ]);

      setIngredients(ingredients);
      setPotions(potions);
    }

    fetchAndStore();
  }, [setIngredients, setPotions]);

  return null; // doesn't render anything
}
