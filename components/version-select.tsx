"use client";

import { useContext, useMemo } from "react";
import AppContext from "../lib/app-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type VersionSelectParams = {};

export default function VersionSelect(params: VersionSelectParams) {
  const { selectedRuntimeVersion, setSelectedRuntimeVersion, allUpdatesMetaData } =
    useContext(AppContext);

  const allRuntimeUpdates = useMemo(() => {
    return Object.keys(allUpdatesMetaData ?? []).sort((a, b) => {
      return Number(b) - Number(a);
    });
  }, [allUpdatesMetaData]);

  const changeSelect = (value: string) => {
    if (setSelectedRuntimeVersion) {
      setSelectedRuntimeVersion(value);
    }
  };

  return (
    <Select defaultValue={selectedRuntimeVersion} onValueChange={changeSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Version">{"V" + selectedRuntimeVersion}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {allRuntimeUpdates &&
          allRuntimeUpdates.map((verison, i) => {
            return (
              <SelectItem key={i} value={verison}>
                {"V" + verison.toLocaleUpperCase()}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
}
