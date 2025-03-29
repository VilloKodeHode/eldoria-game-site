"use client";

import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { useEffect } from "react";
import { cacheFetchAllIngredients, cacheFetchAllPotions } from "./fetchers";

export function SanityDataLoader() {
  const setIngredients = useSanityDataStore((state) => state.setIngredients);
  const setPotions = useSanityDataStore((state) => state.setPotions);
  const setSanityLoaded = useSanityDataStore((state) => state.setSanityLoaded);



  
  useEffect(() => {
    async function fetchAndStore() {
      const [ingredients, potions] = await Promise.all([
        cacheFetchAllIngredients(),
        cacheFetchAllPotions(),
      ]);

      setIngredients(ingredients);
      setPotions(potions);
      setSanityLoaded(true);
    }

    fetchAndStore();
  }, [setIngredients, setPotions, setSanityLoaded]);

  return null; // doesn't render anything
}
