import { DATA } from "@/db/connect";
import { slugify } from "@/lib/string";
import Image from "next/image";

const databaseFetch = async (slug: string) => {
  // 3 second promise
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = DATA.find((item) => slugify(item.description) === slug);
  return Promise.resolve(data);
};
export default async function PreviewProduct({ slug }: { slug: string }) {
  const product = await databaseFetch(slug);
  if (!product)
    return (
      <div className="absolute inset-0 bg-white p-5 delay-1000 animate-in slide-in-from-right duration-500 ease-in-out fill-mode-forwards">
        <h2 className="text-xl">Product not found</h2>
      </div>
    );

  return (
    <div className="absolute inset-0 bg-white p-5 delay-1000 animate-in slide-in-from-right duration-500 ease-in-out fill-mode-forwards">
      <Image
        src={product.image_url}
        width={200}
        height={200}
        alt={product.description}
      />
      <h2 className="text-xl">{product.description}</h2>
    </div>
  );
}
