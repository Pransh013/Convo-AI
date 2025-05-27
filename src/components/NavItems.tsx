"use client"

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-8">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={href}
          className={cn(pathname === href && "text-primary font-semibold")}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
