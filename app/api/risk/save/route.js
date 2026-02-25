import connectDB from "@/lib/mongodb";
import RiskEntry from "@/models/RiskEntry";
import { getCurrentUser } from "@/lib/getUser";

export async function POST(req) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { features, fuzzyScore, annProbability, finalScore, category } =
    await req.json();

  if (!features || finalScore === undefined || !category) {
    return Response.json(
      { message: "features, finalScore and category are required" },
      { status: 400 }
    );
  }

  await RiskEntry.create({
    userId: user.id,
    features,
    fuzzyScore,
    annProbability,
    finalScore,
    category,
  });

  return Response.json({ message: "Risk entry saved" }, { status: 201 });
}