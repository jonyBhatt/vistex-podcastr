"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function LeftSidebar() {
  const pathname = usePathname();
  const route = useRouter();
  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" alt="logo" width={23} height={23} />
          <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">
            Vistex
          </h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              key={route}
              href={route}
              className={cn(
                `flex cursor-pointer items-center gap-1 py-4 justify-center lg:justify-start`,
                { "bg-nav-focus border-r-4 border-orange-1": isActive }
              )}
            >
              <Image
                src={imgURL}
                alt={label}
                width={23}
                height={23}
                className="max-lg:hidden"
              />
              <h1 className="text-18 font-extrabold text-white-1 max-lg:hidden">
                {label}
              </h1>
            </Link>
          );
        })}
        <UserButton afterSignOutUrl="/" showName />
      </nav>
    </section>
  );
}
