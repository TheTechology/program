import Link from "next/link";
import { requireAdmin } from "@/lib/guards";

const nav = [
  ["Overview", "/admin"],
  ["Cursuri", "/admin/cursuri"],
  ["Sesiuni", "/admin/sesiuni"],
  ["Enrolări", "/admin/enrolari"],
  ["Comenzi", "/admin/comenzi"],
  ["Utilizatori", "/admin/utilizatori"],
  ["Rapoarte", "/admin/rapoarte"]
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="h-fit rounded-xl border bg-white p-3">
        <nav className="space-y-1">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
