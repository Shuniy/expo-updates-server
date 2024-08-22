import { auth } from "../../auth";
import { redirect } from "next/navigation";
import ForgotPasswordView from "../../components/forgot-password";

export default async function ForgotPassword() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <ForgotPasswordView />;
}
