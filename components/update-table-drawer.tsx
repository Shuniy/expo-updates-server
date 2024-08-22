"use client";

import { Button } from "./ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { UpdateMetaDataDB } from "../common/models";

type UpdateTableDrawerParams = {
  filename: string;
  timestamp: string;
  runtimeVersion: string;
  updateMetaData?: UpdateMetaDataDB;
};

export default function UpdateTableDrawer(params: UpdateTableDrawerParams) {
  console.log(params);
  if (!params.updateMetaData) {
    return (
      <DrawerContent className="min-h-40 flex flex-col justify-center">
        <p className="text-card-foreground jst bg-card rounded-md text-center p-3 m-3">
          Loading, Please wait......
        </p>
      </DrawerContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-primary">
          Update: {params.filename} for runtime: V{params.runtimeVersion}
        </DrawerTitle>
        <DrawerDescription>
          Details of update: {params.filename} for runtime version: V{params.runtimeVersion}
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-row justify-between items-center gap-3 m-4">
        <section className="flex flex-col gap-3 bg-card text-card-foreground rounded-md p-3 w-full">
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Update Name:</p>
            <p className="text-primary text-sm">{params.updateMetaData.name}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Deployment:</p>
            <p className="text-primary text-sm">{params.updateMetaData.deployment}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Enabled:</p>
            <p className="text-primary text-sm">{params.updateMetaData.enabled.toString()}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Mandatory:</p>
            <p className="text-primary text-sm">{params.updateMetaData.mandatory.toString()}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Size:</p>
            <p className="text-primary text-sm">
              {(params.updateMetaData.size / 1000).toString()}KB
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Runtime Version:</p>
            <p className="text-primary text-sm">V{params.updateMetaData.runtime_version}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Description:</p>
            <p className="text-primary text-sm">{params.updateMetaData.description}</p>
          </div>
        </section>
        <section className="flex flex-col gap-3 p-3 bg-card text-card-foreground rounded-md w-full">
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Uploaded on:</p>
            <p className="text-primary text-sm">
              {new Date(params.updateMetaData.timestamp).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Uploaded by:</p>
            <p className="text-primary text-sm">{params.updateMetaData.uploaded_by}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Downloads:</p>
            <p className="text-primary text-sm">{params.updateMetaData.downloads ?? "None"}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Is Rollback?:</p>
            <p className="text-primary text-sm">{params.updateMetaData.is_rollback.toString()}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Release Method:</p>
            <p className="text-primary text-sm">{params.updateMetaData.release_method}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-medium">Rollbacks:</p>
            <p className="text-primary text-sm">{params.updateMetaData.rollbacks ?? "None"}</p>
          </div>
        </section>
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button className="w-full">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
