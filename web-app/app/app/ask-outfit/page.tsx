import { getAllOccasions } from "./actions";
import FormBox from "./form";

export default async function AskForOutFitPage() {
  const occasions = await getAllOccasions();

  return (
    <div className="pt-6 @container">
      <h2 className="text-2xl font-bold mb-4">
        {/* {user ? `Welcome, ${user.name.split(" ")[0]}` : `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`} */}
      </h2>
      <p className="text-gray-600 mb-8">
        Get your wardrobe ready for every occasion with our suggestions!
      </p>
      <div className="flex gap-8 flex-col w-full justify-center items-center">
        <FormBox occasions={occasions} />
      </div>
    </div>
  );
}
