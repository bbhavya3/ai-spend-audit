import Navbar from "@/components/Navbar";
import AuditForm from "@/components/AuditForm";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white overflow-hidden">
        <section className="relative px-6 pt-28 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_45%)]" />

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              AI Cost Audit For Startups
            </div>

            <h1 className="mt-8 text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              Stop Overpaying
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                For AI Tools
              </span>
            </h1>

            <p className="mt-8 text-zinc-400 text-xl max-w-3xl mx-auto leading-9">
              Discover wasted AI spending, cheaper alternatives,
              and optimization opportunities for your startup in seconds.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition">
                Start Free Audit
              </button>

              <button className="border border-zinc-700 px-8 py-4 rounded-2xl text-lg hover:bg-zinc-900 transition">
                View Example
              </button>
            </div>

            <p className="mt-5 text-zinc-500">
              No signup required • Instant results • Free forever
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <AuditForm />
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold">
                Instant Savings
              </h3>

              <p className="text-zinc-400 mt-4 leading-7">
                Identify overspending across ChatGPT, Claude,
                Cursor, Gemini, and more.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold">
                Smart Recommendations
              </h3>

              <p className="text-zinc-400 mt-4 leading-7">
                Get actionable suggestions for cheaper plans
                and optimized AI usage.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold">
                Startup Focused
              </h3>

              <p className="text-zinc-400 mt-4 leading-7">
                Built specifically for startup founders,
                developers, and AI-first teams.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}