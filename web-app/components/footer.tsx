import Link from "next/link";
import { FiLinkedin } from "react-icons/fi";
import { FOOTER_LINKS } from "@/data/root";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="relative z-10 pb-17 lg:pb-22 xl:pb-27 mt-10">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative pt-17">
        <div className="w-full h-[1px] footer-divider-gradient absolute top-0 left-0" />
        <div className="flex flex-wrap justify-between">
          <div className="mb-10 max-w-[520px] w-full prose dark:prose-invert">
            <Link
              className="mb-8 inline-block  text-3xl font-extrabold sm:text-3xl xl:text-heading-3 not-prose"
              href="/"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
            <p className="mb-12 xl:w-4/5">
              Swipe through stylish outfits tailored just for you!
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="https://x.com/KanakKholwal"
                title="Twitter / X"
                className={
                  "text-slate-500 hover:text-primary hover:-translate-y-1 ease-in duration-300 flex justify-center items-center h-8 icon"
                }
              >
                <RiTwitterXFill className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/kanak-kholwal"
                title={"NexoNauts' Linkedin"}
                className={
                  "text-slate-500 hover:text-primary hover:-translate-y-1 ease-in duration-300 flex justify-center items-center h-8 icon"
                }
              >
                <FiLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="max-w-[571px] w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
              {FOOTER_LINKS.map((footerLink) => {
                return (
                  <LinkList
                    title={footerLink.title}
                    links={footerLink.links}
                    key={footerLink.title}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="font-medium mt-4 mb-6 text-slate-600 flex justify-between gap-2 items-center">
          <div>
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="text-slate-900 dark:text-slate-200 font-semibold"
              title={process.env.NEXT_PUBLIC_APP_NAME}
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>{" "}
            . All rights reserved.
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  );
}

function LinkList({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div>
      <h5 className="font-semibold mb-5">{title}</h5>
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => (
          <li key={index} className="relative">
            <Link
              href={link.href}
              title={link.title}
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary font-semibold text-sm ease-in duration-300 inset-0 hover:left-2"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
