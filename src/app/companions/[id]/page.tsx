import CompanionSession from "@/components/CompanionSession";
import { Badge } from "@/components/ui/badge";
import { getCompanion } from "@/lib/actions/companion.actions";
import { cn, getSubjectColor } from "@/lib/utils";
import { CompanionSessionProps } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function CompanionSessionPage({
  params,
}: CompanionSessionProps) {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "size-[72px] flex items-center justify-center rounded-lg max-md:hidden",
              getSubjectColor(companion.subject)
            )}
          >
            <Image
              src={`/icons/${companion.subject}.svg`}
              height={35}
              width={35}
              alt={companion.subject}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <p className="font-bold text-2xl">{companion.name}</p>
              <Badge className="capitalize max-sm:hidden">
                {companion.subject}
              </Badge>
            </div>
            <p className="text-lg">{companion.topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {companion.duration} minutes
        </div>
      </article>
      <CompanionSession
        {...companion}
        userName={user.firstName ?? "User"}
        userImage={user.imageUrl}
      />
    </main>
  );
}
