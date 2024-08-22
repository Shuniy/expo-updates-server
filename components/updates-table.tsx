"use client";

import { useState } from "react";
import { getUpdateMetaData } from "../lib/server-actions";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import UpdateTableDrawer from "./update-table-drawer";
import { UpdateMetaDataDB } from "../common/models";
import { metadata } from "../app/layout";

type UpdatesTableParams = {
  runtimeVersion: string;
  updateMetaData: string[];
};

export default function UpdatesTable(params: UpdatesTableParams) {
  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<string>("");
  const [updateMetaData, setUpdateMetaData] = useState<UpdateMetaDataDB | undefined>(undefined);

  const handleOpenChange = async (open: boolean) => {
    if (!open) {
      setUpdateMetaData(undefined);
      setSelectedUpdate("");
    }
    setOpen(open);
  };

  const handleUpdateClick = async (timestamp: string) => {
    setSelectedUpdate(timestamp);
    const data = await getUpdateMetaData(timestamp);
    if (data) {
      setUpdateMetaData(data);
    } else {
      setSelectedUpdate("");
      setUpdateMetaData(undefined);
      setOpen(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <UpdateTableDrawer
        runtimeVersion={params.runtimeVersion}
        timestamp={selectedUpdate}
        filename={selectedUpdate}
        updateMetaData={updateMetaData}
      />
      <Table className="bg-card rounded-md">
        <TableCaption className="font-bold">
          Recent Updates for Runtime Version: V{params.runtimeVersion}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">S.No.</TableHead>
            <TableHead className="font-bold">Update Name</TableHead>
            <TableHead className="text-right font-bold">TimeStamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {params.updateMetaData
            .sort((a, b) => {
              return Number(b) - Number(a);
            })
            .map((value, i) => {
              const timestamp = new Date(Number(value));
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <DrawerTrigger
                      onClick={() => {
                        handleUpdateClick(value);
                      }}>
                      {value.toLocaleUpperCase()}
                    </DrawerTrigger>
                  </TableCell>
                  <TableCell className="text-right">
                    {timestamp.toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Drawer>
  );
}
