import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  });

  const res = NextResponse.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
