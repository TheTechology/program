import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Despre Noi",
  description: "Misiunea Youth Code Academy.",
  path: "/despre"
});

export default function DesprePage() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-4xl font-bold">Despre Youth Code Academy</h1>
      <p className="text-muted-foreground">
        Formăm tineri care folosesc tehnologia pentru binele comunității: proiecte reale, mentori practicieni și
        curriculum modern.
      </p>
    </div>
  );
}
