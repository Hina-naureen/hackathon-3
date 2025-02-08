import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId, token } from "../env";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
  token,
});