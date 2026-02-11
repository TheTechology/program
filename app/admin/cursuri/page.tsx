import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import {
  createCourseAction,
  deleteCourseAction,
  toggleCoursePublishAction,
  updateCourseAction
} from "@/app/actions/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({ title: "Admin Cursuri", path: "/admin/cursuri" });

export default async function AdminCoursesPage() {
  const courses = await db.course.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-white p-6">
        <h1 className="font-display text-3xl font-bold">CRUD Cursuri</h1>
        <form action={createCourseAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="title" placeholder="Titlu" required />
          <Input name="slug" placeholder="slug-curs" required />
          <Input name="shortDesc" placeholder="Descriere scurtă" required />
          <Input name="description" placeholder="Descriere completă" required />
          <Input name="category" placeholder="Categorie" required />
          <Input name="level" placeholder="Nivel" required />
          <Input name="ageGroup" placeholder="Grupă vârstă" required />
          <Input name="format" placeholder="LIVE/RECORDED/HYBRID" required />
          <Input name="durationText" placeholder="Durată" required />
          <Input name="priceRon" type="number" placeholder="Preț RON" required />
          <Input name="imageUrl" placeholder="Image URL" />
          <Input name="instructorName" placeholder="Instructor" />
          <Input name="learnPoints" placeholder="punct1, punct2, punct3" className="md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Creează curs</Button>
        </form>
      </section>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="font-display text-2xl font-bold">Lista cursuri</h2>
        <div className="mt-4 space-y-2">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2 rounded border p-3">
              <p className="text-sm text-muted-foreground">
                {course.slug} • {course.published ? "Public" : "Draft"}
              </p>
              <form action={updateCourseAction} className="grid gap-2 md:grid-cols-4">
                <input type="hidden" name="id" value={course.id} />
                <Input name="title" defaultValue={course.title} />
                <Input name="priceRon" type="number" defaultValue={course.priceRon} />
                <Input name="category" defaultValue={course.category} />
                <Button type="submit" variant="outline">
                  Actualizează
                </Button>
              </form>
              <div className="flex gap-2">
                <form action={toggleCoursePublishAction}>
                  <input type="hidden" name="id" value={course.id} />
                  <Button type="submit" variant="outline">
                    {course.published ? "Dezactivează" : "Publică"}
                  </Button>
                </form>
                <form action={deleteCourseAction}>
                  <input type="hidden" name="id" value={course.id} />
                  <Button type="submit" variant="danger">
                    Șterge
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
