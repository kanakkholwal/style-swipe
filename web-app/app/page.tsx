import SwipingComponent from "./swiping";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 w-full h-screen border-4 border-red-500 justify-center items-center">
        <SwipingComponent/>
      </main>
    </>
  );
}
