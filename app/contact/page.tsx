import { buildMetadata } from "@/lib/seo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Ia legătura cu echipa Youth Code Academy.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border bg-white p-6">
        <h1 className="font-display text-4xl font-bold">Contact</h1>
        <p className="mt-2 text-muted-foreground">Întrebări despre cursuri, înscriere sau parteneriate.</p>
        <p className="mt-3 text-sm">Email: contact@youthcodeacademy.ro</p>
        <p className="text-sm">Telefon: +40 731 000 000</p>
      </section>
      <form className="space-y-3 rounded-xl border bg-white p-6">
        <Input placeholder="Nume" />
        <Input type="email" placeholder="Email" />
        <Textarea placeholder="Mesaj" />
        <button type="submit" className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-white">
          Trimite
        </button>
      </form>
    </div>
  );
}
