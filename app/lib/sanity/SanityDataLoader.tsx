"use client";

import { useEffect } from "react";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { cacheFetchGameContentEntryPoint } from "./fetchers";
import { transformGameContent } from "./transformers/transformGameContent";
import { sanityClient } from "./client";

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
    setLore,
    setSkills,
    setNpcs,
    setTraits,
    setFactions,
    setSanityLoaded,
  } = useSanityDataStore();

  useEffect(() => {
    const loadData = async () => {
      const sanityTest = await sanityClient.fetch(
        `*[_type == "gameContentEntryPoint"]`
      );
      console.log("🧪 Sanity test fetch:", sanityTest);
      try {
        const rawEntry = await cacheFetchGameContentEntryPoint();

        // ✅ Log what we get back from Sanity
        console.log("🧪 rawEntry from Sanity:", rawEntry);

        if (!rawEntry) {
          throw new Error(
            "gameContentEntryPoint is null. Make sure the document exists in Sanity."
          );
        }

        const data = transformGameContent(rawEntry);

        // ✅ Log transformed data
        console.log("🧪 transformed game content:", data);

        // Populate Zustand store
        setIngredients(data.ingredients);
        setMaterials(data.materials);
        setSpices(data.spices);
        setPotions(data.potions);
        setFoods(data.foods);
        setWeapons(data.weapons);
        setArmours(data.armours);
        setJewelry(data.jewelry);
        setClasses(data.classes);
        setRaces(data.races);
        setLore(data.lore);
        setSkills(data.skills);
        setNpcs(data.npcs);
        setTraits(data.traits);
        setFactions(data.factions);

        setSanityLoaded(true);
        console.log("✅ Sanity data loaded.");
      } catch (err) {
        console.error("❌ Failed to load sanity data:", err);
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
    setLore,
    setSkills,
    setNpcs,
    setTraits,
    setFactions,
    setSanityLoaded,
  ]);

  return null;
};
