import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const authCookie = cookies().get("admin-auth")

    if (authCookie && authCookie.value === "authenticated") {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
