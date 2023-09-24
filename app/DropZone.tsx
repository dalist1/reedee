"use client";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { VscFiles } from "react-icons/vsc";
import { FaCloudUploadAlt } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import { saveToDatabase, removeFiles, removeAllFiles } from "./_actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

async function extractTextFromPage(pdf: PDFDocumentProxy, pageNumber: number) {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const strings = textContent.items.map((item) => item.str);
  return strings.join(" ");
}

export default function DropZone({ className }: { className: string }) {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [text, setText] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // React query
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: uploadFiles } = useMutation({
    mutationFn: async ({ file, thumbnail, authorName, title }) =>
      await saveToDatabase(file, thumbnail, authorName, title),
    onSuccess: () => {
      queryClient.invalidateQueries(["userFiles"]);
    },
    onError: () => {
      toast({ description: "Error uploading files." });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const blobURL = URL.createObjectURL(
          new Blob([reader.result as ArrayBuffer], { type: file.type })
        );

        setFiles((previousFiles) => [...previousFiles, blobURL]);

        const pdf = await pdfjs.getDocument(blobURL).promise;

        const metadata = await pdf.getMetadata();
        const authorName: string = metadata.info.Author;
        const title: string = metadata.info.Title;

        const text = await extractTextFromPage(pdf, 1);
        setText(text);

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        const thumbnail = canvas.toDataURL();

        uploadFiles({ file, thumbnail, authorName, title });
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsArrayBuffer(file);
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

  const action = async () => {
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
            <div>
              {text && <p className="!bg-slate-800 p-6 rounded-3xl">{text}</p>}
              {thumbnail && <img src={thumbnail} alt="Thumbnail" />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
