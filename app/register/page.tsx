import { auth } from "../../auth";
import { redirect } from "next/navigation";
import RegisterView from "../../components/register";

export default async function Register() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <RegisterView />;
}
