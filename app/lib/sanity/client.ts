import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID || "98hhzohe",
  dataset: process.env.SANITY_API_DATASET || "production",
  apiVersion: "2025-03-27",
  useCdn: true,
});
