"use client";

import { useState } from "react";

export default function PredictPage() {
  const [attendance, setAttendance] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendance: parseFloat(attendance),
        cgpa: parseFloat(cgpa),
        backlogs: parseInt(backlogs),
      }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Student Risk Prediction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Attendance (%)"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            placeholder="Backlogs"
            value={backlogs}
            onChange={(e) => setBacklogs(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Predict Risk
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <p>Fuzzy Score: {result.fuzzy_score.toFixed(2)}</p>
            <p>ANN Score: {result.ann_score.toFixed(2)}</p>
            <p className="font-bold">
              Final Score: {result.final_score.toFixed(2)}
            </p>
            <p className="text-lg mt-2">
              Category: {result.category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}