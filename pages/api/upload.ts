import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import unzipper from "unzipper";
import fs from "fs";
import path from "path";
import { addUpdateMetaToDB } from "../../lib/server-actions";
import { auth } from "../../auth";

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadMiddleware = upload.single("file_upload");

const handleUploadAndUnzip = async (req: NextApiRequest, res: NextApiResponse) => {
  const { file_name, runtime_version, update_description, file_size, uploaded_by } = req.body;
  const file = (req as any).file;

  if (!uploaded_by || !uploaded_by.length) {
    return res.status(400).json({ error: "Please Login to continue" });
  }

  if (!file.originalname.endsWith(".zip")) {
    return res.status(400).json({ error: "Please upload a ZIP file" });
  }

  const uploadDir = path.join(process.cwd(), `updates/${runtime_version}`);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    const uploadTime = Date.now();
    await unzipper.Open.buffer(file.buffer).then(async (directory) => {
      for (const entry of directory.files) {
        const entry_path = entry.path.replace("dist", uploadTime.toString());
        if (entry_path.toLowerCase().startsWith("__macos")) {
          continue;
        }
        const filePath = path.join(uploadDir, entry_path);
        if (entry.type === "File") {
          // Ensure the parent directory exists
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
          const fileStream = entry.stream();
          const writeStream = fs.createWriteStream(filePath);
          await new Promise((resolve, reject) => {
            fileStream.pipe(writeStream).on("finish", resolve).on("error", reject);
          });
        }
      }
    });

    // add meta data to firebase
    await addUpdateMetaToDB({
      deployment: "Production",
      downloads: 0,
      enabled: true,
      is_rollback: false,
      mandatory: true,
      name: uploadTime.toString(),
      release_method: "Upload",
      runtime_version: runtime_version,
      size: Number(file_size),
      timestamp: uploadTime,
      uploaded_by: uploaded_by,
      description: update_description,
    });

    return res.status(200).json({
      message: "File uploaded and extracted successfully",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      error: `Error extracting file: ${error.message ?? "Extraction Failed"}`,
    });
  }
};

export const config = {
  api: {
    bodyParser: false,
    // externalResolver: true,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    uploadMiddleware(req as any, res as any, () => {
      handleUploadAndUnzip(req, res);
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
