// app/lib/sanity/SanityDataLoader.ts
"use client";

import { useEffect } from "react";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { cacheFetchAllCharacterClasses, cacheFetchAllCharacterRaces, cacheFetchAllIngredients, cacheFetchAllPotions } from "./fetchers";


export const SanityDataLoader = () => {
  const {
    setIngredients,
    setPotions,
    setClasses,
    setRaces,
    setSanityLoaded,
  } = useSanityDataStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ingredients, potions, classes, races] = await Promise.all([
          cacheFetchAllIngredients(),
          cacheFetchAllPotions(),
          cacheFetchAllCharacterClasses(),
          cacheFetchAllCharacterRaces(),
        ]);

        //! use the console log below to check the fetched data:
        // console.log("🧪 Fetched Sanity data:", {
        //   ingredients,
        //   potions,
        //   classes,
        //   races,
        // });

        setIngredients(ingredients);
        setPotions(potions);
        setClasses(classes);
        setRaces(races);
        setSanityLoaded(true);

        console.log("✅ Sanity data loaded");
      } catch (err) {
        console.error("❌ Failed to load sanity data:", err);
      }
    };

    loadData();
  }, [
    setIngredients,
    setPotions,
    setClasses,
    setRaces,
    setSanityLoaded,
  ]);

  return null;
};
