"use client";

import { useEffect } from "react";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { cacheFetchGameContentEntryPoint } from "./fetchers";
import { transformGameContent } from "./transformers/transformGameContent";

export const SanityDataLoader = () => {
  const {
    setIngredients,
    setMaterials,
    setSpices,
    setPotions,
    setFoods,
    setWeapons,
    setArmours,
    setJewelry,
    setClasses,
    setRaces,
    setSanityLoaded,
  } = useSanityDataStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const raw = await cacheFetchGameContentEntryPoint();
        const {
          ingredients,
          materials,
          spices,
          potions,
          foods,
          weapons,
          armours,
          jewelry,
          classes,
          races,
        } = transformGameContent(raw);

        // Set into Zustand
        setIngredients(ingredients);
        setMaterials(materials);
        setSpices(spices);
        setPotions(potions);
        setFoods(foods);
        setWeapons(weapons);
        setArmours(armours);
        setJewelry(jewelry);
        setClasses(classes);
        setRaces(races);

        setSanityLoaded(true);
        console.log("✅ Sanity data loaded (unified)");
      } catch (err) {
        console.error("❌ Failed to load Sanity data:", err);
      }
    };

    loadData();
  }, [
    setIngredients,
    setMaterials,
    setSpices,
    setPotions,
    setFoods,
    setWeapons,
    setArmours,
    setJewelry,
    setClasses,
    setRaces,
    setSanityLoaded,
  ]);

  return null;
};
