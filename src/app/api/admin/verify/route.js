import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ must be awaited
    const authCookie = cookieStore.get("admin-auth");

    if (authCookie && authCookie.value === "authenticated") {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false });
  } catch (err) {
    console.error("Verify API Error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
