import Link from "next/link";

const navLinks = [
  {
    name: "Solution",
    link: "/#solution",
  },

  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Company",
    link: "/about",
  },
];

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="fixed inset-x-0 z-20 w-full border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-700/30 dark:bg-gray-900/80"
    >
      <div className="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
        <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 lg:py-4 mt-5">
          <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
            <Link
              href="/"
              aria-label="logo"
              className="flex items-center space-x-2 h-10 text-lg font-bold text-gray-800 dark:text-white"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
          
          </div>
          <div
            id="layer"
            aria-hidden="true"
            className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"
          />
          <div
            id="navlinks"
            className="invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-auto lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:peer-checked:translate-y-0 dark:lg:bg-transparent"
          >
            <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
              <ul className="space-y-6 text-base font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm">
                {navLinks.map((link) => {
                  return (
                    <li key={link.name}>
                      <Link
                        className="block transition hover:text-primary dark:hover:text-primaryLight md:px-4"
                        href={link.link}
                      >
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-12 -ml-1 flex w-full flex-col space-y-2 border-primary/10 dark:border-gray-700 sm:flex-row md:w-max lg:mt-0 lg:mr-6 lg:space-y-0 lg:border-l lg:pl-6">
              <a
                className="relative ml-auto flex h-9 w-full items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-primaryLight sm:px-4 lg:before:border lg:before:border-gray-200 lg:before:bg-primary/10 lg:dark:before:bg-gray-800"
                href="/sign-up"
              >
                <span className="relative text-sm font-semibold text-white dark:text-gray-900 lg:text-primary lg:dark:text-white">
                  Get started
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}
