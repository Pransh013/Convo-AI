import CompanionForm from "@/components/CompanionForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function NewCompanionPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="min-lg:w-2/5 min-md:w-2/3">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <Badge className="bg-cta-gold text-black text-sm">
            Upgrade your plan
          </Badge>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Button asChild className="bg-chart-1">
            <Link href="/subscription">Upgrade My Plan</Link>
          </Button>
        </article>
      )}
    </main>
  );
}
