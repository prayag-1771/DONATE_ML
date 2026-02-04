import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export function requireAuth() {
  const token = cookies().get("token")?.value;

  if (!token) throw new Error("NO_TOKEN");

  return verifyToken(token);
}
