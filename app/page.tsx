import Navbar from "@/components/Navbar";
import AuditForm from "@/components/AuditForm";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold text-center">
          AI Spend Audit
        </h1>

        <p className="text-gray-400 mt-4 text-center max-w-xl">
          Find where your startup is overspending on AI tools and save money instantly.
        </p>

        <button className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200">
          Start Free Audit
        </button>

        <AuditForm />
      </main>
    </>
  );
}