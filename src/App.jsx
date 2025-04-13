import React, { useState } from "react";
import PDFDropzone from "../components/PDFDropzone";
import JobMatchChecker from "../components/JobMatchChecker";

function App() {
  const [showcaseTool, setShowcaseTool] = useState("resumeAnalyser");

  return (
    <>
      {/* Navbar Heading */}
      <div className="w-full bg-white shadow-md py-4 mb-6">
        <h1 className="text-center text-3xl font-bold text-gray-800">
        CareerKaRishta
        </h1>
      </div>

      {/* Main Grid Layout */}
      <div className="main grid grid-cols-12 min-h-screen bg-gray-100 px-6 pb-6 gap-4">
        {/* Sidebar Tools */}
        <div className="tools col-span-3 bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Tools</h2>
          <ul className="space-y-2">
            <li
              className={`p-2 rounded-lg cursor-pointer transition-all ${
                showcaseTool === 'resumeAnalyser' ? 'bg-blue-100 font-semibold' : 'bg-gray-50'
              }`}
              onClick={() => setShowcaseTool("resumeAnalyser")}
            >
              Resume Analyzer
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer transition-all ${
                showcaseTool === 'jobMatchChecker' ? 'bg-blue-100 font-semibold' : 'bg-gray-50'
              }`}
              onClick={() => setShowcaseTool("jobMatchChecker")}
            >
              Job Match Checker
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer transition-all ${
                showcaseTool === 'jobFinder' ? 'bg-blue-100 font-semibold' : 'bg-gray-50'
              }`}
              onClick={() => setShowcaseTool("jobFinder")}
            >
              Best-Fit Jobs Finder
            </li>
          </ul>
        </div>

        {/* Main Showcase */}
        <div className="showcaseTool col-span-9 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {showcaseTool === "resumeAnalyser" && "Resume Analyzer"}
            {showcaseTool === "jobMatchChecker" && "Job Match Checker"}
            {showcaseTool === "jobFinder" && "Resume Best-Fit Jobs Finder"}
          </h2>
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            {/* <p className="text-gray-700">Here is the detailed view of Tool 1, shown in a sleek card layout.</p> */}
            {showcaseTool === "resumeAnalyser" && <PDFDropzone/>}
            {showcaseTool === "jobMatchChecker" && <JobMatchChecker/>}
            {showcaseTool === "jobFinder" && "Resume Best-Fit Jobs Finder"}          </div>
        </div>
      </div>
    </>
  );
}

export default App;
