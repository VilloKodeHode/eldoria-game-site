import { defineLive } from "next-sanity";
import { sanityClient } from "@/app/lib/sanity/client";
import { allIngredients } from "./items";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({ apiVersion: "vX" }),
});

export const fetchAllIngredients = await sanityClient.fetch(allIngredients);
