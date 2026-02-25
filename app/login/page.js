// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.message || "Failed to login");
//       }

//       await res.json();
//       router.push("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//       <nav className="w-full bg-white/70 backdrop-blur border-b border-indigo-100 px-6 py-4 flex items-center justify-between">
//         <Link href="/" className="text-lg font-semibold text-indigo-700">
//           🎓 Student Dropout Risk Intelligence
//         </Link>
//         <div className="space-x-3">
//           <Link
//             href="/register"
//             className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium"
//           >
//             Register
//           </Link>
//           <span className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">
//             Login
//           </span>
//         </div>
//       </nav>

//       <main className="flex-1 flex items-center justify-center px-4">
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//           <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
//             Sign in to your account
//           </h1>

//           {error && (
//             <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-medium mt-2"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don&apos;t have an account?{" "}
//             <Link href="/register" className="text-indigo-600 font-medium">
//               Register
//             </Link>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to login");
      }

      await res.json();
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: #1a1814;
          --parchment: #f5f0e8;
          --gold: #b8933f;
          --gold-light: #d4aa5a;
          --sienna: #8b3a2a;
          --cream: #faf7f2;
          --muted: #7a7060;
          --border: #d9d0be;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background-color: var(--ink);
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(184,147,63,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139,58,42,0.06) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%231a1814'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff08'/%3E%3C/svg%3E");
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          color: var(--parchment);
        }

        /* ── NAV ── */
        .nav {
          width: 100%;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(184,147,63,0.2);
          background: rgba(26,24,20,0.6);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--gold-light);
          letter-spacing: 0.01em;
        }

        .nav-brand-icon {
          width: 32px;
          height: 32px;
          border: 1.5px solid var(--gold);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .nav-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .nav-link-ghost {
          text-decoration: none;
          padding: 7px 18px;
          border: 1px solid rgba(184,147,63,0.4);
          border-radius: 4px;
          color: var(--gold-light);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: border-color 0.2s, background 0.2s;
        }

        .nav-link-ghost:hover {
          border-color: var(--gold);
          background: rgba(184,147,63,0.08);
        }

        .nav-link-active {
          padding: 7px 18px;
          background: var(--gold);
          border-radius: 4px;
          color: var(--ink);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── MAIN ── */
        .main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          position: relative;
        }

        /* decorative corner lines */
        .main::before, .main::after {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          border-color: rgba(184,147,63,0.12);
          border-style: solid;
        }
        .main::before {
          top: 40px; left: 40px;
          border-width: 1px 0 0 1px;
        }
        .main::after {
          bottom: 40px; right: 40px;
          border-width: 0 1px 1px 0;
        }

        /* ── CARD ── */
        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(245,240,232,0.04);
          border: 1px solid rgba(184,147,63,0.25);
          border-radius: 2px;
          padding: 48px 44px;
          backdrop-filter: blur(10px);
          box-shadow:
            0 0 0 1px rgba(26,24,20,0.4),
            0 24px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(184,147,63,0.15);
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          text-align: center;
          margin-bottom: 10px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--parchment);
          text-align: center;
          margin-bottom: 6px;
          line-height: 1.2;
        }

        .card-subtitle {
          font-size: 0.8rem;
          color: var(--muted);
          text-align: center;
          margin-bottom: 36px;
          font-weight: 300;
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,147,63,0.3), transparent);
          margin-bottom: 32px;
        }

        /* ── ERROR ── */
        .error-box {
          margin-bottom: 20px;
          padding: 10px 14px;
          border-left: 2px solid var(--sienna);
          background: rgba(139,58,42,0.1);
          font-size: 0.8rem;
          color: #e8a090;
          border-radius: 0 2px 2px 0;
          animation: fadeUp 0.3s ease both;
        }

        /* ── FORM ── */
        .form { display: flex; flex-direction: column; gap: 20px; }

        .field { display: flex; flex-direction: column; gap: 6px; }

        .label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .input {
          width: 100%;
          padding: 11px 14px;
          background: rgba(245,240,232,0.05);
          border: 1px solid rgba(217,208,190,0.2);
          border-radius: 2px;
          color: var(--parchment);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .input::placeholder { color: rgba(122,112,96,0.5); }

        .input:focus {
          border-color: var(--gold);
          background: rgba(184,147,63,0.05);
          box-shadow: 0 0 0 3px rgba(184,147,63,0.08);
        }

        .input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #1e1c18 inset;
          -webkit-text-fill-color: var(--parchment);
        }

        /* ── BUTTON ── */
        .submit-btn {
          width: 100%;
          padding: 13px;
          margin-top: 8px;
          background: var(--gold);
          border: none;
          border-radius: 2px;
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }

        .submit-btn:hover:not(:disabled)::after { background: rgba(255,255,255,0.08); }
        .submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 1.5px solid rgba(26,24,20,0.3);
          border-top-color: var(--ink);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── FOOTER ── */
        .card-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.8rem;
          color: var(--muted);
        }

        .card-footer a {
          color: var(--gold-light);
          text-decoration: none;
          font-weight: 400;
          border-bottom: 1px solid rgba(184,147,63,0.3);
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }

        .card-footer a:hover { border-color: var(--gold); }
      `}</style>

      <div className="login-root">
        {/* NAV */}
        <nav className="nav">
          <Link href="/" className="nav-brand">
            <span className="nav-brand-icon">🎓</span>
            Student Dropout Risk Intelligence
          </Link>
          <div className="nav-actions">
            <Link href="/register" className="nav-link-ghost">Register</Link>
            <span className="nav-link-active">Login</span>
          </div>
        </nav>

        {/* MAIN */}
        <main className="main">
          <div className="card">
            <p className="card-eyebrow">Secure Portal</p>
            <h1 className="card-title">Welcome Back</h1>
            <p className="card-subtitle">Sign in to access your dashboard</p>
            <div className="divider" />

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
              <div className="field">
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="submit-btn">
                {loading && <span className="spinner" />}
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <p className="card-footer">
              Don&apos;t have an account?{" "}
              <Link href="/register">Create one</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}