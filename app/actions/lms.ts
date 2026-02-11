"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/guards";

export async function toggleLessonCompletedAction(formData: FormData) {
  const user = await requireUser();
  const lessonId = String(formData.get("lessonId") || "");
  const slug = String(formData.get("courseSlug") || "");

  const existing = await db.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId
      }
    }
  });

  await db.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId
      }
    },
    create: {
      userId: user.id,
      lessonId,
      completedAt: new Date()
    },
    update: {
      completedAt: existing?.completedAt ? null : new Date()
    }
  });

  revalidatePath(`/cont/cursuri/${slug}`);
}
