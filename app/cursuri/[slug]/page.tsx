import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { formatRon } from "@/lib/utils";
import { CourseCard } from "@/components/course-card";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await db.course.findUnique({ where: { slug: params.slug } });

  if (!course) {
    return buildMetadata({ title: "Curs inexistent", path: `/cursuri/${params.slug}` });
  }

  return buildMetadata({
    title: course.title,
    description: course.shortDesc,
    path: `/cursuri/${course.slug}`
  });
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: {
      modules: { include: { lessons: { orderBy: { position: "asc" } } }, orderBy: { position: "asc" } },
      liveSessions: { where: { startAt: { gte: new Date() } }, orderBy: { startAt: "asc" } }
    }
  });

  if (!course || !course.published) notFound();

  const related = await db.course.findMany({
    where: { category: course.category, id: { not: course.id }, published: true },
    take: 3
  });

  const faq = Array.isArray(course.faq) ? (course.faq as Array<{ q: string; a: string }>) : [];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Youth Code Academy"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RON",
      price: course.priceRon,
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <div className="space-y-8">
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
          { name: "Cursuri", item: `${process.env.NEXT_PUBLIC_SITE_URL}/cursuri` },
          { name: course.title, item: `${process.env.NEXT_PUBLIC_SITE_URL}/cursuri/${course.slug}` }
        ])}
      />

      <section className="rounded-2xl border bg-white p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{course.category}</Badge>
          <Badge className="bg-muted text-muted-foreground">{course.level}</Badge>
          <Badge className="bg-muted text-muted-foreground">{course.ageGroup}</Badge>
          <Badge className="bg-muted text-muted-foreground">{course.format}</Badge>
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold">{course.title}</h1>
        <p className="mt-3 text-muted-foreground">{course.shortDesc}</p>
        <p className="mt-3 text-2xl font-bold text-primary">{formatRon(course.priceRon)}</p>

        <div className="mt-4 flex gap-3">
          <AddToCartButton courseId={course.id} />
          <Link href="/checkout" className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-semibold">
            Cumpără acum
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="font-display text-2xl font-bold">Ce înveți</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {course.learnPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <h3 className="mt-5 text-lg font-semibold">Descriere</h3>
          <p className="text-sm text-muted-foreground">{course.description}</p>
          <p className="mt-4 text-sm">
            <strong>Durată:</strong> {course.durationText}
          </p>
          <p className="text-sm">
            <strong>Instructor:</strong> {course.instructorName}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="font-display text-2xl font-bold">Curriculum</h2>
          <div className="mt-3 space-y-3">
            {course.modules.map((module) => (
              <div key={module.id} className="rounded-md border p-3">
                <p className="font-semibold">{module.position}. {module.title}</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.title} {lesson.isPreview ? "(Preview gratuit)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {course.modules.length === 0 && <p className="text-sm text-muted-foreground">Curriculum în curs de publicare.</p>}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="font-display text-2xl font-bold">FAQ curs</h2>
        <div className="mt-3 space-y-3">
          {faq.map((item) => (
            <div key={item.q}>
              <p className="font-semibold">{item.q}</p>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="font-display text-2xl font-bold">Sesiuni live viitoare</h2>
        <div className="mt-3 space-y-3">
          {course.liveSessions.length === 0 && <p className="text-sm text-muted-foreground">Momentan nu există sesiuni programate.</p>}
          {course.liveSessions.map((session) => (
            <div key={session.id} className="rounded-md border p-3">
              <p className="font-semibold">{session.title}</p>
              <p className="text-sm text-muted-foreground">{new Date(session.startAt).toLocaleString("ro-RO")}</p>
              <p className="text-xs text-muted-foreground">Link vizibil în portal după înscriere.</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold">Cursuri similare</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
