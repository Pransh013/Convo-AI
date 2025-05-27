import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CreateCompanion from "@/components/CreateCompanion";
import { recentSessions } from "@/constants";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura"
          topic="Brain"
          subject="Science"
          duration={45}
          color="bg-red-500"
        />
        <CompanionCard
          id="124"
          name="Neura"
          topic="Brain"
          subject="science"
          duration={45}
          color="bg-cyan-500"
        />
        <CompanionCard
          id="125"
          name="Neura"
          topic="Brain"
          subject="science"
          duration={45}
          color="bg-teal-500"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="recently completed"
          companions={recentSessions}
        />
        <CreateCompanion />
      </section>
    </main>
  );
}
