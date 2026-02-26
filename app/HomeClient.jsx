"use client";
import RiskChatbot from "@/components/RiskChatbot";
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
  const [tooltip, setTooltip] = useState(null);

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
    "GDP",
  ];

  // ── Field metadata ────────────────────────────────────────────────────────
  const fieldMeta = {
    "Marital Status": {
      hint: "1=Single  2=Married  3=Divorced/Other",
      placeholder: "1–6",
      example: "1",
    },
    "Application mode": {
      hint: "How student applied: 1=General admission  17=Special access  39=Transfer",
      placeholder: "e.g. 1",
      example: "1",
    },
    "Application order": {
      hint: "Course preference rank — 1=first choice, 5=fifth choice. Lower = more interest",
      placeholder: "1–9",
      example: "1",
    },
    Course: {
      hint: "Encoded degree program ID (e.g. 9254, 9773). Just a category code",
      placeholder: "e.g. 9254",
      example: "9254",
    },
    "Daytime/evening attendance": {
      hint: "1=Daytime  0=Evening. Evening students often work part-time",
      placeholder: "0 or 1",
      example: "1",
    },
    "Previous qualification": {
      hint: "Type of prior qualification: 1=Secondary  3=Higher edu  5=Technical (encoded)",
      placeholder: "1–17",
      example: "1",
    },
    "Previous qualification (grade)": {
      hint: "Score in previous education (0–200). Higher = stronger academic background",
      placeholder: "0–200",
      example: "142",
    },
    Nacionality: {
      hint: "Country code: 1=Domestic student. Other numbers = international country codes",
      placeholder: "e.g. 1",
      example: "1",
    },
    "Mother's qualification": {
      hint: "Mother's education level: 1=Basic  19=Secondary  37=Higher education",
      placeholder: "1–37",
      example: "19",
    },
    "Father's qualification": {
      hint: "Father's education level: 1=Basic  19=Secondary  37=Higher education",
      placeholder: "1–37",
      example: "19",
    },
    "Mother's occupation": {
      hint: "Occupation code: 0=Student  1=Professional  4=Worker  5=Unemployed",
      placeholder: "0–9",
      example: "1",
    },
    "Father's occupation": {
      hint: "Occupation code: 0=Student  1=Professional  4=Worker  5=Unemployed",
      placeholder: "0–9",
      example: "1",
    },
    "Admission grade": {
      hint: "★ REQUIRED. Entry exam score (0–200). Higher = better prepared student",
      placeholder: "0–200",
      example: "127",
    },
    Displaced: {
      hint: "Student admitted via special relocation/displacement status. 1=Yes  0=No",
      placeholder: "0 or 1",
      example: "0",
    },
    "Educational special needs": {
      hint: "Student has special educational requirements. 1=Yes  0=No",
      placeholder: "0 or 1",
      example: "0",
    },
    Debtor: {
      hint: "Student owes money to institution. 1=Yes  0=No. Debtors = higher dropout risk",
      placeholder: "0 or 1",
      example: "0",
    },
    "Tuition fees up to date": {
      hint: "1=Fees paid on time  0=Outstanding dues. One of the strongest dropout predictors",
      placeholder: "0 or 1",
      example: "1",
    },
    Gender: { hint: "1=Male  0=Female", placeholder: "0 or 1", example: "1" },
    "Scholarship holder": {
      hint: "1=Has scholarship  0=No. Scholarship students tend to have lower dropout rates",
      placeholder: "0 or 1",
      example: "0",
    },
    "Age at enrollment": {
      hint: "★ REQUIRED. Student's age when they enrolled (typically 18–60)",
      placeholder: "18–60",
      example: "20",
    },
    International: {
      hint: "1=International student  0=Local/domestic student",
      placeholder: "0 or 1",
      example: "0",
    },
    "Curricular units 1st sem (credited)": {
      hint: "Transfer credits counted towards 1st semester (usually 0 for new students)",
      placeholder: "0–20",
      example: "0",
    },
    "Curricular units 1st sem (enrolled)": {
      hint: "Number of subjects registered in 1st semester (typically 5–7)",
      placeholder: "0–26",
      example: "6",
    },
    "Curricular units 1st sem (evaluations)": {
      hint: "Number of exams/assessments attempted in 1st semester",
      placeholder: "0–45",
      example: "6",
    },
    "Curricular units 1st sem (approved)": {
      hint: "Subjects passed in 1st semester. If enrolled=6 and approved=0 → very high risk!",
      placeholder: "0–26",
      example: "5",
    },
    "Curricular units 1st sem (grade)": {
      hint: "Average grade in 1st semester (0–20 scale). Grade=0 with approved=0 is critical",
      placeholder: "0–20",
      example: "13.5",
    },
    "Curricular units 1st sem (without evaluations)": {
      hint: "Subjects registered but student didn't attempt any exam — warning sign",
      placeholder: "0–12",
      example: "0",
    },
    "Curricular units 2nd sem (credited)": {
      hint: "Transfer credits counted towards 2nd semester",
      placeholder: "0–20",
      example: "0",
    },
    "Curricular units 2nd sem (enrolled)": {
      hint: "Subjects registered in 2nd semester",
      placeholder: "0–23",
      example: "6",
    },
    "Curricular units 2nd sem (evaluations)": {
      hint: "Exams attempted in 2nd semester",
      placeholder: "0–33",
      example: "6",
    },
    "Curricular units 2nd sem (approved)": {
      hint: "Subjects passed in 2nd semester. A drop from 1st semester = sharp risk increase",
      placeholder: "0–20",
      example: "5",
    },
    "Curricular units 2nd sem (grade)": {
      hint: "Average grade in 2nd semester (0–20). Declining grade trend signals dropout risk",
      placeholder: "0–20",
      example: "13.0",
    },
    "Curricular units 2nd sem (without evaluations)": {
      hint: "Subjects registered but no exam taken in 2nd semester",
      placeholder: "0–12",
      example: "0",
    },
    "Unemployment rate": {
      hint: "National unemployment % at time of enrollment (e.g. 13.9%). High = more financial stress",
      placeholder: "e.g. 13.9",
      example: "13.9",
    },
    "Inflation rate": {
      hint: "National inflation % (e.g. 1.4%). High inflation raises cost of living → dropout risk",
      placeholder: "e.g. 1.4",
      example: "1.4",
    },
    GDP: {
      hint: "GDP growth rate (e.g. 1.74). Negative GDP = recession, typically increases dropout rate",
      placeholder: "e.g. 1.74",
      example: "1.74",
    },
  };

  const requiredFields = ["Admission grade", "Age at enrollment"];

  const handleChange = (e, feature) => {
    setFormData({ ...formData, [feature]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required`);
        return;
      }
    }
    const response = await axios.post("http://localhost:8000/predict", {
      data: formData,
    });
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
      { responseType: "blob" },
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

  // ── Section definitions with accent colors ───────────────────────────────
  const featureSections = [
    {
      label: "Personal & Demographic",
      accent: "#9b7fe8",
      accentDim: "rgba(155,127,232,0.08)",
      accentBorder: "rgba(155,127,232,0.28)",
      icon: "👤",
      features: features.slice(0, 12),
    },
    {
      label: "Academic Background",
      accent: "#4aa8e0",
      accentDim: "rgba(74,168,224,0.08)",
      accentBorder: "rgba(74,168,224,0.28)",
      icon: "🎓",
      features: features.slice(12, 21),
    },
    {
      label: "1st Semester Performance",
      accent: "#e8874a",
      accentDim: "rgba(232,135,74,0.08)",
      accentBorder: "rgba(232,135,74,0.28)",
      icon: "📘",
      features: features.slice(21, 27),
    },
    {
      label: "2nd Semester Performance",
      accent: "#e84d8a",
      accentDim: "rgba(232,77,138,0.08)",
      accentBorder: "rgba(232,77,138,0.28)",
      icon: "📗",
      features: features.slice(27, 33),
    },
    {
      label: "Economic Indicators",
      accent: "#3ecfa0",
      accentDim: "rgba(62,207,160,0.08)",
      accentBorder: "rgba(62,207,160,0.28)",
      icon: "📈",
      features: features.slice(33, 36),
    },
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
        .nav { width: 100%; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); background: rgba(26,24,20,0.7); backdrop-filter: blur(14px); position: sticky; top: 0; z-index: 50; }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-icon { width: 34px; height: 34px; border: 1.5px solid var(--gold); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
        .nav-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; color: var(--gold-light); }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .nav-user { font-size: 0.8rem; color: var(--muted); }
        .nav-user strong { color: var(--parchment); font-weight: 500; }
        .btn-logout { padding: 7px 18px; background: rgba(139,58,42,0.25); border: 1px solid rgba(139,58,42,0.5); border-radius: 4px; color: #e8a090; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
        .btn-logout:hover { background: rgba(139,58,42,0.4); border-color: rgba(139,58,42,0.8); }
        .btn-ghost { text-decoration: none; padding: 7px 18px; border: 1px solid var(--border); border-radius: 4px; color: var(--gold-light); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: border-color 0.2s, background 0.2s; }
        .btn-ghost:hover { border-color: var(--gold); background: var(--gold-dim); }
        .btn-gold { text-decoration: none; padding: 7px 18px; background: var(--gold); border-radius: 4px; color: var(--ink); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }

        /* ── MAIN ── */
        .main { padding: 48px 40px; max-width: 1400px; margin: 0 auto; }
        .page-eyebrow { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 600; color: var(--parchment); margin-bottom: 40px; line-height: 1.15; }

        /* ── CARD ── */
        .card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 2px; padding: 36px 40px; backdrop-filter: blur(10px); box-shadow: 0 0 0 1px rgba(26,24,20,0.5), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(184,147,63,0.12); }
        .card + .card { margin-top: 24px; }
        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .card-header-line { flex: 1; height: 1px; background: linear-gradient(to right, var(--border), transparent); }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; color: var(--parchment); white-space: nowrap; }

        /* ── SECTION BLOCKS ── */
        .section-block { margin-bottom: 20px; border-radius: 4px; overflow: hidden; }

        .section-header-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          border-radius: 3px 3px 0 0;
        }

        .section-icon { font-size: 0.95rem; }

        .section-label-text {
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          flex: 1;
        }

        .section-count {
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          opacity: 0.55;
        }

        .section-body {
          padding: 16px;
          border-width: 0 1px 1px 1px;
          border-style: solid;
          border-radius: 0 0 3px 3px;
        }

        .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr)); gap: 14px 16px; }

        /* ── FIELD ── */
        .field { display: flex; flex-direction: column; gap: 4px; }

        .field-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 4px; min-height: 18px; }

        .label { font-size: 0.66rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); line-height: 1.3; }
        .label-required { color: #e8a090; margin-left: 2px; }

        .info-btn {
          flex-shrink: 0;
          width: 15px; height: 15px;
          border-radius: 50%;
          border: 1px solid;
          font-size: 8px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center;
          cursor: help;
          transition: opacity 0.15s;
          margin-top: 1px;
          opacity: 0.6;
          background: transparent;
        }
        .info-btn:hover { opacity: 1; }

        .field-hint {
          font-size: 0.62rem;
          line-height: 1.35;
          font-style: italic;
          opacity: 0.6;
        }

        .input {
          width: 100%;
          padding: 8px 11px;
          background: rgba(245,240,232,0.04);
          border: 1px solid rgba(217,208,190,0.15);
          border-radius: 2px;
          color: var(--parchment);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .input::placeholder { color: rgba(122,112,96,0.35); font-size: 0.78rem; }
        .input[type=number]::-webkit-inner-spin-button,
        .input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .input[type=number] { -moz-appearance: textfield; }

        /* ── TOOLTIP ── */
        .field-tooltip {
          position: fixed;
          z-index: 9999;
          max-width: 230px;
          padding: 11px 14px;
          background: #1e1c18;
          border: 1px solid rgba(184,147,63,0.35);
          border-radius: 3px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.7);
          pointer-events: none;
          animation: tipIn 0.15s ease both;
        }
        @keyframes tipIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
        .tt-title { font-size: 0.7rem; font-weight: 500; color: var(--gold-light); margin-bottom: 5px; letter-spacing: 0.04em; }
        .tt-desc  { font-size: 0.7rem; color: rgba(245,240,232,0.72); line-height: 1.55; }
        .tt-eg    { margin-top: 7px; font-size: 0.65rem; color: var(--muted); }
        .tt-eg strong { color: var(--gold); }

        /* ── SUBMIT ── */
        .submit-btn { width: 100%; margin-top: 8px; padding: 14px; background: var(--gold); border: none; border-radius: 2px; color: var(--ink); font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; position: relative; overflow: hidden; transition: opacity 0.2s, transform 0.15s; }
        .submit-btn::after { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0); transition: background 0.2s; }
        .submit-btn:hover::after { background: rgba(255,255,255,0.1); }
        .submit-btn:active { transform: scale(0.995); }

        .spinner { display: inline-block; width: 12px; height: 12px; border: 1.5px solid rgba(26,24,20,0.3); border-top-color: var(--ink); border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 8px; vertical-align: middle; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .save-error { margin-top: 14px; padding: 10px 14px; border-left: 2px solid var(--sienna); background: rgba(139,58,42,0.1); font-size: 0.8rem; color: #e8a090; border-radius: 0 2px 2px 0; }

        /* ── RESULTS ── */
        .results-wrap { margin-top: 32px; display: flex; flex-direction: column; gap: 24px; animation: fadeUp 0.5s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .risk-overview { display: flex; flex-direction: row; align-items: center; gap: 48px; flex-wrap: wrap; }
        .risk-score-text { font-size: 0.8rem; color: var(--muted); margin-bottom: 6px; letter-spacing: 0.05em; }
        .risk-score-value { font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 600; line-height: 1; color: var(--parchment); }
        .risk-score-denom { font-size: 1.4rem; color: var(--muted); font-weight: 300; }
        .badge-critical { display: inline-block; margin-top: 16px; padding: 8px 22px; background: rgba(192,57,43,0.2); border: 1px solid rgba(192,57,43,0.5); border-radius: 2px; color: #f1948a; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
        .badge-warning  { display: inline-block; margin-top: 16px; padding: 8px 22px; background: rgba(184,147,63,0.15); border: 1px solid rgba(184,147,63,0.4); border-radius: 2px; color: var(--gold-light); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
        .badge-safe     { display: inline-block; margin-top: 16px; padding: 8px 22px; background: rgba(74,124,89,0.15); border: 1px solid rgba(74,124,89,0.4); border-radius: 2px; color: #82c99a; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
        .factors-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .factor-tag { padding: 7px 16px; background: rgba(192,57,43,0.1); border: 1px solid rgba(192,57,43,0.3); border-radius: 2px; color: #f1948a; font-size: 0.78rem; font-weight: 400; letter-spacing: 0.04em; }
        .feature-risk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
        .feat-card { padding: 12px 14px; border-radius: 2px; font-size: 0.75rem; font-weight: 400; line-height: 1.4; }
        .feat-status { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; opacity: 0.8; }
        .feat-critical { background: rgba(192,57,43,0.1); border: 1px solid rgba(192,57,43,0.25); color: #f1948a; }
        .feat-warning  { background: rgba(184,147,63,0.1); border: 1px solid rgba(184,147,63,0.25); color: var(--gold-light); }
        .feat-safe     { background: rgba(74,124,89,0.1);  border: 1px solid rgba(74,124,89,0.25);  color: #82c99a; }
        .btn-download { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; background: rgba(74,124,89,0.15); border: 1px solid rgba(74,124,89,0.4); border-radius: 2px; color: #82c99a; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
        .btn-download:hover { background: rgba(74,124,89,0.25); border-color: rgba(74,124,89,0.6); }
        .recharts-cartesian-grid line { stroke: rgba(184,147,63,0.1); }
        .recharts-text { fill: var(--muted) !important; font-size: 11px; font-family: 'DM Sans', sans-serif; }

        @media (max-width: 768px) {
          .main { padding: 32px 20px; }
          .card { padding: 28px 20px; }
          .nav { padding: 16px 20px; }
          .risk-overview { gap: 24px; }
          .page-title { font-size: 1.8rem; }
          .features-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Tooltip portal */}
      {tooltip && (
        <div
          className="field-tooltip"
          style={{ top: tooltip.top, left: tooltip.left }}
        >
          <div className="tt-title">{tooltip.feature}</div>
          <div className="tt-desc">{tooltip.hint}</div>
          {tooltip.example && (
            <div className="tt-eg">
              Example value: <strong>{tooltip.example}</strong>
            </div>
          )}
        </div>
      )}

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
                <Link href="/login" className="btn-ghost">
                  Login
                </Link>
                <Link href="/register" className="btn-gold">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <main className="main">
          <p className="page-eyebrow">Risk Assessment Portal</p>
          <h1 className="page-title">
            Student Dropout
            <br />
            Risk Intelligence
          </h1>

          {/* ── FORM CARD ── */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Enter Student Details</h2>
              <span className="card-header-line" />
            </div>

            <form onSubmit={handleSubmit}>
              {featureSections.map((section) => (
                <div key={section.label} className="section-block">
                  {/* Colored header strip */}
                  <div
                    className="section-header-row"
                    style={{
                      background: section.accentDim,
                      borderTop: `2px solid ${section.accent}`,
                      borderLeft: `1px solid ${section.accentBorder}`,
                      borderRight: `1px solid ${section.accentBorder}`,
                    }}
                  >
                    <span className="section-icon">{section.icon}</span>
                    <span
                      className="section-label-text"
                      style={{ color: section.accent }}
                    >
                      {section.label}
                    </span>
                    <span
                      className="section-count"
                      style={{ color: section.accent }}
                    >
                      {section.features.length} fields
                    </span>
                  </div>

                  {/* Fields */}
                  <div
                    className="section-body"
                    style={{
                      borderColor: section.accentBorder,
                      background: section.accentDim,
                    }}
                  >
                    <div className="features-grid">
                      {section.features.map((feature, index) => {
                        const meta = fieldMeta[feature] || {};
                        return (
                          <div key={index} className="field">
                            <div className="field-top">
                              <label className="label">
                                {feature}
                                {requiredFields.includes(feature) && (
                                  <span className="label-required"> ★</span>
                                )}
                              </label>
                              {meta.hint && (
                                <span
                                  className="info-btn"
                                  style={{
                                    borderColor: section.accent,
                                    color: section.accent,
                                  }}
                                  onMouseEnter={(e) => {
                                    const rect =
                                      e.currentTarget.getBoundingClientRect();
                                    setTooltip({
                                      feature,
                                      hint: meta.hint,
                                      example: meta.example,
                                      top: rect.bottom + 6,
                                      left: Math.min(
                                        rect.left - 110,
                                        window.innerWidth - 250,
                                      ),
                                    });
                                  }}
                                  onMouseLeave={() => setTooltip(null)}
                                >
                                  ?
                                </span>
                              )}
                            </div>

                            {/* Inline micro-hint (first chunk before double-space) */}
                            {meta.hint && (
                              <span
                                className="field-hint"
                                style={{ color: section.accent }}
                              >
                                {meta.hint.split("  ")[0]}
                              </span>
                            )}

                            <input
                              type="number"
                              step="any"
                              className="input"
                              placeholder={meta.placeholder || "—"}
                              onChange={(e) => handleChange(e, feature)}
                              onFocus={(e) => {
                                e.target.style.borderColor = section.accent;
                                e.target.style.boxShadow = `0 0 0 3px ${section.accentDim}`;
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(217,208,190,0.15)";
                                e.target.style.boxShadow = "none";
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
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
                      data={[
                        {
                          value: result.finalScore,
                          fill: gaugeColor(result.finalScore),
                        },
                      ]}
                      startAngle={180}
                      endAngle={0}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                      />
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
                      {result.category === "Low"
                        ? "Safe"
                        : result.category === "Medium"
                          ? "Moderate Risk"
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
                    <span key={i} className="factor-tag">
                      {factor}
                    </span>
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(184,147,63,0.1)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#7a7060", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#7a7060", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
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
                      dot={{
                        fill: gaugeColor(result.finalScore),
                        r: 3,
                        strokeWidth: 0,
                      }}
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
                      <div
                        key={index}
                        className={`feat-card ${featureStatusColor(status)}`}
                      >
                        {feature}
                        <div className="feat-status">{status}</div>
                      </div>
                    ),
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
          {result && <RiskChatbot result={result} />}
        </main>
      </div>
    </>
  );
}
