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
      JSON.stringify({
        tool,
        spend,
        seats,
        useCase,
      })
    );
  }, [tool, spend, seats, useCase]);

  const monthlySavings = Number(spend) * 0.3;
  const yearlySavings = monthlySavings * 12;

  const selectedTool = tools.find(
    (item) => item.name === tool
  );

  return (
    <section className="mt-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Start your audit
      </h2>

      <form className="space-y-4">
        <select
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
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
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
          placeholder="Monthly spend ($)"
          type="number"
          value={spend}
          onChange={(e) => setSpend(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
          placeholder="Number of seats"
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
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

        <button
          type="button"
          className="w-full bg-white text-black p-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Calculate Savings
        </button>
      </form>

      {spend && (
        <div className="mt-8 bg-black border border-zinc-700 rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-4">
            Audit Results
          </h3>

          <div className="space-y-3">
            <p className="text-zinc-300">
              Current Tool:
              <span className="text-white font-semibold">
                {" "}
                {tool}
              </span>
            </p>

            <p className="text-zinc-300">
              Team Size:
              <span className="text-white font-semibold">
                {" "}
                {seats} seats
              </span>
            </p>

            <p className="text-zinc-300">
              Use Case:
              <span className="text-white font-semibold">
                {" "}
                {useCase}
              </span>
            </p>

            <div className="pt-4">
              <p className="text-sm text-zinc-500">
                Estimated Monthly Savings
              </p>

              <h1 className="text-4xl font-bold text-green-400">
                ${monthlySavings.toFixed(2)}
              </h1>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Estimated Annual Savings
              </p>

              <h2 className="text-2xl font-bold text-green-300">
                ${yearlySavings.toFixed(2)}
              </h2>
            </div>

            <div className="mt-5 border-t border-zinc-800 pt-5">
              <p className="text-zinc-400 leading-7">
                {selectedTool?.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}