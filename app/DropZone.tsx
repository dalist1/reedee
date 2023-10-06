"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { VscFiles } from "react-icons/vsc";
import { FaCloudUploadAlt } from "react-icons/fa";
import { removeFile, removeAllFiles } from "./_actions";
import { processFile } from "./_actions";
import { pdfjs } from "react-pdf";
import useFileUpload from "@/hooks/useFileUpload";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "/public/pdf.worker.min.js",
  import.meta.url
).toString();

export default function DropZone({ className: string }) {
  const uploadFiles = useFileUpload();

  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      processFile(file)
        .then(({ file, thumbnail, authorName, title, pdf }) => {
          setFiles((previousFiles) => [...previousFiles, file]);
          uploadFiles({ file, thumbnail, authorName, title, pdf });
        })
        .catch((error) => {
          console.error("Error processing file:", error);
        });
    });

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "application/pdf",
    maxSize: 1024 * 1000 * 50,
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file));
  }, [files]);

  const removeFile = async (file: File) => {
    setFiles((files) => files.filter((f) => f !== file));
    await removeFiles(file.name);
  };

  const removeAll = async () => {
    setFiles([]);
    setRejected([]);
    await removeAllFiles();
  };

  const removeRejected = (file: File) => {
    setRejected((files) => files.filter((f) => f !== file));
  };

const action = async (event) => {
  event.preventDefault(); // prevent form submission
  const file = files[0];
  if (!file) return;
};
  return (
    <div className="flex h-full w-full justify-center items-center max-w-md mx-auto">
      <div className="bg-gray-400 w-11/12 h-2/5 cursor-pointer flex rounded-3xl space-y-12 font-bold flex-col items-center justify-center text-white bg-opacity-20 drop-shadow-lg border border-[#FF1CF7] hover:backdrop-blur-lg backdrop-blur-md shadow-custom">
        <form action={action}>
          <div
            {...getRootProps({
              className:
                "flex flex-col gap-y-10 justify-center items-center w-full h-full",
            })}
          >
            <input {...getInputProps({ name: "file" })} />
            <>
              {isDragActive ? (
                <VscFiles size={90} />
              ) : (
                <>
                  <FaCloudUploadAlt size={90} />
                  <div className="flex gap-x-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600">
                      Drag & drop
                    </span>
                    <span>or</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                      click
                    </span>
                    <span>to upload.</span>
                  </div>
                </>
              )}
            </>
          </div>
        </form>
      </div>
    </div>
  );
}
