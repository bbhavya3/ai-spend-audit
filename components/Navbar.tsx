export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-white">Credex</span>
          <span className="text-violet-400"> Audit</span>
        </h1>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#" className="hover:text-white">
            Features
          </a>
          <a href="#" className="hover:text-white">
            Pricing Data
          </a>
          <a href="#" className="hover:text-white">
            Report
          </a>
        </div>

        <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200">
          Start Audit
        </button>
      </div>
    </nav>
  );
}