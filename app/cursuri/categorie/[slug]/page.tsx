import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { CourseCard } from "@/components/course-card";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return buildMetadata({
    title: `Cursuri categorie ${decodeURIComponent(params.slug)}`,
    description: "Pagini categorie indexabile pentru SEO.",
    path: `/cursuri/categorie/${params.slug}`
  });
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = decodeURIComponent(params.slug);
  const courses = await db.course.findMany({ where: { category, published: true } });

  if (!courses.length) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold">Categoria: {category}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
