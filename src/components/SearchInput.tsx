"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useDebounce } from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "topic",
        value: debouncedSearchQuery,
      });
      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["topic"],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [debouncedSearchQuery, searchParams, router, pathname]);

  return (
    <div className="relative border border-black rounded-lg flex items-center gap-2 px-3 py-0.5 h-fit">
      <Image src="/icons/search.svg" alt="search" width={14} height={14} />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Companions"
        className="focus-visible:ring-0 shadow-none border-0"
      />
    </div>
  );
};

export default SearchInput;
