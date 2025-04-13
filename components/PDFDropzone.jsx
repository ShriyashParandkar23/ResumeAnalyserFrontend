import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const PDFDropzone = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setResponse("");
      setError("");

      const formData = new FormData();
      formData.append("resume", selectedFile);

      try {
        setUploading(true);
        const res = await axios.post("https://resumeanalyserbackend.onrender.com/resumeAnalyser", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setResponse(res.data.message);
      } catch (error) {
        console.error("❌ Upload failed:", error.message);
        setError("Something went wrong while uploading the file.");
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white p-1 rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">
        📄 Resume Analyzer
      </h1>
      <div className="max-w-xl mx-auto mt-10 text-center">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all ${
            isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div>
              <p className="text-green-600 font-medium">📄 {file.name}</p>
              {uploading && <p className="text-blue-500 mt-1">Uploading...</p>}
            </div>
          ) : (
            <p>
              {isDragActive
                ? "Drop the PDF here..."
                : "Drag and drop a PDF, or click to select"}
            </p>
          )}
        </div>

        {/* Error message */}
        {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

        {/* ChatGPT Response */}
        {response && (
          <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow text-left">
            <h2 className="text-lg font-semibold mb-2">🚨 Resume ka Reality Check!</h2>
            <p className="whitespace-pre-wrap text-gray-800">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFDropzone;
