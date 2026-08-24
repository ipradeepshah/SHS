import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has("siyaram_admin_session");
  return NextResponse.json({ isAuth });
}
