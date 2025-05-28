import CompanionForm from "@/components/CompanionForm";

export default function NewCompanionPage() {
  return (
    <main className="min-lg:w-2/5 min-md:w-2/3">
      <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  );
}
