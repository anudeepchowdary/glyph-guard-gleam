import React from "react";
import { mockHistory } from "@/lib/mockData";

const HistoryPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Verification History</h1>
        <p className="mt-1 text-muted-foreground font-ui">All handwriting verification records</p>
      </div>

      <div className="rounded border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-ui">
            <thead>
              <tr className="border-b border-border bg-accent/50 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">ID</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Reference</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Test</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Score</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Result</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground">#{r.id}</td>
                  <td className="px-5 py-3">{r.referenceImage}</td>
                  <td className="px-5 py-3">{r.testImage}</td>
                  <td className="px-5 py-3 font-medium">{(r.score * 100).toFixed(0)}%</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                      r.result === "MATCH"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {r.result}
                    </span>
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

export default HistoryPage;
