import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [courses, posts] = await Promise.all([
    db.course.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    db.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
  ]);

  const staticPages = [
    "",
    "/cursuri",
    "/calendar",
    "/resurse",
    "/despre",
    "/contact",
    "/ajutor",
    "/legal/termeni",
    "/legal/confidentialitate",
    "/legal/cookies",
    "/legal/rambursari"
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...courses.map((course) => ({
      url: `${base}/cursuri/${course.slug}`,
      lastModified: course.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9
    })),
    ...posts.map((post) => ({
      url: `${base}/resurse/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
