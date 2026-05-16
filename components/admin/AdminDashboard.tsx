import { Card, CardContent } from "../ui/card";
import type { AdminReport, AdminStat, UserProfile } from "@/types/movie";
import { ReportsTable } from "./ReportsTable";
import { UserTable } from "./UserTable";

type AdminDashboardProps = {
  stats: AdminStat[];
  users: UserProfile[];
  reports: AdminReport[];
};

export function AdminDashboard({ stats, users, reports }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-white/10 bg-white/5">
            <CardContent className="space-y-2 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              {stat.change ? <p className="text-sm text-emerald-300">{stat.change}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
      <UserTable users={users} />
      <ReportsTable reports={reports} />
    </div>
  );
}
