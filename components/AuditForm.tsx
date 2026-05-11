"use client";

import { useEffect, useState } from "react";
import { tools } from "@/pricing";

export default function AuditForm() {
  const [tool, setTool] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");
  const [useCase, setUseCase] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("audit-data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTool(parsed.tool || "");
      setSpend(parsed.spend || "");
      setSeats(parsed.seats || "");
      setUseCase(parsed.useCase || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-data",
      JSON.stringify({ tool, spend, seats, useCase })
    );
  }, [tool, spend, seats, useCase]);

  const monthlySavings = Number(spend) * 0.3;
  const yearlySavings = monthlySavings * 12;
  const selectedTool = tools.find((item) => item.name === tool);

  return (
    <section className="mx-auto mt-4 grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl">
        <p className="text-sm font-medium text-violet-400">
          Free AI spend audit
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Tell us what you pay for
        </h2>

        <p className="mt-3 text-zinc-400 leading-7">
          Enter your current AI tool, monthly spend, seats, and main use case.
          The report updates instantly.
        </p>

        <form className="mt-8 space-y-4">
          <select
            className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-violet-500"
            value={tool}
            onChange={(e) => setTool(e.target.value)}
          >
            <option value="">Select AI Tool</option>
            {tools.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-violet-500"
            placeholder="Monthly spend ($)"
            type="number"
            value={spend}
            onChange={(e) => setSpend(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-violet-500"
            placeholder="Number of seats"
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />

          <select
            className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-violet-500"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          >
            <option value="">Primary use case</option>
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="research">Research</option>
            <option value="data">Data Analysis</option>
            <option value="mixed">Mixed</option>
          </select>
        </form>
      </div>

      <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-zinc-900 to-black p-8 shadow-2xl">
        <p className="text-sm font-medium text-zinc-400">
          Live audit result
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Potential Savings Report
        </h2>

        {spend ? (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
              <p className="text-sm text-zinc-500">
                Estimated Monthly Savings
              </p>
              <h1 className="mt-2 text-5xl font-bold text-green-400">
                ${monthlySavings.toFixed(2)}
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
              <p className="text-sm text-zinc-500">
                Estimated Annual Savings
              </p>
              <h2 className="mt-2 text-3xl font-bold text-green-300">
                ${yearlySavings.toFixed(2)}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
              <p className="text-sm text-zinc-500">Recommendation</p>
              <p className="mt-3 text-zinc-300 leading-7">
                {selectedTool?.recommendation ||
                  "Select a tool to view a recommendation."}
              </p>
            </div>

            {monthlySavings > 500 && (
              <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6">
                <h3 className="font-bold text-violet-300">
                  High savings opportunity
                </h3>
                <p className="mt-2 text-zinc-300">
                  Credex can help capture this savings through discounted AI
                  infrastructure credits.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-8 text-zinc-400">
            Fill the form to generate your instant AI spend audit.
          </div>
        )}
      </div>
    </section>
  );
}