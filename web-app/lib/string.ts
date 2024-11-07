import { customAlphabet } from "nanoid";


export function sanitize(str:string){
    return str.replace("_"," ").replace("  "," ").trim()
}

export function slugify(text: string): string {
  let slug = text.toString().toLowerCase().trim();

  // Remove non-alphanumeric characters
  slug = slug.replace(/[^a-z0-9\s-]/g, "");

  // Replace whitespace with hyphens
  slug = slug.replace(/\s+/g, "-");

  // Remove duplicate hyphens
  slug = slug.replace(/-{2,}/g, "-");

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

export function generateSlug(length = 8): string {
  return customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
}