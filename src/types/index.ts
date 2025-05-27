export type CompanionCardProps = {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
};

type CompanionType = {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
};

export type CompanionListProps = {
  title: string;
  companions: CompanionType[];
  className?: string;
};
