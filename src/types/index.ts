import { companionFormSchema } from "@/schemas";
import { z } from "zod";

export type CompanionFormValues = z.infer<typeof companionFormSchema>;

export type CompanionType = {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
};

export type CompanionRecord = {
  id: string;
  name: string;
  style: string;
  subject: string;
  voice: string;
  topic: string;
  duration: number;
  author: string;
  created_at: string;
};

export type CompanionListProps = {
  title: string;
  companions: CompanionType[];
  className?: string;
};

export type GetAllCompanions = {
  subject?: string | string[];
  topic?: string | string[];
  limit?: number;
  page?: number;
};

export type SearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
