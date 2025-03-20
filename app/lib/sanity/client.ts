import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET,
  apiVersion: "2024-11-01",
  useCdn: true,
});
