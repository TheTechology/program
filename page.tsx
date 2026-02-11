import Link from "next/link";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: "Tech for Social Impact",
  description: "Cursuri online premium pentru copii și tineri.",
  path: "/"
});

export default async function HomePage() {
  const courses = await db.course.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 });

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-soft lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold">Educație digitală cu sens</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Youth Code Academy
            <span className="block text-primary">Tech for Social Impact</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Platformă completă de cursuri online pentru copii și tineri: coding, AI, cyber și proiecte care rezolvă
            probleme reale din comunitate.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/cursuri">
              <Button>Explorează cursurile</Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline">Vezi calendarul live</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-orange-100 to-sky-100 p-6">
          <p className="font-semibold">Ce găsești în platformă</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Cursuri live, recorded și hybrid</li>
            <li>Portal LMS cu progres și lecții preview</li>
            <li>Sesiuni live pe Google Meet pentru elevii înscriși</li>
            <li>Checkout Stripe securizat</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Cursuri populare</h2>
            <p className="text-muted-foreground">Selectate pentru impact rapid și rezultate măsurabile.</p>
          </div>
          <Link href="/cursuri" className="text-sm font-semibold text-primary">
            Vezi toate
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
