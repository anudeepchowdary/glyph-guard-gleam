import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import { mockHistory } from "@/lib/mockData";
import { Upload, History, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const total = mockHistory.length;
  const matches = mockHistory.filter((r) => r.result === "MATCH").length;
  const frauds = mockHistory.filter((r) => r.result === "NOT MATCH").length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Welcome, {user?.name}
        </h1>
        <p className="mt-1 text-muted-foreground font-ui">
          Handwriting Verification System — Deep Learning Based
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Verifications" value={total} icon={<History className="h-6 w-6" />} />
        <StatCard title="Matches" value={matches} icon={<CheckCircle className="h-6 w-6" />} variant="success" />
        <StatCard title="Fraud Attempts" value={frauds} icon={<AlertTriangle className="h-6 w-6" />} variant="destructive" />
        <StatCard title="Accuracy" value="96.2%" icon={<Upload className="h-6 w-6" />} />
      </div>

      <div className="mb-8 rounded border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-heading font-bold">Quick Verification</h2>
        <p className="mb-4 text-sm text-muted-foreground font-ui">
          Upload two handwriting samples to verify if they belong to the same writer using our Siamese Neural Network.
        </p>
        <Link to="/verify">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Start Verification
          </Button>
        </Link>
      </div>

      <div className="rounded border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-heading font-bold">Recent Verifications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-ui">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Reference</th>
                <th className="pb-3 font-medium text-muted-foreground">Test</th>
                <th className="pb-3 font-medium text-muted-foreground">Score</th>
                <th className="pb-3 font-medium text-muted-foreground">Result</th>
                <th className="pb-3 font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.slice(0, 5).map((r) => (
                <tr key={r.id} className="border-b border-border/50">
                  <td className="py-3">{r.referenceImage}</td>
                  <td className="py-3">{r.testImage}</td>
                  <td className="py-3">{(r.score * 100).toFixed(0)}%</td>
                  <td className="py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                      r.result === "MATCH"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {r.result}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.timestamp.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
