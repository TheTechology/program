import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Admin Enrolări", path: "/admin/enrolari" });

export default async function AdminEnrollmentsPage() {
  const enrollments = await db.enrollment.findMany({
    include: { user: true, course: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Enrolări</h1>
      {enrollments.map((entry) => (
        <article key={entry.id} className="rounded border p-3">
          <p className="font-semibold">{entry.user.email} → {entry.course.title}</p>
          <p className="text-sm text-muted-foreground">Status: {entry.status}</p>
        </article>
      ))}
    </section>
  );
}
