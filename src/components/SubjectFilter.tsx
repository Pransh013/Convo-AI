"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSubject = searchParams.get("subject") ?? "all";
  const [subject, setSubject] = useState(initialSubject);
  
  useEffect(() => {
    const currentSubject = searchParams.get("subject") ?? "all";
    if (subject === currentSubject) return;

    const newUrl =
      subject !== "all"
        ? formUrlQuery({
            params: searchParams.toString(),
            key: "subject",
            value: subject,
          })
        : removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });
    router.push(newUrl, { scroll: false });
  }, [subject, router, searchParams]);

  return (
    <Select onValueChange={(value) => setSubject(value)} value={subject}>
      <SelectTrigger className="relative border border-black focus-visible:border-black capitalize rounded-lg flex items-center gap-2 px-2 w-44 !h-full">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem value="all" className="capitalize">
            All Subjects
          </SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
