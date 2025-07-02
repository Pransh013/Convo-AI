import CompanionCard from "@/components/CompanionCard";
import RecentSessions from "@/components/RecentSessionsList";
import CreateCompanion from "@/components/CreateCompanion";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";

export default async function HomePage() {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions(6);

  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard {...companion} key={companion.id} />
        ))}
      </section>

      <section className="home-section">
        <RecentSessions sessions={recentSessions} />
        <CreateCompanion />
      </section>
    </main>
  );
}
