import { auth } from "../../auth";
import { redirect } from "next/navigation";
import LoginView from "../../components/login";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <LoginView />;
}
