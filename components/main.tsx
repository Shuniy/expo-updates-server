"use client";

import { useEffect, useState } from "react";
import AppContext from "../lib/app-context";
import VersionSelect from "./version-select";
import UpdatesTable from "./updates-table";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import CustomLink from "./custom-link";
import { Session } from "next-auth";

type MainParams = {
  updates: Record<string, string[]>;
  session: Session;
};

export default function Main(params: MainParams) {
  const defaultValue = Object.keys(params.updates ?? []).sort((a, b) => {
    return Number(b) - Number(a);
  })[0];
  const [selectedRuntimeVersion, setSelectedRuntimeVersion] = useState<string | undefined>(
    defaultValue,
  );

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedRuntimeVersion: selectedRuntimeVersion,
        setSelectedRuntimeVersion: setSelectedRuntimeVersion,
        allUpdatesMetaData: params.updates,
        session: params.session,
      }}>
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex justify-between gap-3">
          <div className="flex gap-3 items-center">
            <p className="text-primary font-bold">Runtime Version:</p>
            <VersionSelect />
          </div>
          <Button>
            <CustomLink className="w-full" href={"/upload"}>
              Upload
            </CustomLink>
          </Button>
        </div>
        {selectedRuntimeVersion ? (
          <UpdatesTable
            runtimeVersion={selectedRuntimeVersion}
            updateMetaData={params.updates[selectedRuntimeVersion]}
          />
        ) : (
          <p className="text-lg text-center text-primary">
            Nothing to show here, no active update uploaded
          </p>
        )}
      </div>
    </AppContext.Provider>
  );
}
