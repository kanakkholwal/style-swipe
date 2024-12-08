import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {GradientBalls} from "@/components/gradient";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen z-0">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <Navbar />
        </header>

        <section className="flex flex-col items-center justify-center py-20 min-h-96">
          <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl mb-4">Swipe, Match, Style</h2>
          <p className="text-center text-xl text-gray-600 dark:text-gray-300">
            Discover your next favorite outfit with {process.env.NEXT_PUBLIC_APP_NAME}. Swipe through thousands of styles, curated just for you.
          </p>
          <Button rounded="full" size="lg" className="mt-8" transition="damped" asChild>
            <Link href="/app">
              Start Swiping
            </Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 min-h-96">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">How {process.env.NEXT_PUBLIC_APP_NAME} Works</h2>
          <div className="grid gap-8 md:grid-cols-3 mx-auto max-w-7xl">
            {[
              {
                title: 'Personalized Suggestions',
                description: 'Get outfits tailored to your taste and preferences.',
                img: "/images/feed.png"
              },
              {
                title: 'Swipe & Match',
                description: 'Swipe right if you like an outfit, and save it for later.',
                img: "/images/swipe.png"
              },
              {
                title: 'Outfit Assistant',
                description: 'Get expert suggestions on pairing and creating looks for any occasion.',
                img: "/images/assistant.png"
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center bg-white/30 backdrop-blur-lg p-8 rounded-xl border hover:border-0 hover:shadow-lg">
                <Image src={feature.img} height={256} width={256} alt={feature.title} className="mx-auto size-28 mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Explore Collections</h2>
          <Carousel className="max-w-7xl mx-auto">
            <CarouselContent className="-ml-4">
              {['Winter', 'Casual', 'Formal', 'Summer', "Street Wear", "Sports"].map((collection) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4" key={collection}>
                  <div
                    className="min-w-[18rem] h-[25rem] bg-cover bg-center rounded-lg shadow-md"
                    style={{ backgroundImage: `url('/images/${collection.toLowerCase().replace(" ", "_")}.jpeg')` }}
                  >
                    <div className="flex items-center justify-center h-full bg-black bg-opacity-40 rounded-lg">
                      <h3 className="text-xl font-semibold text-white">{collection}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </section>

        {/* Call to Action */}
        <section className="flex flex-col items-center justify-center py-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Style?</h2>
          <p className="text-center max-w-lg mb-8">
            Join {process.env.NEXT_PUBLIC_APP_NAME} today and start exploring a world of fashion tailored just for you!
          </p>
          <Link href="/sign-up" className="px-6 py-3 font-semibold bg-white text-blue-600 rounded-full hover:bg-gray-200" >
            Sign Up Now
          </Link>
        </section>

        <Footer />
      </main>
      <GradientBalls/>
    </>
  );
}
