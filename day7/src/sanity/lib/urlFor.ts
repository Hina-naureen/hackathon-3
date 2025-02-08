import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types"; // Import the correct type

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);