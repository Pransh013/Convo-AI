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

enum MessageTypeEnum {
  TRANSCRIPT = "transcript",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
  ADD_MESSAGE = "add-message",
}

enum MessageRoleEnum {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

enum TranscriptMessageTypeEnum {
  PARTIAL = "partial",
  FINAL = "final",
}

interface BaseMessage {
  type: MessageTypeEnum;
}

interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}

interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

export type Message =
  | TranscriptMessage
  | FunctionCallMessage
  | FunctionCallResultMessage;

export type SavedMessage = {
  role: "user" | "system" | "assistant";
  content: string;
};
