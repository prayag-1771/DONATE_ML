import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(request) {
  try {
    const user = await requireAuth(request);
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
