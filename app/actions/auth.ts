"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { signIn, signOut } from "@/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/cont"
  });
}

export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || password.length < 6) {
    throw new Error("Date invalide.");
  }

  const exists = await db.user.findUnique({ where: { email } });
  if (exists) throw new Error("Există deja un cont cu acest email.");

  await db.user.create({
    data: {
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10)
    }
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/cont"
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function googleLoginAction() {
  await signIn("google", { redirectTo: "/cont" });
}

export async function updateProfileAction(userId: string, formData: FormData) {
  const name = String(formData.get("name") || "");
  const image = String(formData.get("image") || "");

  await db.user.update({
    where: { id: userId },
    data: { name, image }
  });

  redirect("/cont/profil");
}
