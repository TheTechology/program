import { getCartFromCookie } from "@/lib/cart";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { CartClient } from "@/components/cart-client";

export const metadata = buildMetadata({
  title: "Coș",
  description: "Revizuiește cursurile selectate înainte de checkout.",
  path: "/cos"
});

export default async function CartPage() {
  const cart = await getCartFromCookie();
  const courses = await db.course.findMany({
    where: { id: { in: cart.map((item) => item.courseId) } },
    select: { id: true, title: true, priceRon: true }
  });

  const items = cart
    .map((item) => {
      const course = courses.find((c) => c.id === item.courseId);
      if (!course) return null;
      return {
        courseId: course.id,
        quantity: item.quantity,
        title: course.title,
        priceRon: course.priceRon
      };
    })
    .filter(Boolean) as Array<{ courseId: string; quantity: number; title: string; priceRon: number }>;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold">Coșul tău</h1>
      <CartClient initialItems={items} />
    </div>
  );
}
