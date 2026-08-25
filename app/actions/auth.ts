"use server";

import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "siyaram_admin_session";

export async function login(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD || "sahoo123";

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return true;
  }

  return false;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE_NAME);
}
