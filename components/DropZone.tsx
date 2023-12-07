"use client";

import Ripple from '@/components/ui/ripple'

// Hooks
import { FileRejection, useDropzone } from "react-dropzone";
import useFileUpload from "@/hooks/useFileUpload";
import { useCallback, useEffect, useState } from "react";
import { useRipple } from '@/components/ui/use-ripple'

// Icons
import { VscFiles } from "react-icons/vsc";
import { FaCloudUploadAlt } from "react-icons/fa";


export default function DropZone() {
  const { ripples, onClick, onClear } = useRipple()

  const uploadFiles = useFileUpload();

  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const handleFiles = useCallback((files: File[]) => {
    files.forEach((file) => {
      uploadFiles(file)
    });
  }, [uploadFiles]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    handleFiles(acceptedFiles);

    if (fileRejections?.length) {
      setRejected((previousFiles) => [...previousFiles, ...fileRejections]);
    }
  }, [handleFiles]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { file: ["application/pdf"] },
    maxSize: 1024 * 1000 * 50,
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file));
  }, [files]);

  return (
    <div className="bg-slate-800 select-none relative overflow-hidden mx-auto w-80 h-72 cursor-pointer rounded-3xl space-y-12 font-bold text-white drop-shadow-lg border border-[#FF1CF7] hover:backdrop-blur-xl backdrop-blur-lg shadow-custom"
      onClick={(event) => onClick(event)}>
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
      <Ripple ripples={ripples} onClear={onClear} className="absloute inset-0" />
    </div>
  );
}