import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "98hhzohe",
  dataset: "production",
  apiVersion: "2025-03-27",
  useCdn: true,
});
