import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Plată reușită", path: "/checkout/succes" });

export default function CheckoutSuccessPage() {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h1 className="font-display text-4xl font-bold text-success">Plata a fost inițiată cu succes</h1>
      <p className="mt-2 text-muted-foreground">Confirmarea finală se face automat prin webhook Stripe.</p>
      <Link href="/cont/cursurile-mele" className="mt-4 inline-flex text-sm font-semibold text-primary">
        Vezi cursurile mele
      </Link>
    </section>
  );
}
