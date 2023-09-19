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

// Helper function
async function extractTextFromPage(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const strings = textContent.items.map((item) => item.str);
  return strings.join(" ");
}

export default function DropZone({ className }) {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [text, setText] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // Implementing onDrop functionality
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const blob = new Blob([reader.result], { type: file.type });
        const blobURL = URL.createObjectURL(blob);
        setFiles((previousFiles) => [...previousFiles, blobURL]);

        // Creating the PDF object
        const pdf = await pdfjs.getDocument(blobURL).promise;
        
        // Parsing file metadata
        const metadata = await pdf.getMetadata();
        authorName = metadata.info.Author
        title = metadata.info.Title

        // Extract text
        const text = await extractTextFromPage(pdf, 1);
        setText(text);

        // Generate thumbnail
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        const thumbnail = canvas.toDataURL();
        setThumbnail(thumbnail);

        // Save to db
        await saveToDatabase(file, thumbnail, authorName, title);

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

  // DropZone Hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "application/pdf",
    maxSize: 1024 * 1000 * 50,
    maxFiles: 1,
    onDrop,
  });

  // Implementing cleanup functions and actions
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file));
  }, [files]);

  const removeFile = async (file) => {
    setFiles((files) => files.filter((f) => f !== file));
    await removeFiles(file.name);
  };

  // Empty the file list and delete the DB
  const removeAll = async () => {
    setFiles([]);
    setRejected([]);
    await removeAllFiles(); // Remove all files from the database
  };

  // Empty the rejected file list
  const removeRejected = (file) => {
    setRejected((files) => files.filter((f) => f !== file));
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
        <div>
          {text && <p className="!bg-slate-800 p-6 rounded-3xl">{text}</p>}
          {thumbnail && <img src={thumbnail} alt="Thumbnail" />}
        </div>
      </div>
    </form>
  );
}
