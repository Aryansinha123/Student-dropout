import { getCurrentUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <HomeClient user={user} />;
}