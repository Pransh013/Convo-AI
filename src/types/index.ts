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
