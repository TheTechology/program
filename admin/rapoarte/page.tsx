import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Admin Rapoarte", path: "/admin/rapoarte" });

export default function AdminReportsPage() {
  return (
    <section className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Rapoarte CSV</h1>
      <div className="space-y-2 text-sm">
        <a className="font-semibold text-primary" href="/api/export/orders">Export comenzi CSV</a>
        <br />
        <a className="font-semibold text-primary" href="/api/export/enrollments">Export enrolări CSV</a>
      </div>
    </section>
  );
}
