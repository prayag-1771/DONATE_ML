import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET() {
  try {
    const user = requireAuth();
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
