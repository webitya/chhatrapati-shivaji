import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Simple admin credentials - in production, use proper authentication
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123",
}

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set authentication cookie
      cookies().set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
