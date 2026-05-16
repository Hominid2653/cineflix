import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { AdminReport } from "@/types/movie";

type ReportsTableProps = {
  reports: AdminReport[];
};

export function ReportsTable({ reports }: ReportsTableProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">Reports</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr className="[&>th]:pb-3 [&>th]:font-medium">
              <th>Title</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reports.map((report) => (
              <tr key={report.id} className="[&>td]:py-3">
                <td className="text-white">{report.title}</td>
                <td className="text-slate-300">{report.reason}</td>
                <td>
                  <Badge variant="secondary" className="bg-white/10 text-slate-100">
                    {report.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
