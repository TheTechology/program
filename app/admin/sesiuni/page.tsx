import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import {
  createLiveSessionAction,
  deleteLiveSessionAction,
  updateLiveSessionAction
} from "@/app/actions/admin";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({ title: "Admin Sesiuni", path: "/admin/sesiuni" });

export default async function AdminSessionsPage() {
  const [courses, sessions] = await Promise.all([
    db.course.findMany({ where: { published: true } }),
    db.liveSession.findMany({ include: { course: true }, orderBy: { startAt: "desc" } })
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-white p-6">
        <h1 className="font-display text-3xl font-bold">CRUD Sesiuni Live</h1>
        <form action={createLiveSessionAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <Select name="courseId" required>
            <option value="">Selectează curs</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </Select>
          <Input name="title" placeholder="Titlu sesiune" required />
          <Input name="startAt" type="datetime-local" required />
          <Input name="durationMin" type="number" placeholder="Durată minute" required />
          <Input name="meetingUrl" placeholder="https://meet.google.com/..." className="md:col-span-2" required />
          <Select name="visibility" defaultValue="ENROLLED">
            <option value="ENROLLED">ENROLLED</option>
            <option value="PUBLIC">PUBLIC</option>
          </Select>
          <Textarea name="notes" placeholder="Note" />
          <Button type="submit" className="md:col-span-2">Creează sesiune</Button>
        </form>
      </section>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="font-display text-2xl font-bold">Sesiuni existente</h2>
        <div className="mt-4 space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="space-y-2 rounded border p-3">
              <p className="text-sm text-muted-foreground">{s.course.title}</p>
              <form action={updateLiveSessionAction} className="grid gap-2 md:grid-cols-5">
                <input type="hidden" name="id" value={s.id} />
                <Input name="title" defaultValue={s.title} />
                <Input name="startAt" type="datetime-local" defaultValue={new Date(s.startAt).toISOString().slice(0, 16)} />
                <Input name="durationMin" type="number" defaultValue={s.durationMin} />
                <Input name="meetingUrl" defaultValue={s.meetingUrl} />
                <Select name="visibility" defaultValue={s.visibility}>
                  <option value="ENROLLED">ENROLLED</option>
                  <option value="PUBLIC">PUBLIC</option>
                </Select>
                <Button type="submit" variant="outline">
                  Actualizează
                </Button>
              </form>
              <form action={deleteLiveSessionAction}>
                <input type="hidden" name="id" value={s.id} />
                <Button type="submit" variant="danger">
                  Șterge
                </Button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
