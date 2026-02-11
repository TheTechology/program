import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email: string };

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: true });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await db.passwordReset.create({
    data: { email, token, expiresAt }
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset?token=${token}`;
  await sendPasswordResetEmail(email, resetUrl);

  return NextResponse.json({ ok: true });
}
