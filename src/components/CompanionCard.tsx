import { CompanionCardProps } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  return (
    <article className={cn("companion-card", color)}>
      <div className="flex justify-between items-center">
        <Badge className="capitalize">{subject}</Badge>
        <Button className="rounded-full" size="icon">
          <Image
            src="/icons/bookmark.svg"
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
