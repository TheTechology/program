import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { updateUserRoleAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export const metadata = buildMetadata({ title: "Admin Utilizatori", path: "/admin/utilizatori" });

export default async function AdminUsersPage() {
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="font-display text-3xl font-bold">Utilizatori și roluri</h1>
      {users.map((user) => (
        <form key={user.id} action={updateUserRoleAction} className="flex flex-wrap items-center gap-3 rounded border p-3">
          <p className="min-w-[220px] text-sm">{user.email}</p>
          <input type="hidden" name="userId" value={user.id} />
          <Select name="role" defaultValue={user.role} className="max-w-[180px]">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </Select>
          <Button type="submit" variant="outline">Actualizează</Button>
        </form>
      ))}
    </section>
  );
}
