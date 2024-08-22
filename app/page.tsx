import { redirect } from "next/navigation";
import { auth } from "../auth";
import Main from "../components/main";
import fs from "fs";

function getDirectories(path: string) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

async function createUpdatesDirectory() {
  const directoryPath = process.cwd() + "/updates";
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Directory '${directoryPath}' created.`);
  } else {
    return;
  }
}

export default async function Index() {
  const session = await auth();
  await createUpdatesDirectory();

  const createUpdateDatabase = () => {
    const result: Record<string, string[]> = {};
    const runtimeUpdates = getDirectories(process.cwd() + "/updates");
    const allRuntimeUpdates = runtimeUpdates.sort((a, b) => {
      return Number(b) - Number(a);
    });

    if (!allRuntimeUpdates.length) {
      return result;
    }

    allRuntimeUpdates.forEach((value, i) => {
      result[value] = getDirectories(`./updates/${value}`);
    });
    return result;
  };
  const allUpdates: Record<string, string[]> = createUpdateDatabase();

  if (!session?.user) {
    redirect("/login");
  }

  return <Main session={session} updates={allUpdates} />;
}
