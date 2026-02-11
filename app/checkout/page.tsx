import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCartFromCookie } from "@/lib/cart";
import { buildMetadata } from "@/lib/seo";
import { CheckoutClient } from "@/components/checkout-client";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Inițiază plata securizată prin Stripe.",
  path: "/checkout"
});

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const cart = await getCartFromCookie();
  if (!cart.length) redirect("/cos");

  return (
    <div className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-4xl font-bold">Checkout Stripe</h1>
      <p className="text-muted-foreground">Plata este confirmată doar prin webhook securizat.</p>
      <CheckoutClient />
    </div>
  );
}
