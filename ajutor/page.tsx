import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ajutor & FAQ",
  description: "Răspunsuri rapide la întrebările frecvente.",
  path: "/ajutor"
});

const faq = [
  ["Cum se desfășoară cursurile?", "Online, live sau recorded, în funcție de format."],
  ["Pot testa platforma?", "Da, unele lecții sunt marcate preview gratuit."],
  ["Cum funcționează rambursarea?", "Conform politicii din pagina legală de rambursări."]
];

export default function AjutorPage() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-4xl font-bold">Ajutor</h1>
      {faq.map(([q, a]) => (
        <div key={q}>
          <p className="font-semibold">{q}</p>
          <p className="text-sm text-muted-foreground">{a}</p>
        </div>
      ))}
    </div>
  );
}
