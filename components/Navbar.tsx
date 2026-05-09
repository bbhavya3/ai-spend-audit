export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-black text-white sticky top-0">
      <h1 className="text-2xl font-bold tracking-tight">
        Credex Audit
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-300 hover:text-white">
          Pricing
        </button>

        <button className="text-sm text-gray-300 hover:text-white">
          About
        </button>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
          Get Started
        </button>
      </div>
    </nav>
  );
}