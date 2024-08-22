import { redirect } from "next/navigation";
import { auth } from "../../auth";
import UploadUpdateForm from "../../components/upload-update-form";

export default async function Upload() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return <UploadUpdateForm session={session} />;
}
