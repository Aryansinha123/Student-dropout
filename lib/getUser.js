import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToDatabase } from "./mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "Please define the JWT_SECRET environment variable inside .env.local"
  );
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    await connectToDatabase();

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}

