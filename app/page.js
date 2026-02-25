// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [formData, setFormData] = useState({});
//   const [result, setResult] = useState(null);

//   // All dataset features (must match backend feature names exactly)
//   const features = [
//     "Marital Status",
//     "Application mode",
//     "Application order",
//     "Course",
//     "Daytime/evening attendance",
//     "Previous qualification",
//     "Previous qualification (grade)",
//     "Nacionality",
//     "Mother's qualification",
//     "Father's qualification",
//     "Mother's occupation",
//     "Father's occupation",
//     "Admission grade",
//     "Displaced",
//     "Educational special needs",
//     "Debtor",
//     "Tuition fees up to date",
//     "Gender",
//     "Scholarship holder",
//     "Age at enrollment",
//     "International",
//     "Curricular units 1st sem (credited)",
//     "Curricular units 1st sem (enrolled)",
//     "Curricular units 1st sem (evaluations)",
//     "Curricular units 1st sem (approved)",
//     "Curricular units 1st sem (grade)",
//     "Curricular units 1st sem (without evaluations)",
//     "Curricular units 2nd sem (credited)",
//     "Curricular units 2nd sem (enrolled)",
//     "Curricular units 2nd sem (evaluations)",
//     "Curricular units 2nd sem (approved)",
//     "Curricular units 2nd sem (grade)",
//     "Curricular units 2nd sem (without evaluations)",
//     "Unemployment rate",
//     "Inflation rate",
//     "GDP"
//   ];

//   const requiredFields = [
//     "Admission grade",
//     "Age at enrollment"
//   ];

//   const handleChange = (e, feature) => {
//     setFormData({
//       ...formData,
//       [feature]: parseFloat(e.target.value)
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check required fields
//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         alert(`${field} is required`);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/predict",
//         { data: formData }
//       );

//       setResult(response.data);

//     } catch (error) {
//       console.error(error);
//       alert("Prediction failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 text-black">
//       <h1 className="text-3xl font-bold mb-6">
//         Student Dropout Risk Prediction
//       </h1>

//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//         {features.map((feature, index) => (
//           <div key={index} className="flex flex-col">
//             <label className="font-medium">
//               {feature}
//               {requiredFields.includes(feature) && (
//                 <span className="text-red-500"> *</span>
//               )}
//             </label>
//             <input
//               type="number"
//               step="any"
//               className="p-2 border rounded"
//               onChange={(e) => handleChange(e, feature)}
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="col-span-2 bg-blue-600 text-white p-3 rounded mt-4"
//         >
//           Predict Risk
//         </button>
//       </form>

//       {result && (
//         <div className="mt-8 p-6 bg-white shadow rounded">
//           <h2 className="text-xl font-bold mb-4">Prediction Result</h2>
//           <p><strong>Fuzzy Score:</strong> {result.fuzzyScore}</p>
//           <p><strong>ANN Probability:</strong> {result.annProbability}</p>
//           <p><strong>Final Risk Score:</strong> {result.finalScore}</p>
//           <p><strong>Category:</strong> 
//             <span className="ml-2 font-bold">
//               {result.category}
//             </span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Home() {

  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  // 🔥 ALL 36 FEATURES
  const features = [
    "Marital Status",
    "Application mode",
    "Application order",
    "Course",
    "Daytime/evening attendance",
    "Previous qualification",
    "Previous qualification (grade)",
    "Nacionality",
    "Mother's qualification",
    "Father's qualification",
    "Mother's occupation",
    "Father's occupation",
    "Admission grade",
    "Displaced",
    "Educational special needs",
    "Debtor",
    "Tuition fees up to date",
    "Gender",
    "Scholarship holder",
    "Age at enrollment",
    "International",
    "Curricular units 1st sem (credited)",
    "Curricular units 1st sem (enrolled)",
    "Curricular units 1st sem (evaluations)",
    "Curricular units 1st sem (approved)",
    "Curricular units 1st sem (grade)",
    "Curricular units 1st sem (without evaluations)",
    "Curricular units 2nd sem (credited)",
    "Curricular units 2nd sem (enrolled)",
    "Curricular units 2nd sem (evaluations)",
    "Curricular units 2nd sem (approved)",
    "Curricular units 2nd sem (grade)",
    "Curricular units 2nd sem (without evaluations)",
    "Unemployment rate",
    "Inflation rate",
    "GDP"
  ];

  const requiredFields = ["Admission grade", "Age at enrollment"];

  const handleChange = (e, feature) => {
    setFormData({
      ...formData,
      [feature]: parseFloat(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required`);
        return;
      }
    }

    const response = await axios.post(
      "http://localhost:8000/predict",
      { data: formData }
    );

    setResult(response.data);
  };

  const categoryColor = (category) => {
    if (category === "High") return "bg-red-600";
    if (category === "Medium") return "bg-yellow-500";
    return "bg-green-600";
  };

  const featureStatusColor = (status) => {
    if (status === "Critical") return "bg-red-100 text-red-700";
    if (status === "Worry") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const handleDownload = async () => {
  const response = await axios.post(
    "http://localhost:8000/download-report",
    { data: formData },
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Student_Risk_Report.pdf");
  document.body.appendChild(link);
  link.click();
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10 text-black">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        🎓 Student Dropout Risk Intelligence
      </h1>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Enter Student Details</h2>

        <form onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                {feature}
                {requiredFields.includes(feature) &&
                  <span className="text-red-500"> *</span>}
              </label>

              <input
                type="number"
                step="any"
                className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => handleChange(e, feature)}
              />
            </div>
          ))}

          <button
            className="col-span-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-3 rounded-xl text-lg mt-4">
            Predict Risk
          </button>

        </form>
      </div>

      {/* RESULTS DASHBOARD */}
      {result && (
        <div className="mt-12 space-y-8">

          {/* Risk Gauge */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              Risk Overview
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-10">

              <ResponsiveContainer width={300} height={250}>
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={[{ value: result.finalScore }]}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                  />
                  <RadialBar dataKey="value" />
                </RadialBarChart>
              </ResponsiveContainer>

              <div>
                <p className="text-lg">
                  Final Risk Score:
                  <span className="font-bold text-xl ml-2">
                    {result.finalScore.toFixed(2)}
                  </span>
                </p>

                <div className={`mt-4 px-6 py-2 rounded-full text-white text-lg
                                ${categoryColor(result.category)}`}>
                  {result.category === "Low"
                    ? "Safe"
                    : result.category === "Medium"
                    ? "Worry"
                    : "Critical"}
                </div>
              </div>

            </div>
          </div>

          {/* Major Factors */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              🔥 Major Risk Factors
            </h2>

            <div className="flex flex-wrap gap-3">
              {result.majorFactors.map((factor, i) => (
                <span key={i}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-full">
                  {factor}
                </span>
              ))}
            </div>
          </div>

          {/* Trend */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              📈 Risk Trend Analysis
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={result.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="#6366f1" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Feature Risk Grid */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              📊 Feature Risk Classification
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(result.featureRiskLevels).map(
                ([feature, status], index) => (
                  <div key={index}
                       className={`p-3 rounded-lg text-sm font-medium
                                  ${featureStatusColor(status)}`}>
                    {feature}
                    <div className="text-xs mt-1">{status}</div>
                  </div>
                )
              )}
            </div>
          </div>
<button
  onClick={handleDownload}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
>
  📄 Download PDF Report
</button>
        </div>
      )}

    </div>
  );
}