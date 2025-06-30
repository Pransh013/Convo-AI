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

export type CompanionSessionProps = {
  params: Promise<{ id: string }>;
};

export type CompanionSessionData = {
  id: string;
  name: string;
  subject: string;
  topic: string;
  style: string;
  voice: string;
  userName: string;
  userImage: string;
};

export enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
