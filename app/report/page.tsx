type ReportPageProps = {
  searchParams: Promise<{
    tool?: string;
    plan?: string;
    spend?: string;
    seats?: string;
    useCase?: string;
    monthlySavings?: string;
    yearlySavings?: string;
  }>;
};

export default async function ReportPage({ searchParams }: ReportPageProps) {
  const params = await searchParams;

  const tool = params.tool || "AI Tool";
  const plan = params.plan || "Selected Plan";
  const monthlySavings = params.monthlySavings || "0.00";
  const yearlySavings = params.yearlySavings || "0.00";

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-20 text-white">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm font-semibold text-violet-400">
          Public AI Spend Audit Report
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          {tool} Savings Report
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <p className="text-zinc-500">Tool</p>
            <h2 className="mt-2 text-2xl font-bold">{tool}</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <p className="text-zinc-500">Plan</p>
            <h2 className="mt-2 text-2xl font-bold">{plan}</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <p className="text-zinc-500">Monthly Savings</p>
            <h2 className="mt-2 text-4xl font-bold text-green-400">
              ₹{monthlySavings}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <p className="text-zinc-500">Annual Savings</p>
            <h2 className="mt-2 text-4xl font-bold text-green-300">
              ₹{yearlySavings}
            </h2>
          </div>
        </div>

        <p className="mt-8 leading-7 text-zinc-400">
          This public report hides identifying details like email and company
          name. It only shows tool, plan, use case, and savings numbers.
        </p>
      </section>
    </main>
  );
}