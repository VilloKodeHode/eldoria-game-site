import { defineLive } from "next-sanity";
import { sanityClient } from "@/app/lib/sanity/client";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({ apiVersion: "vX" }),
});
