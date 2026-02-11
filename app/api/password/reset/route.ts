import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { token, password } = (await req.json()) as { token: string; password: string };

  const reset = await db.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.usedAt || reset.expiresAt < new Date()) {
    return NextResponse.json({ error: "invalid_token" }, { status: 400 });
  }

  await db.user.update({
    where: { email: reset.email },
    data: { passwordHash: await bcrypt.hash(password, 10) }
  });

  await db.passwordReset.update({
    where: { token },
    data: { usedAt: new Date() }
  });

  return NextResponse.json({ ok: true });
}
