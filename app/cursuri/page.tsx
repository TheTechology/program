import type { CourseFormat } from "@prisma/client";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getCatalog } from "@/lib/catalog";
import { JsonLd } from "@/components/json-ld";
import { CourseCard } from "@/components/course-card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/pagination";
import { COURSE_SORTS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Catalog Cursuri",
  description: "Filtrează și găsește cursul potrivit copilului tău.",
  path: "/cursuri"
});

export default async function CursuriPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const level = typeof searchParams.level === "string" ? searchParams.level : "";
  const ageGroup = typeof searchParams.ageGroup === "string" ? searchParams.ageGroup : "";
  const format = typeof searchParams.format === "string" ? (searchParams.format as CourseFormat) : "";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "recommended";
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const data = await getCatalog({ q, category, level, ageGroup, format, sort, page });

  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  if (category) qs.set("category", category);
  if (level) qs.set("level", level);
  if (ageGroup) qs.set("ageGroup", ageGroup);
  if (format) qs.set("format", format);
  if (sort) qs.set("sort", sort);
  qs.set("page", String(page));

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
          { name: "Cursuri", item: `${process.env.NEXT_PUBLIC_SITE_URL}/cursuri` }
        ])}
      />
      <div>
        <h1 className="font-display text-4xl font-bold">Catalog Cursuri</h1>
        <p className="text-muted-foreground">Filtre, căutare full-text, sortare și paginare SEO-friendly.</p>
      </div>

      <form className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-6" method="GET">
        <div className="md:col-span-2">
          <Input name="q" defaultValue={q} placeholder="Caută cursuri..." />
        </div>
        <Select name="category" defaultValue={category}>
          <option value="">Categorie</option>
          {data.facets.categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select name="level" defaultValue={level}>
          <option value="">Nivel</option>
          {data.facets.levels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select name="ageGroup" defaultValue={ageGroup}>
          <option value="">Vârstă</option>
          {data.facets.ageGroups.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select name="format" defaultValue={format}>
          <option value="">Format</option>
          <option value="LIVE">Live</option>
          <option value="RECORDED">Înregistrat</option>
          <option value="HYBRID">Hybrid</option>
        </Select>
        <Select name="sort" defaultValue={sort}>
          {COURSE_SORTS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <button type="submit" className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-white">
          Aplică filtrele
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <Pagination page={page} totalPages={data.totalPages} basePath="/cursuri" query={qs} />
    </div>
  );
}
