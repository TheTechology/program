import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Checkout anulat", path: "/checkout/anulat" });

export default function CheckoutCanceledPage() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h1 className="font-display text-4xl font-bold">Plata a fost anulată</h1>
      <p className="mt-2 text-muted-foreground">Poți reveni oricând în checkout.</p>
      <Link href="/cos" className="mt-4 inline-flex text-sm font-semibold text-primary">
        Înapoi la coș
      </Link>
    </section>
  );
}
