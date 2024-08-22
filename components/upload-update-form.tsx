"use client";

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import fetchResponse from "../common/network";
import { useRouter } from "next/navigation";
import CustomLink from "./custom-link";
import { Session } from "next-auth";

type UploadUpdateFormParams = {
  session: Session;
};

export default function UploadUpdateForm(params: UploadUpdateFormParams) {
  const [version, setVersion] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    return () => {
      setFile(undefined);
      setVersion("");
      setError("");
      setLoading(false);
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!file || !version || !params?.session?.user?.email) {
      return;
    }

    const formData = new FormData();
    formData.append("file_name", file.name.replace(".zip", ""));
    formData.append("runtime_version", version);
    formData.append("file_upload", file, file.name);
    formData.append("update_description", description);
    formData.append("file_size", file.size.toString());
    formData.append("uploaded_by", params.session.user.email);

    const response = await fetchResponse<{ message: string }>({
      methodType: "POST",
      body: formData,
      baseUrl: "api/",
      path: "upload/",
    });

    setLoading(false);
    if (response.error || !response.successStatus) {
      setError(response.error ?? "Something Went Wrong");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold text-primary">Upload an update</p>
        <p className="">Make sure update is final and ready to be released</p>
      </div>
      {error && error.length ? (
        <p className="text-center m-3 w-full p-3 text-destructive-foreground mx-auto rounded-md bg-destructive">
          {error}
        </p>
      ) : undefined}

      <form
        encType="multipart/form-data"
        className="flex flex-col bg-card rounded-md mx-auto justify-center p-9 gap-3 w-full">
        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium">File Name:</p>
          <p className="text-primary text-sm">
            {file?.name ?? "Upload a zip file for the update!"}
          </p>
        </div>

        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium">Uploaded by:</p>
          <p className="text-primary text-sm">
            {params?.session?.user?.email ?? "Invalid session, login to continue!"}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-3">
          <label htmlFor="version" className="block text-sm font-medium">
            Version:
          </label>
          <input
            type="number"
            id="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
            className="w-full p-3 border border-primary rounded-md sm:text-sm"
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-3">
          <label htmlFor="version" className="block text-sm font-medium">
            Description:
          </label>
          <input
            type="text"
            id="version"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-primary rounded-md sm:text-sm"
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-3">
          <label htmlFor="file-upload" className="block text-sm font-medium">
            Choose file to upload:
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            required
            accept=".zip"
            className="block w-full borderrounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full"
          type="submit"
          disabled={!file || !version || loading || !params.session.user?.email}
          onClick={handleSubmit}>
          {loading ? <p>Uploading....., Please wait</p> : <p>Upload the update</p>}
        </Button>

        <Button disabled={loading} className="w-full" variant="outline">
          <CustomLink className="w-full" href={"/"}>
            Cancel
          </CustomLink>
        </Button>
      </div>
    </div>
  );
}
