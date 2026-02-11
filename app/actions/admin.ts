"use server";

import { revalidatePath } from "next/cache";
import { CourseFormat, SessionVisibility, UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";

async function audit(action: string, entityType: string, entityId: string, payload?: unknown) {
  const admin = await requireAdmin();
  await db.auditLog.create({
    data: {
      adminId: admin.id,
      action,
      entityType,
      entityId,
      payload: payload as object
    }
  });
}

export async function createCourseAction(formData: FormData) {
  const admin = await requireAdmin();

  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");

  const created = await db.course.create({
    data: {
      title,
      slug,
      shortDesc: String(formData.get("shortDesc") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "General"),
      level: String(formData.get("level") || "Începător"),
      ageGroup: String(formData.get("ageGroup") || "10-18 ani"),
      format: (String(formData.get("format") || "RECORDED") as CourseFormat) || "RECORDED",
      durationText: String(formData.get("durationText") || "8 săptămâni"),
      priceRon: Number(formData.get("priceRon") || 0),
      imageUrl:
        String(formData.get("imageUrl") || "") ||
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
      instructorName: String(formData.get("instructorName") || admin.name || "Instructor"),
      learnPoints: String(formData.get("learnPoints") || "Fundamente, Proiect final")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      faq: [
        { q: "Este potrivit pentru începători?", a: "Da, conținutul este ghidat." },
        { q: "Se oferă suport?", a: "Da, în sesiuni live și Q&A." }
      ]
    }
  });

  await audit("CREATE", "Course", created.id, { title: created.title });
  revalidatePath("/admin/cursuri");
  revalidatePath("/cursuri");
}

export async function toggleCoursePublishAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  const course = await db.course.findUnique({ where: { id } });
  if (!course) return;

  await db.course.update({ where: { id }, data: { published: !course.published } });
  await audit("TOGGLE_PUBLISH", "Course", id, { published: !course.published });
  revalidatePath("/admin/cursuri");
  revalidatePath("/cursuri");
}

export async function updateCourseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  const updated = await db.course.update({
    where: { id },
    data: {
      title: String(formData.get("title") || ""),
      priceRon: Number(formData.get("priceRon") || 0),
      category: String(formData.get("category") || "General")
    }
  });

  await audit("UPDATE", "Course", id, {
    title: updated.title,
    priceRon: updated.priceRon
  });
  revalidatePath("/admin/cursuri");
  revalidatePath("/cursuri");
}

export async function deleteCourseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  await db.course.delete({ where: { id } });
  await audit("DELETE", "Course", id);
  revalidatePath("/admin/cursuri");
  revalidatePath("/cursuri");
}

export async function createLiveSessionAction(formData: FormData) {
  await requireAdmin();

  const created = await db.liveSession.create({
    data: {
      courseId: String(formData.get("courseId") || ""),
      title: String(formData.get("title") || ""),
      startAt: new Date(String(formData.get("startAt") || new Date().toISOString())),
      durationMin: Number(formData.get("durationMin") || 60),
      meetingUrl: String(formData.get("meetingUrl") || ""),
      notes: String(formData.get("notes") || ""),
      visibility: (String(formData.get("visibility") || "ENROLLED") as SessionVisibility) || "ENROLLED"
    }
  });

  await audit("CREATE", "LiveSession", created.id, { title: created.title });
  revalidatePath("/admin/sesiuni");
}

export async function updateLiveSessionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  const updated = await db.liveSession.update({
    where: { id },
    data: {
      title: String(formData.get("title") || ""),
      startAt: new Date(String(formData.get("startAt") || new Date().toISOString())),
      durationMin: Number(formData.get("durationMin") || 60),
      meetingUrl: String(formData.get("meetingUrl") || ""),
      visibility: (String(formData.get("visibility") || "ENROLLED") as SessionVisibility) || "ENROLLED"
    }
  });

  await audit("UPDATE", "LiveSession", id, { title: updated.title });
  revalidatePath("/admin/sesiuni");
}

export async function deleteLiveSessionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");

  await db.liveSession.delete({ where: { id } });
  await audit("DELETE", "LiveSession", id);
  revalidatePath("/admin/sesiuni");
}

export async function updateUserRoleAction(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");
  const role = String(formData.get("role") || "USER") as UserRole;

  await db.user.update({ where: { id: userId }, data: { role } });
  await audit("UPDATE_ROLE", "User", userId, { role });
  revalidatePath("/admin/utilizatori");
}
