"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({ className }: { className: string }) => {
  const pathname = usePathname();
  return (
    <div className={cn("flex items-center gap-8 justify-center", className)}>
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={href}
          className={cn(
            pathname === href && "text-primary font-semibold underline"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
