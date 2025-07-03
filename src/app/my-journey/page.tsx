import CompanionList from "@/components/CompanionList";
import RecentSessions from "@/components/RecentSessionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getBookmarkedCompanions,
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const userSessions = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex items-center gap-6">
          <Image
            src={user.imageUrl}
            alt={user.firstName || "user"}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 flex flex-col gap-2 h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{userSessions.length}</p>
            </div>
            <div>Lessons completed</div>
          </div>
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div>Companions created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple" className="mt-4">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent className="flex justify-center items-center">
            <RecentSessions sessions={userSessions} title="completed" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bookmarked">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Companions
          </AccordionTrigger>
          <AccordionContent className="flex justify-center items-center">
            <CompanionList companions={bookmarkedCompanions} title="your bookmarked"/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions
          </AccordionTrigger>
          <AccordionContent className="flex justify-center items-center">
            <CompanionList companions={companions} title="all your"/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
