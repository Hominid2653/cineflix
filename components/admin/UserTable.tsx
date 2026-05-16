import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { UserProfile } from "@/types/movie";

type UserTableProps = {
  users: UserProfile[];
};

export function UserTable({ users }: UserTableProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">Users</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr className="[&>th]:pb-3 [&>th]:font-medium">
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="[&>td]:py-3">
                <td className="text-white">{user.email || "Unknown"}</td>
                <td className="text-slate-300">{user.full_name || "Not set"}</td>
                <td>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"} className="bg-white/10 text-slate-100">
                    {user.role || "user"}
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
