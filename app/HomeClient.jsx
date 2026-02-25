// "use client";

// import { useState } from "react";
// import axios from "axios";

// import {
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import Link from "next/link";

// export default function HomeClient({ user }) {
//   const [formData, setFormData] = useState({});
//   const [result, setResult] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");

//   // ALL 36 FEATURES
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
//     "GDP",
//   ];

//   const requiredFields = ["Admission grade", "Age at enrollment"];

//   const handleChange = (e, feature) => {
//     setFormData({
//       ...formData,
//       [feature]: parseFloat(e.target.value),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         alert(`${field} is required`);
//         return;
//       }
//     }

//     const response = await axios.post("http://localhost:8000/predict", {
//       data: formData,
//     });

//     setResult(response.data);

//     // Persist risk entry for the logged-in user
//     setSaving(true);
//     setSaveError("");
//     try {
//       await axios.post("/api/risk/save", {
//         features: formData,
//         fuzzyScore: response.data.fuzzyScore ?? null,
//         annProbability: response.data.annProbability ?? null,
//         finalScore: response.data.finalScore,
//         category: response.data.category,
//       });
//     } catch (err) {
//       setSaveError("Failed to save risk entry");
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDownload = async () => {
//     const response = await axios.post(
//       "http://localhost:8000/download-report",
//       { data: formData },
//       { responseType: "blob" }
//     );

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "Student_Risk_Report.pdf");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const categoryColor = (category) => {
//     if (category === "High") return "bg-red-600";
//     if (category === "Medium") return "bg-yellow-500";
//     return "bg-green-600";
//   };

//   const featureStatusColor = (status) => {
//     if (status === "Critical") return "bg-red-100 text-red-700";
//     if (status === "Worry") return "bg-yellow-100 text-yellow-700";
//     return "bg-green-100 text-green-700";
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//       window.location.href = "/login";
//     } catch (err) {
//       console.error("Failed to logout", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-black">
//       <nav className="w-full bg-white/70 backdrop-blur border-b border-indigo-100 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className="text-2xl">🎓</span>
//           <span className="text-lg font-semibold text-indigo-700">
//             Student Dropout Risk Intelligence
//           </span>
//         </div>

//         <div className="flex items-center gap-3">
//           {user ? (
//             <>
//               <span className="text-sm text-gray-700">
//                 Logged in as <span className="font-medium">{user.name}</span>
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>

//       <main className="p-10">
//         <h1 className="text-4xl font-bold text-indigo-700 mb-8">
//           Student Dropout Risk Intelligence
//         </h1>

//         {/* FORM */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-6">Enter Student Details</h2>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-3 gap-6"
//           >
//             {features.map((feature, index) => (
//               <div key={index} className="flex flex-col">
//                 <label className="text-sm font-medium mb-1">
//                   {feature}
//                   {requiredFields.includes(feature) && (
//                     <span className="text-red-500"> *</span>
//                   )}
//                 </label>

//                 <input
//                   type="number"
//                   step="any"
//                   className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
//                   onChange={(e) => handleChange(e, feature)}
//                 />
//               </div>
//             ))}

//             <button className="col-span-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg mt-4">
//               {saving ? "Predicting & Saving..." : "Predict Risk"}
//             </button>
//           </form>

//           {saveError && (
//             <p className="mt-3 text-sm text-red-600">{saveError}</p>
//           )}
//         </div>

//         {/* RESULTS DASHBOARD */}
//         {result && (
//           <div className="mt-12 space-y-8">
//             {/* Risk Gauge */}
//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//               <h2 className="text-2xl font-semibold mb-6">Risk Overview</h2>

//               <div className="flex flex-col md:flex-row items-center gap-10">
//                 <ResponsiveContainer width={300} height={250}>
//                   <RadialBarChart
//                     innerRadius="70%"
//                     outerRadius="100%"
//                     data={[{ value: result.finalScore }]}
//                     startAngle={180}
//                     endAngle={0}
//                   >
//                     <PolarAngleAxis
//                       type="number"
//                       domain={[0, 100]}
//                       tick={false}
//                     />
//                     <RadialBar dataKey="value" />
//                   </RadialBarChart>
//                 </ResponsiveContainer>

//                 <div>
//                   <p className="text-lg">
//                     Final Risk Score:
//                     <span className="font-bold text-xl ml-2">
//                       {result.finalScore.toFixed(2)}
//                     </span>
//                   </p>

//                   <div
//                     className={`mt-4 px-6 py-2 rounded-full text-white text-lg ${categoryColor(
//                       result.category
//                     )}`}
//                   >
//                     {result.category === "Low"
//                       ? "Safe"
//                       : result.category === "Medium"
//                       ? "Worry"
//                       : "Critical"}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Major Factors */}
//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//               <h2 className="text-2xl font-semibold mb-4">
//                 🔥 Major Risk Factors
//               </h2>

//               <div className="flex flex-wrap gap-3">
//                 {result.majorFactors?.map((factor, i) => (
//                   <span
//                     key={i}
//                     className="px-4 py-2 bg-red-100 text-red-700 rounded-full"
//                   >
//                     {factor}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Trend */}
//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//               <h2 className="text-2xl font-semibold mb-6">
//                 📈 Risk Trend Analysis
//               </h2>

//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={result.trend}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="risk" stroke="#6366f1" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Feature Risk Grid */}
//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//               <h2 className="text-2xl font-semibold mb-6">
//                 📊 Feature Risk Classification
//               </h2>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {Object.entries(result.featureRiskLevels || {}).map(
//                   ([feature, status], index) => (
//                     <div
//                       key={index}
//                       className={`p-3 rounded-lg text-sm font-medium ${featureStatusColor(
//                         status
//                       )}`}
//                     >
//                       {feature}
//                       <div className="text-xs mt-1">{status}</div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             <button
//               onClick={handleDownload}
//               className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
//             >
//               📄 Download PDF Report
//             </button>
//           </div>
//         )}
//       </main>
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
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

export default function HomeClient({ user }) {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const features = [
    "Marital Status","Application mode","Application order","Course",
    "Daytime/evening attendance","Previous qualification",
    "Previous qualification (grade)","Nacionality","Mother's qualification",
    "Father's qualification","Mother's occupation","Father's occupation",
    "Admission grade","Displaced","Educational special needs","Debtor",
    "Tuition fees up to date","Gender","Scholarship holder",
    "Age at enrollment","International",
    "Curricular units 1st sem (credited)","Curricular units 1st sem (enrolled)",
    "Curricular units 1st sem (evaluations)","Curricular units 1st sem (approved)",
    "Curricular units 1st sem (grade)","Curricular units 1st sem (without evaluations)",
    "Curricular units 2nd sem (credited)","Curricular units 2nd sem (enrolled)",
    "Curricular units 2nd sem (evaluations)","Curricular units 2nd sem (approved)",
    "Curricular units 2nd sem (grade)","Curricular units 2nd sem (without evaluations)",
    "Unemployment rate","Inflation rate","GDP",
  ];

  const requiredFields = ["Admission grade", "Age at enrollment"];

  const handleChange = (e, feature) => {
    setFormData({ ...formData, [feature]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let field of requiredFields) {
      if (!formData[field]) { alert(`${field} is required`); return; }
    }
    const response = await axios.post("http://localhost:8000/predict", { data: formData });
    setResult(response.data);
    setSaving(true);
    setSaveError("");
    try {
      await axios.post("/api/risk/save", {
        features: formData,
        fuzzyScore: response.data.fuzzyScore ?? null,
        annProbability: response.data.annProbability ?? null,
        finalScore: response.data.finalScore,
        category: response.data.category,
      });
    } catch (err) {
      setSaveError("Failed to save risk entry");
      console.error(err);
    } finally {
      setSaving(false);
    }
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

  const categoryColor = (category) => {
    if (category === "High") return "badge-critical";
    if (category === "Medium") return "badge-warning";
    return "badge-safe";
  };

  const featureStatusColor = (status) => {
    if (status === "Critical") return "feat-critical";
    if (status === "Worry") return "feat-warning";
    return "feat-safe";
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  // Group features into sections
  const featureSections = [
    { label: "Personal & Enrollment", features: features.slice(0, 12) },
    { label: "Academic Background", features: features.slice(12, 21) },
    { label: "1st Semester Performance", features: features.slice(21, 27) },
    { label: "2nd Semester Performance", features: features.slice(27, 33) },
    { label: "Economic Indicators", features: features.slice(33, 36) },
  ];

  const gaugeColor = (score) => {
    if (score >= 70) return "#c0392b";
    if (score >= 40) return "#b8933f";
    return "#4a7c59";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: #1a1814;
          --ink-soft: #252118;
          --parchment: #f5f0e8;
          --gold: #b8933f;
          --gold-light: #d4aa5a;
          --gold-dim: rgba(184,147,63,0.18);
          --sienna: #8b3a2a;
          --muted: #7a7060;
          --border: rgba(184,147,63,0.2);
          --card-bg: rgba(245,240,232,0.04);
          --card-border: rgba(184,147,63,0.22);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .home-root {
          min-height: 100vh;
          background-color: var(--ink);
          background-image:
            radial-gradient(ellipse at 15% 30%, rgba(184,147,63,0.07) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 70%, rgba(139,58,42,0.05) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%231a1814'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff07'/%3E%3C/svg%3E");
          font-family: 'DM Sans', sans-serif;
          color: var(--parchment);
        }

        /* ── NAV ── */
        .nav {
          width: 100%;
          padding: 18px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          background: rgba(26,24,20,0.7);
          backdrop-filter: blur(14px);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-icon {
          width: 34px; height: 34px;
          border: 1.5px solid var(--gold);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }

        .nav-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--gold-light);
        }

        .nav-right { display: flex; align-items: center; gap: 12px; }

        .nav-user {
          font-size: 0.8rem;
          color: var(--muted);
        }

        .nav-user strong { color: var(--parchment); font-weight: 500; }

        .btn-logout {
          padding: 7px 18px;
          background: rgba(139,58,42,0.25);
          border: 1px solid rgba(139,58,42,0.5);
          border-radius: 4px;
          color: #e8a090;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .btn-logout:hover {
          background: rgba(139,58,42,0.4);
          border-color: rgba(139,58,42,0.8);
        }

        .btn-ghost {
          text-decoration: none;
          padding: 7px 18px;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--gold-light);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: border-color 0.2s, background 0.2s;
        }

        .btn-ghost:hover { border-color: var(--gold); background: var(--gold-dim); }

        .btn-gold {
          text-decoration: none;
          padding: 7px 18px;
          background: var(--gold);
          border-radius: 4px;
          color: var(--ink);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── MAIN ── */
        .main { padding: 48px 40px; max-width: 1400px; margin: 0 auto; }

        .page-eyebrow {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 600;
          color: var(--parchment);
          margin-bottom: 40px;
          line-height: 1.15;
        }

        /* ── CARD ── */
        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 2px;
          padding: 36px 40px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 0 1px rgba(26,24,20,0.5), 0 20px 60px rgba(0,0,0,0.4),
                      inset 0 1px 0 rgba(184,147,63,0.12);
        }

        .card + .card { margin-top: 24px; }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .card-header-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, var(--border), transparent);
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--parchment);
          white-space: nowrap;
        }

        /* ── FORM ── */
        .section-block { margin-bottom: 32px; }

        .section-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .section-divider-text {
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          white-space: nowrap;
        }

        .section-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(184,147,63,0.2);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 14px 20px;
        }

        .field { display: flex; flex-direction: column; gap: 5px; }

        .label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          line-height: 1.3;
        }

        .label-required { color: #e8a090; margin-left: 2px; }

        .input {
          width: 100%;
          padding: 9px 12px;
          background: rgba(245,240,232,0.05);
          border: 1px solid rgba(217,208,190,0.18);
          border-radius: 2px;
          color: var(--parchment);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .input::placeholder { color: rgba(122,112,96,0.4); }

        .input:focus {
          border-color: var(--gold);
          background: rgba(184,147,63,0.05);
          box-shadow: 0 0 0 3px rgba(184,147,63,0.08);
        }

        .input[type=number]::-webkit-inner-spin-button,
        .input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .input[type=number] { -moz-appearance: textfield; }

        .submit-btn {
          width: 100%;
          margin-top: 12px;
          padding: 14px;
          background: var(--gold);
          border: none;
          border-radius: 2px;
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }

        .submit-btn:hover::after { background: rgba(255,255,255,0.1); }
        .submit-btn:active { transform: scale(0.995); }

        .spinner {
          display: inline-block;
          width: 12px; height: 12px;
          border: 1.5px solid rgba(26,24,20,0.3);
          border-top-color: var(--ink);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .save-error {
          margin-top: 14px;
          padding: 10px 14px;
          border-left: 2px solid var(--sienna);
          background: rgba(139,58,42,0.1);
          font-size: 0.8rem;
          color: #e8a090;
          border-radius: 0 2px 2px 0;
        }

        /* ── RESULTS ── */
        .results-wrap {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Risk Overview */
        .risk-overview {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 48px;
          flex-wrap: wrap;
        }

        .risk-score-text { font-size: 0.8rem; color: var(--muted); margin-bottom: 6px; letter-spacing: 0.05em; }

        .risk-score-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 600;
          line-height: 1;
          color: var(--parchment);
        }

        .risk-score-denom {
          font-size: 1.4rem;
          color: var(--muted);
          font-weight: 300;
        }

        .badge-critical {
          display: inline-block;
          margin-top: 16px;
          padding: 8px 22px;
          background: rgba(192,57,43,0.2);
          border: 1px solid rgba(192,57,43,0.5);
          border-radius: 2px;
          color: #f1948a;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .badge-warning {
          display: inline-block;
          margin-top: 16px;
          padding: 8px 22px;
          background: rgba(184,147,63,0.15);
          border: 1px solid rgba(184,147,63,0.4);
          border-radius: 2px;
          color: var(--gold-light);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .badge-safe {
          display: inline-block;
          margin-top: 16px;
          padding: 8px 22px;
          background: rgba(74,124,89,0.15);
          border: 1px solid rgba(74,124,89,0.4);
          border-radius: 2px;
          color: #82c99a;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Major Factors */
        .factors-wrap { display: flex; flex-wrap: wrap; gap: 10px; }

        .factor-tag {
          padding: 7px 16px;
          background: rgba(192,57,43,0.1);
          border: 1px solid rgba(192,57,43,0.3);
          border-radius: 2px;
          color: #f1948a;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.04em;
        }

        /* Feature Grid */
        .feature-risk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px;
        }

        .feat-card {
          padding: 12px 14px;
          border-radius: 2px;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1.4;
        }

        .feat-status {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 4px;
          opacity: 0.8;
        }

        .feat-critical {
          background: rgba(192,57,43,0.1);
          border: 1px solid rgba(192,57,43,0.25);
          color: #f1948a;
        }

        .feat-warning {
          background: rgba(184,147,63,0.1);
          border: 1px solid rgba(184,147,63,0.25);
          color: var(--gold-light);
        }

        .feat-safe {
          background: rgba(74,124,89,0.1);
          border: 1px solid rgba(74,124,89,0.25);
          color: #82c99a;
        }

        /* Download */
        .btn-download {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: rgba(74,124,89,0.15);
          border: 1px solid rgba(74,124,89,0.4);
          border-radius: 2px;
          color: #82c99a;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .btn-download:hover {
          background: rgba(74,124,89,0.25);
          border-color: rgba(74,124,89,0.6);
        }

        /* Recharts overrides */
        .recharts-cartesian-grid line { stroke: rgba(184,147,63,0.1); }
        .recharts-text { fill: var(--muted) !important; font-size: 11px; font-family: 'DM Sans', sans-serif; }
        .recharts-tooltip-wrapper .recharts-default-tooltip {
          background: #252118 !important;
          border: 1px solid var(--border) !important;
          border-radius: 2px !important;
          color: var(--parchment) !important;
          font-size: 12px !important;
        }

        @media (max-width: 768px) {
          .main { padding: 32px 20px; }
          .card { padding: 28px 20px; }
          .nav { padding: 16px 20px; }
          .risk-overview { gap: 24px; }
          .page-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="home-root">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-brand">
            <span className="nav-icon">🎓</span>
            <span className="nav-title">Student Dropout Risk Intelligence</span>
          </div>

          <div className="nav-right">
            {user ? (
              <>
                <span className="nav-user">
                  Logged in as <strong>{user.name}</strong>
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">Login</Link>
                <Link href="/register" className="btn-gold">Register</Link>
              </>
            )}
          </div>
        </nav>

        {/* MAIN */}
        <main className="main">
          <p className="page-eyebrow">Risk Assessment Portal</p>
          <h1 className="page-title">Student Dropout<br />Risk Intelligence</h1>

          {/* ── FORM CARD ── */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Enter Student Details</h2>
              <span className="card-header-line" />
            </div>

            <form onSubmit={handleSubmit}>
              {featureSections.map((section) => (
                <div key={section.label} className="section-block">
                  <div className="section-divider">
                    <span className="section-divider-text">{section.label}</span>
                    <span className="section-divider-line" />
                  </div>
                  <div className="features-grid">
                    {section.features.map((feature, index) => (
                      <div key={index} className="field">
                        <label className="label">
                          {feature}
                          {requiredFields.includes(feature) && (
                            <span className="label-required">*</span>
                          )}
                        </label>
                        <input
                          type="number"
                          step="any"
                          className="input"
                          placeholder="—"
                          onChange={(e) => handleChange(e, feature)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button type="submit" className="submit-btn">
                {saving && <span className="spinner" />}
                {saving ? "Predicting & Saving…" : "Predict Risk"}
              </button>
            </form>

            {saveError && <div className="save-error">{saveError}</div>}
          </div>

          {/* ── RESULTS ── */}
          {result && (
            <div className="results-wrap">

              {/* Risk Overview */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Risk Overview</h2>
                  <span className="card-header-line" />
                </div>

                <div className="risk-overview">
                  <ResponsiveContainer width={260} height={220}>
                    <RadialBarChart
                      innerRadius="68%"
                      outerRadius="100%"
                      data={[{ value: result.finalScore, fill: gaugeColor(result.finalScore) }]}
                      startAngle={180}
                      endAngle={0}
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={4} />
                    </RadialBarChart>
                  </ResponsiveContainer>

                  <div>
                    <p className="risk-score-text">Final Risk Score</p>
                    <div className="risk-score-value">
                      {result.finalScore.toFixed(1)}
                      <span className="risk-score-denom"> / 100</span>
                    </div>
                    <div className={categoryColor(result.category)}>
                      {result.category === "Low" ? "Safe"
                        : result.category === "Medium" ? "Moderate Risk"
                        : "Critical Risk"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Major Factors */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Major Risk Factors</h2>
                  <span className="card-header-line" />
                </div>
                <div className="factors-wrap">
                  {result.majorFactors?.map((factor, i) => (
                    <span key={i} className="factor-tag">{factor}</span>
                  ))}
                </div>
              </div>

              {/* Trend */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Risk Trend Analysis</h2>
                  <span className="card-header-line" />
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={result.trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(184,147,63,0.1)" />
                    <XAxis dataKey="month" tick={{ fill: "#7a7060", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#7a7060", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#252118",
                        border: "1px solid rgba(184,147,63,0.3)",
                        borderRadius: "2px",
                        color: "#f5f0e8",
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke={gaugeColor(result.finalScore)}
                      strokeWidth={2}
                      dot={{ fill: gaugeColor(result.finalScore), r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Feature Risk Grid */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Feature Risk Classification</h2>
                  <span className="card-header-line" />
                </div>
                <div className="feature-risk-grid">
                  {Object.entries(result.featureRiskLevels || {}).map(
                    ([feature, status], index) => (
                      <div key={index} className={`feat-card ${featureStatusColor(status)}`}>
                        {feature}
                        <div className="feat-status">{status}</div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Download */}
              <div>
                <button onClick={handleDownload} className="btn-download">
                  <span>↓</span> Download PDF Report
                </button>
              </div>

            </div>
          )}
        </main>
      </div>
    </>
  );
}