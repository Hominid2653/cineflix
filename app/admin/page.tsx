import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { AdminReport, AdminStat, UserProfile } from "@/types/movie";

const stats: AdminStat[] = [
  { label: "Active users", value: "2.4k", change: "+12% this week" },
  { label: "Watch events", value: "18.7k", change: "+8% this week" },
  { label: "Open reports", value: "14", change: "-3 from yesterday" },
  { label: "Blocked IPs", value: "6", change: "+1 this week" },
];

const users: UserProfile[] = [
  { id: "1", email: "ava@cineflix.app", full_name: "Ava Stone", role: "admin" },
  { id: "2", email: "noah@cineflix.app", full_name: "Noah Carter", role: "user" },
  { id: "3", email: "iris@cineflix.app", full_name: "Iris Bloom", role: "user" },
];

const reports: AdminReport[] = [
  { id: 1, title: "Signal Run", reason: "Playback stalled on server 2", status: "Investigating", reportedAt: "2026-05-16" },
  { id: 2, title: "Midnight Harbor", reason: "Duplicate watchlist item", status: "Open", reportedAt: "2026-05-15" },
  { id: 3, title: "After Hours Code", reason: "Incorrect metadata on genre tags", status: "Closed", reportedAt: "2026-05-14" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Platform overview</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Monitor users, moderation reports, and usage trends from one workspace.
          </p>
        </section>
        <AdminDashboard stats={stats} users={users} reports={reports} />
      </div>
      <Footer />
    </main>
  );
}
