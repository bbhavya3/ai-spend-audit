"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { tools } from "@/pricing";

export default function AuditForm() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");
  const [useCase, setUseCase] = useState("");
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [sending, setSending] = useState(false);

  const USD_TO_INR = 83;

  const selectedTool = tools.find((item) => item.name === tool);
  const selectedPlan = selectedTool?.plans.find((item) => item.name === plan);

  const monthlySpend = Number(spend);
  const seatCount = Number(seats);

  const expectedCost =
    selectedPlan?.type === "seat"
      ? selectedPlan.price * USD_TO_INR * seatCount
      : selectedPlan?.type === "flat"
      ? selectedPlan.price * USD_TO_INR
      : selectedPlan?.type === "api"
      ? monthlySpend * 0.7
      : 0;

  const monthlySavings =
    monthlySpend > expectedCost ? monthlySpend - expectedCost : 0;

  const yearlySavings = monthlySavings * 12;

  const recommendation =
    monthlySavings > 50000
      ? "Your current spend is much higher than expected. You should review unused seats, negotiate credits, or consider Credex discounted AI infrastructure."
      : monthlySavings > 10000
      ? "You have a meaningful optimization opportunity. Review your plan, seats, and actual usage before renewing."
      : monthlySavings > 0
      ? "You have small savings available. Minor plan cleanup or seat reduction may help."
      : "Your current spend looks close to expected for this tool and plan.";

  const aiSummary =
    monthlySavings > 50000
      ? `Your ${tool} setup shows a strong savings opportunity. Based on your ${plan} plan, ${seatCount} seats, and ${useCase.toLowerCase()} use case, your current spend appears higher than expected. You should review unused seats, compare API-based usage, and consider discounted AI infrastructure credits to reduce costs.`
      : monthlySavings > 10000
      ? `Your ${tool} spend has moderate optimization potential. The selected ${plan} plan may still fit your team, but reviewing active seats and matching usage to plan limits could reduce monthly spend.`
      : `Your ${tool} usage looks fairly optimized for your selected plan and team size. Keep monitoring usage as your team grows, and revisit plan choices before renewal.`;

  const shareUrl = `/report?tool=${encodeURIComponent(
    tool
  )}&plan=${encodeURIComponent(
    plan
  )}&spend=${spend}&seats=${seats}&useCase=${encodeURIComponent(
    useCase
  )}&monthlySavings=${monthlySavings.toFixed(
    2
  )}&yearlySavings=${yearlySavings.toFixed(2)}`;

  useEffect(() => {
    const savedData = localStorage.getItem("audit-data");

    if (savedData) {
      const parsed = JSON.parse(savedData);

      setTool(parsed.tool || "");
      setPlan(parsed.plan || "");
      setSpend(parsed.spend || "");
      setSeats(parsed.seats || "");
      setUseCase(parsed.useCase || "");
      setEmail(parsed.email || "");
      setShowResults(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-data",
      JSON.stringify({
        tool,
        plan,
        spend,
        seats,
        useCase,
        email,
        showResults,
      })
    );
  }, [tool, plan, spend, seats, useCase, email, showResults]);

  async function handleCalculate() {
    if (!tool || !plan || !spend || !seats || !useCase) {
      alert("Please select tool, plan, spend, seats, and use case.");
      return;
    }

    setShowResults(true);

    try {
      const { supabase } = await import("@/lib/supabase");

      await supabase.from("audits").insert([
        {
          tool,
          plan,
          spend,
          seats,
          use_case: useCase,
          monthly_savings: monthlySavings.toFixed(2),
          yearly_savings: yearlySavings.toFixed(2),
        },
      ]);

      console.log("Audit saved successfully");
    } catch (error) {
      console.log("Supabase save error:", error);
    }
  }

  function handleReset() {
    setTool("");
    setPlan("");
    setSpend("");
    setSeats("");
    setUseCase("");
    setEmail("");
    setShowResults(false);

    localStorage.removeItem("audit-data");
  }

  async function handleSendEmail() {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tool,
          plan,
          spend,
          seats,
          useCase,
          monthlySavings: monthlySavings.toFixed(2),
          yearlySavings: yearlySavings.toFixed(2),
          aiSummary,
        }),
      });

      if (response.ok) {
        alert("Audit report sent successfully!");
      } else {
        alert("Failed to send email. Check Resend API key.");
      }
    } catch {
      alert("Something went wrong while sending email.");
    } finally {
      setSending(false);
    }
  }

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
            Select your tool, plan, monthly spend in rupees, seats, and usage
            type.
          </p>

          <form className="mt-8 space-y-4">
            <select
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              value={tool}
              onChange={(e) => {
                setTool(e.target.value);
                setPlan("");
                setShowResults(false);
              }}
            >
              <option value="">Select AI tool</option>

              {tools.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500 disabled:opacity-50"
              value={plan}
              disabled={!selectedTool}
              onChange={(e) => {
                setPlan(e.target.value);
                setShowResults(false);
              }}
            >
              <option value="">Select plan</option>

              {selectedTool?.plans.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              placeholder="Current monthly spend in rupees"
              type="number"
              value={spend}
              onChange={(e) => {
                setSpend(e.target.value);
                setShowResults(false);
              }}
            />

            <input
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              placeholder="Number of seats"
              type="number"
              value={seats}
              onChange={(e) => {
                setSeats(e.target.value);
                setShowResults(false);
              }}
            />

            <select
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-violet-500"
              value={useCase}
              onChange={(e) => {
                setUseCase(e.target.value);
                setShowResults(false);
              }}
            >
              <option value="">Primary use case</option>
              <option value="Coding">Coding</option>
              <option value="Writing">Writing</option>
              <option value="Research">Research</option>
              <option value="Data">Data</option>
              <option value="Mixed">Mixed</option>
            </select>

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 font-bold text-white hover:opacity-90"
            >
              Calculate Audit
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-2xl border border-zinc-800 px-6 py-4 font-semibold text-zinc-300 hover:bg-zinc-900"
            >
              Reset
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-zinc-900 to-black p-8 shadow-2xl">
          <p className="text-sm font-semibold text-violet-400">
            Step 2 — Audit result
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Potential Savings Report
          </h2>

          {showResults ? (
            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  Expected plan cost
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  ₹{expectedCost.toFixed(2)} / month
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  Estimated monthly savings
                </p>

                <h3 className="mt-2 text-5xl font-bold text-green-400">
                  ₹{monthlySavings.toFixed(2)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  Estimated annual savings
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-300">
                  ₹{yearlySavings.toFixed(2)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  AI-generated personalized summary
                </p>

                <p className="mt-3 leading-7 text-zinc-300">
                  {aiSummary}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
                <p className="text-sm text-zinc-500">
                  Recommendation
                </p>

                <p className="mt-3 leading-7 text-zinc-300">
                  {recommendation} {selectedTool?.recommendation}
                </p>
              </div>

              {monthlySavings > 50000 && (
                <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-6">
                  <h4 className="font-bold text-violet-300">
                    Credex consultation recommended
                  </h4>

                  <p className="mt-2 text-zinc-300">
                    This audit shows more than ₹50,000/month in possible
                    savings.
                  </p>
                </div>
              )}

              <Link
                href={shareUrl}
                target="_blank"
                className="block rounded-2xl border border-violet-500/40 bg-violet-500/10 px-6 py-4 text-center font-semibold text-violet-300 hover:bg-violet-500/20"
              >
                Open Shareable Public Report
              </Link>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/70 p-8 text-zinc-400">
              Fill the form and click Calculate Audit to generate your report.
            </div>
          )}
        </div>
      </div>

      {showResults && (
        <div
          id="lead"
          className="mt-8 rounded-3xl border border-white/10 bg-zinc-950 p-8"
        >
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
              onClick={handleSendEmail}
              disabled={sending}
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending..." : "Save Report"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}