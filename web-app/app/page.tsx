// pages/index.tsx
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <h1 className="text-2xl font-semibold text-gray-900">StyleSwipe</h1>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700">
            Get Started
          </button>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
          <h2 className="text-4xl font-bold mb-4">Swipe, Match, Style</h2>
          <p className="text-lg max-w-xl text-center">
            Discover your next favorite outfit with StyleSwipe. Swipe through thousands of styles, curated just for you.
          </p>
          <button className="mt-8 px-6 py-3 font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-200">
            Start Swiping
          </button>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">How StyleSwipe Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Personalized Suggestions',
                description: 'Get outfits tailored to your taste and preferences.',
              },
              {
                title: 'Swipe & Match',
                description: 'Swipe right if you like an outfit, and save it for later.',
              },
              {
                title: 'Outfit Assistant',
                description: 'Get expert suggestions on pairing and creating looks for any occasion.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-16 bg-gray-100">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Explore Collections</h2>
          <div className="flex overflow-x-scroll gap-4 px-6">
            {['Winter', 'Casual', 'Formal', 'Summer'].map((collection, idx) => (
              <div
                key={idx}
                className="min-w-[200px] h-[300px] bg-cover bg-center rounded-lg shadow-md"
                style={{ backgroundImage: `url('/images/${collection.toLowerCase()}.jpg')` }}
              >
                <div className="flex items-center justify-center h-full bg-black bg-opacity-40 rounded-lg">
                  <h3 className="text-xl font-semibold text-white">{collection}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="flex flex-col items-center justify-center py-20 bg-blue-600 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Style?</h2>
          <p className="text-center max-w-lg mb-8">
            Join StyleSwipe today and start exploring a world of fashion tailored just for you!
          </p>
          <button className="px-6 py-3 font-semibold bg-white text-blue-600 rounded-full hover:bg-gray-200">
            Sign Up Now
          </button>
        </section>

        <footer className="py-8 bg-gray-900 text-white text-center">
          <p>&copy; {new Date().getFullYear()} StyleSwipe. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
