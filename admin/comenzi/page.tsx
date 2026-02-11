import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { formatRon } from "@/lib/utils";

export const metadata = buildMetadata({ title: "Admin Comenzi", path: "/admin/comenzi" });

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: { user: true, items: { include: { course: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Comenzi</h1>
      {orders.map((order) => (
        <article key={order.id} className="rounded border p-3">
          <p className="font-semibold">#{order.id.slice(0, 8)} • {order.user.email}</p>
          <p className="text-sm text-muted-foreground">{order.status} • {formatRon(order.totalRon)}</p>
          <p className="text-xs text-muted-foreground">{order.items.map((item) => item.course.title).join(", ")}</p>
        </article>
      ))}
    </section>
  );
}
