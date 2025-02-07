import { slugify } from "@/lib/string";
import { DATA } from "../connect";

export async function getProductBySlug(slug: string) {
  return DATA.find((prod) => slug === slugify(prod.description));
}
