"use client";

import { useEffect, useState } from "react";
import { tools } from "@/pricing";

export default function AuditForm() {
  const [tool, setTool] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");
  const [useCase, setUseCase] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("audit-data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTool(parsed.tool || "");
      setSpend(parsed.spend || "");
      setSeats(parsed.seats || "");
      setUseCase(parsed.useCase || "");
      setEmail(parsed.email || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-data",
      JSON.stringify({ tool, spend, seats, useCase, email })
    );
  }, [tool, spend, seats, useCase, email]);

  const monthlySpend = Number(spend);
  const monthlySavings = monthlySpend > 0 ? monthlySpend * 0.3 : 0;
  const yearlySavings = monthlySavings * 12;
  const selectedTool = tools.find((item) => item.name === tool);

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
          <p className="text-sm font-semibold text-violet-400">
            Step 1 — Spend input
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Tell us about your AI spend
          </h2>

          <p className="mt-3 text-zinc-400">
            No login required. Your audit result appears instantly.
          </p>

          <form className="mt-8 space-y-4">
            <select
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
            >
              <option value="">Select AI tool</option>
              {tools.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              placeholder="Current monthly spend in dollars"
              type="number"
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
            />

            <input
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              placeholder="Number of seats"
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />

            <select
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
            >
              <option value="">Primary use case</option>
              <option value="Coding">Coding</option>
              <option value="Writing">Writing</option>
              <option value="Research">Research</option>
              <option value="Data">Data</option>
              <option value="Mixed">Mixed</option>
            </select>
          </form>
        </div>

        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-zinc-900 to-black p-8 shadow-2xl">
          <p className="text-sm font-semibold text-violet-400">
            Step 2 — Audit result
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Potential Savings Report
          </h2>

          {spend && tool ? (
            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  Estimated monthly savings
                </p>
                <h3 className="mt-2 text-5xl font-bold text-green-400">
                  ${monthlySavings.toFixed(2)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  Estimated annual savings
                </p>
                <h3 className="mt-2 text-3xl font-bold text-green-300">
                  ${yearlySavings.toFixed(2)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">Recommendation</p>
                <p className="mt-3 leading-7 text-zinc-300">
                  {selectedTool?.recommendation}
                </p>
              </div>

              {monthlySavings > 500 ? (
                <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-6">
                  <h4 className="font-bold text-violet-300">
                    Credex consultation recommended
                  </h4>
                  <p className="mt-2 text-zinc-300">
                    Your estimated savings are high. Credex can help capture
                    more value through discounted AI infrastructure credits.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                  <h4 className="font-bold text-zinc-200">
                    You are close to optimized
                  </h4>
                  <p className="mt-2 text-zinc-400">
                    Your current spend does not show a major savings gap yet.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/70 p-8 text-zinc-400">
              Fill the form to generate your audit result.
            </div>
          )}
        </div>
      </div>

      <div id="lead" className="mt-8 rounded-3xl border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm font-semibold text-violet-400">
          Step 3 — Capture report
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Email yourself the audit report
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <input
            className="rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
            placeholder="work@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="button"
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black hover:bg-zinc-200"
          >
            Save Report
          </button>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          Demo MVP: report data is stored locally. Backend/email integration can
          be added with Supabase and Resend.
        </p>
      </div>
    </section>
  );
}