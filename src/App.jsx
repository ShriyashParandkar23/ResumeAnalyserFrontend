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

  {/* Mobile Dropdown */}
  <div className="md:hidden px-6 mb-4">
    <label className="block mb-2 text-gray-700 font-semibold">Select Tool</label>
    <select
      value={showcaseTool}
      onChange={(e) => setShowcaseTool(e.target.value)}
      className="w-full p-2 border rounded-lg"
    >
      <option value="resumeAnalyser">Resume Analyzer</option>
      <option value="jobMatchChecker">Job Match Checker</option>
      <option value="jobFinder">Best-Fit Jobs Finder</option>
    </select>
  </div>

  {/* Main Grid Layout */}
  <div className="main grid grid-cols-1 md:grid-cols-12 min-h-screen bg-gray-100 md:px-6 pb-2 md:pb-6 gap-4">
    
    {/* Sidebar Tools - visible only on md+ screens */}
    <div className="tools hidden md:block col-span-3 bg-white rounded-2xl shadow-md p-4">
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
        {/* <li
          className={`p-2 rounded-lg cursor-pointer transition-all ${
            showcaseTool === 'jobFinder' ? 'bg-blue-100 font-semibold' : 'bg-gray-50'
          }`}
          onClick={() => setShowcaseTool("jobFinder")}
        >
          Best-Fit Jobs Finder
        </li> */}
      </ul>
    </div>

    {/* Main Showcase */}
    <div className="border border-gray-200 col-span-9 rounded-xl p-4 bg-gray-50">
        {showcaseTool === "resumeAnalyser" && <PDFDropzone />}
        {showcaseTool === "jobMatchChecker" && <JobMatchChecker />}
        {/* {showcaseTool === "jobFinder" && "Resume Best-Fit Jobs Finder"} */}
      </div>
  </div>
</>

  );
}

export default App;
