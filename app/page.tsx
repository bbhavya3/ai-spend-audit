import Navbar from "@/components/Navbar";
import AuditForm from "@/components/AuditForm";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#050507] text-white">
        <section className="px-6 pt-36 pb-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mx-auto w-fit rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
              Free AI spend audit for startups
            </p>

            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
              Stop Overpaying For
              <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Find wasted spend across ChatGPT, Claude, Cursor, Copilot,
              Gemini, and more. Get instant savings recommendations without
              login.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#audit"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold shadow-lg shadow-violet-900/30"
              >
                Start Free Audit
              </a>

              <a
                href="#features"
                className="rounded-2xl border border-zinc-700 px-8 py-4 text-lg font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                See Features
              </a>
            </div>
          </div>
        </section>

        <section id="audit" className="px-6 pb-20">
          <AuditForm />
        </section>

        <section id="features" className="px-6 pb-24">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-bold">Instant audit</h3>
              <p className="mt-4 leading-7 text-zinc-400">
                Enter spend, seats, and use case to see monthly and annual
                savings immediately.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-bold">Clear recommendations</h3>
              <p className="mt-4 leading-7 text-zinc-400">
                Shows whether to downgrade, switch plans, or optimize AI tool
                usage.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h3 className="text-2xl font-bold">Credex lead flow</h3>
              <p className="mt-4 leading-7 text-zinc-400">
                High-savings users can be guided toward discounted AI
                infrastructure credits.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}