import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const CreateCompanion = () => {
  return (
    <section className="cta-section">
      <Badge className="bg-cta-gold text-black text-base">
        Start learning your way.
      </Badge>
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companion
      </h2>
      <p>
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} />
      <Button className="flex bg-chart-1" asChild>
        <Link href="/companions/new">
          <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
          <p>Build a New Companion</p>
        </Link>
      </Button>
    </section>
  );
};

export default CreateCompanion;
