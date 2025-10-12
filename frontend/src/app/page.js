import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPage from "./(auth)/login/page";

export default async function HomePage() {
  const session = await getServerSession();

  // If the user is already logged in, send them to the dashboard.
  if (session) {
    redirect("/dashboard");
  }

  // If there's no session, render the Login page as the default homepage.
  return <LoginPage />;
}
