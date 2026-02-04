import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
