import React from "react";
import StatCard from "@/components/StatCard";
import { mockHistory } from "@/lib/mockData";
import { Users, ShieldCheck, CheckCircle, AlertTriangle } from "lucide-react";

const mockUsers = [
  { id: "u1", name: "Dr. Alice Chen", email: "alice@university.edu", role: "user", verifications: 4 },
  { id: "u2", name: "Prof. Bob Kumar", email: "bob@research.org", role: "user", verifications: 2 },
  { id: "u3", name: "Admin User", email: "admin@hwv.edu", role: "admin", verifications: 0 },
  { id: "u4", name: "Dr. Carol Zhang", email: "carol@forensics.gov", role: "user", verifications: 7 },
];

const AdminPage: React.FC = () => {
  const totalVerifications = mockHistory.length;
  const matches = mockHistory.filter((r) => r.result === "MATCH").length;
  const frauds = mockHistory.filter((r) => r.result === "NOT MATCH").length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground font-ui">System overview and user management</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={mockUsers.length} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Total Verifications" value={totalVerifications} icon={<ShieldCheck className="h-6 w-6" />} />
        <StatCard title="Matches" value={matches} icon={<CheckCircle className="h-6 w-6" />} variant="success" />
        <StatCard title="Fraud Attempts" value={frauds} icon={<AlertTriangle className="h-6 w-6" />} variant="destructive" />
      </div>

      {/* Users table */}
      <div className="mb-8 rounded border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-lg font-heading font-bold">Registered Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-ui">
            <thead>
              <tr className="border-b border-border bg-accent/50 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">Name</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Email</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Role</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Verifications</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-3 font-medium">{u.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                      u.role === "admin" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3">{u.verifications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Logs */}
      <div className="rounded border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-lg font-heading font-bold">Verification Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-ui">
            <thead>
              <tr className="border-b border-border bg-accent/50 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">ID</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">User</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Score</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Result</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground">#{r.id}</td>
                  <td className="px-5 py-3">{r.userId}</td>
                  <td className="px-5 py-3 font-medium">{(r.score * 100).toFixed(0)}%</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                      r.result === "MATCH" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>{r.result}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{r.timestamp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
