export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050507]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight">
          Credex<span className="text-violet-400"> Audit</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#audit" className="hover:text-white">
            Audit
          </a>
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#lead" className="hover:text-white">
            Report
          </a>
        </div>

        <a
          href="#audit"
          className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
        >
          Start Audit
        </a>
      </nav>
    </header>
  );
}