import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { lessonId, completed } = (await request.json()) as { lessonId: string; completed: boolean };

  await db.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId
      }
    },
    create: {
      userId: session.user.id,
      lessonId,
      completedAt: completed ? new Date() : null
    },
    update: {
      completedAt: completed ? new Date() : null
    }
  });

  return NextResponse.json({ ok: true });
}
