import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function JobMatchChecker() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState(""); // ✅ NEW STATE
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [matchScore, setMatchScore] = useState(null); // ✅ NEW STATE

  const {
    getRootProps: getResumeRootProps,
    getInputProps: getResumeInputProps,
    isDragActive: isResumeDragActive,
  } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setResponse("");
      setError("");
    },
  });

  const handleCheckMatch = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please upload a resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      setUploading(true);
      const res = await axios.post(
        "https://resumeanalyserbackend.onrender.com/jobMatchChecker",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data)
      setResponse(res.data.message);
      setMatchScore(res.data.matchScore); // ✅ SET MATCH SCORE
    } catch (error) {
      console.error("❌ Upload failed:", error.message);
      setError("Something went wrong while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Job Match Checker
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Resume Upload */}
        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Your Resume (PDF)
          </h3>
          <div
            {...getResumeRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all ${
              isResumeDragActive
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            <input {...getResumeInputProps()} />
            {file ? (
              <div>
                <p className="text-green-600 font-medium">📄 {file.name}</p>
                {uploading && (
                  <p className="text-blue-500 mt-1">Uploading...</p>
                )}
              </div>
            ) : (
              <p>
                {isResumeDragActive
                  ? "Drop the PDF here..."
                  : "Drag and drop a PDF, or click to select"}
              </p>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Paste Job Description
          </h3>
          <textarea
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-2 resize-none"
            placeholder="Paste the job description here..."
            value={jobDescription} // ✅ BIND VALUE
            onChange={(e) => setJobDescription(e.target.value)} // ✅ UPDATE STATE
          ></textarea>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCheckMatch} // ✅ CLICK HANDLER
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          {uploading ? "Checking..." : "Check Match"}
        </button>
      </div>

      {/* Match Score or Response */}
      {response && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Match Score
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
            <div
              className="bg-green-500 h-5 rounded-full transition-all"
              style={{ width: `${matchScore || 0}%` }}
            ></div>{" "}
          </div>
          <p className="text-gray-700">
            Your resume matches {matchScore !== null ? `${matchScore}%` : "N/A"}{" "}
            of the job description.
          </p>{" "}

            <div className="bg-slate-100 mt-2 rounded-2xl p-2" dangerouslySetInnerHTML={{ __html: response }}>
            <p className="text-gray-700 mx-2" >
            {response !== null ? response : "N/A"}{" "}
          </p>{" "}
            </div>
         
        </div>
      )}

      {/* Error message */}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default JobMatchChecker;
