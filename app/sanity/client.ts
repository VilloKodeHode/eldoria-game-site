import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: '98hhzohe',
  dataset: 'production',
  apiVersion: "2024-11-01",
  useCdn: false,
});