import { getCurrentUser } from "@/lib/getUser";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const user = await getCurrentUser();
  return <HomeClient user={user} />;
}