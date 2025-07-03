"use client";

import { CompanionType } from "@/types";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  isBookmarked,
}: CompanionType) => {
  const pathname = usePathname()
  const handleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };
  return (
    <article className={cn("companion-card", getSubjectColor(subject))}>
      <div className="flex justify-between items-center">
        <Badge className="capitalize">{subject}</Badge>
        <Button className="rounded-full" size="icon" onClick={handleBookmark}>
          <Image
            src={
              isBookmarked
                ? "/icons/bookmark-filled.svg"
                : "/icons/bookmark.svg"
            }
            alt="bookmark"
            height={15}
            width={13}
          />
        </Button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image src="/icons/clock.svg" alt="duration" height={13} width={13} />
        <p className="text-sm pt-[1px]">{duration} minutes</p>
      </div>
      <Button className="w-full" asChild>
        <Link href={`/companions/${id}`}>Launch Course</Link>
      </Button>
    </article>
  );
};

export default CompanionCard;
