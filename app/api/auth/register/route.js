import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const {
    name,
    email,
    password,
    registrationNumber,
    department,
    year,
    phone,
  } = await req.json();

  if (!name || !email || !password) {
    return Response.json(
      { message: "Name, email and password are required" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return Response.json(
      { message: "A user with this email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await StudentProfile.create({
    userId: user._id,
    registrationNumber,
    department,
    year,
    phone,
  });

  return Response.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}