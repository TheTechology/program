import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Admin Dashboard", path: "/admin" });

export default async function AdminDashboardPage() {
  const [users, courses, orders, enrollments] = await Promise.all([
    db.user.count(),
    db.course.count(),
    db.order.count(),
    db.enrollment.count()
  ]);

  return (
    <section className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Utilizatori</p><p className="text-2xl font-bold">{users}</p></div>
        <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Cursuri</p><p className="text-2xl font-bold">{courses}</p></div>
        <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Comenzi</p><p className="text-2xl font-bold">{orders}</p></div>
        <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Enrolări</p><p className="text-2xl font-bold">{enrollments}</p></div>
      </div>
    </section>
  );
}
