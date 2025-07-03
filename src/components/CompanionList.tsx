import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import { CompanionRecord } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

const CompanionList = ({
  companions,
  title,
}: {
  companions: CompanionRecord[];
  title?: string;
}) => {
  return (
    <article className="rounded-3xl border border-black px-7 pt-7 pb-10 w-full bg-white">
      <Table>
        <TableCaption>A list of {title} companions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3 text-lg">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions.map((companion) => (
            <TableRow key={companion.id}>
              <TableCell className="font-medium">
                <Link href={`/companions/${companion.id}`}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center justify-center size-16 rounded-lg max-md:hidden",
                        getSubjectColor(companion.subject)
                      )}
                    >
                      <Image
                        src={`/icons/${companion.subject}.svg`}
                        alt="subject"
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl font-bold">{companion.name}</p>
                      <p className="text-lg">{companion.topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <Badge className="max-md:hidden capitalize">
                  {companion.subject}
                </Badge>
                <div
                  className={cn(
                    "flex items-center justify-center rounded-lg w-fit md:hidden",
                    getSubjectColor(companion.subject)
                  )}
                >
                  <Image
                    src={`/icons/${companion.subject}.svg`}
                    alt="subject"
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell className="text-xl text-right">
                {companion.duration} mins
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;
