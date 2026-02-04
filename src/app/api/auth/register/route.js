import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email });

  if (existing) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
  });

  return NextResponse.json({ ok: true });
}
