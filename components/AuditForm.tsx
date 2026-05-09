"use client";

import { useState } from "react";

export default function AuditForm() {
  const [tool, setTool] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");

  const savings = Number(spend) * 0.3;

  return (
    <section className="mt-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Start your audit</h2>

      <form className="space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
          placeholder="Tool name e.g. ChatGPT"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
          placeholder="Monthly spend e.g. 200"
          type="number"
          value={spend}
          onChange={(e) => setSpend(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 text-white"
          placeholder="Number of seats e.g. 5"
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <button
          type="button"
          className="w-full bg-white text-black p-3 rounded-lg font-semibold"
        >
          Calculate Savings
        </button>
      </form>

      {spend && (
        <div className="mt-6 bg-black border border-zinc-700 rounded-xl p-5">
          <h3 className="text-xl font-bold mb-2">
            Estimated Savings
          </h3>

          <p className="text-green-400 text-3xl font-bold">
            ${savings.toFixed(2)} / month
          </p>

          <p className="text-zinc-400 mt-2">
            You may be overspending on {tool}.
          </p>
        </div>
      )}
    </section>
  );
}