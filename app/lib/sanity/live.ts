import { defineLive } from "next-sanity";
import { sanityClient } from "@/app/lib/sanity/client";
import { allIngredients, allPotions } from "./items";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({ apiVersion: "vX" }),
});

export const fetchAllIngredients = await sanityClient.fetch(allIngredients);

export const fetchAllPotions = await sanityClient.fetch(allPotions);
