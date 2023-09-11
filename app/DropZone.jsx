"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// import { saveToDatabase } from "./_actions";
import { VscFiles } from "react-icons/vsc";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function DropZone({ className }) {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  // Implementing onDrop functionality
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  // DropZone Hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop,
  });

  // Implememting cleanup functions and actions

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  // Empty the file list
  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  // Empty the rejected file list
  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const action = async () => {
    const file = files[0];
    if (!file) return;
  };

  return (
    <form action={action}>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps({ name: "file" })} />
        <>
          {isDragActive ? (
            <VscFiles size={90} />
          ) : (
            <>
              <FaCloudUploadAlt size={90} />
              <div className="flex space-x-2">
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
  );
}
