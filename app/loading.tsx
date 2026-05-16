import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <LoadingSkeleton />
      </div>
      <Footer />
    </main>
  );
}
