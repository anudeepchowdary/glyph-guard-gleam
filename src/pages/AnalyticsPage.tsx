import React from "react";
import { rocData, confusionMatrix, mockHistory } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";

const AnalyticsPage: React.FC = () => {
  const { tp, fp, fn, tn } = confusionMatrix;
  const total = tp + fp + fn + tn;
  const accuracy = ((tp + tn) / total * 100).toFixed(1);

  // Embedding visualization mock (t-SNE style)
  const embeddingData = Array.from({ length: 60 }, (_, i) => ({
    x: (i < 30 ? 2 : 6) + (Math.random() - 0.5) * 3,
    y: (i < 30 ? 3 : 7) + (Math.random() - 0.5) * 3,
    cluster: i < 30 ? "Writer A" : "Writer B",
  }));

  // Score distribution
  const scoreDistribution = mockHistory.map((r) => ({
    score: r.score,
    result: r.result,
  }));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Model Analytics</h1>
        <p className="mt-1 text-muted-foreground font-ui">
          Siamese Neural Network performance metrics — IAM Dataset
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ROC Curve */}
        <div className="rounded border border-border bg-card p-6">
          <h2 className="mb-1 text-lg font-heading font-bold">ROC Curve</h2>
          <p className="mb-4 text-xs text-muted-foreground font-ui">AUC = 0.973</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="fpr" label={{ value: "False Positive Rate", position: "bottom", style: { fontSize: 11 } }} tick={{ fontSize: 10 }} />
              <YAxis dataKey="tpr" label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", style: { fontSize: 11 } }} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontFamily: "var(--font-ui)", fontSize: 12 }} />
              <Line type="monotone" dataKey="tpr" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="fpr" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Confusion Matrix */}
        <div className="rounded border border-border bg-card p-6">
          <h2 className="mb-1 text-lg font-heading font-bold">Confusion Matrix</h2>
          <p className="mb-4 text-xs text-muted-foreground font-ui">Overall Accuracy: {accuracy}%</p>
          <div className="mx-auto max-w-xs">
            <div className="mb-2 text-center text-xs font-semibold text-muted-foreground font-ui uppercase tracking-wider">Predicted</div>
            <div className="grid grid-cols-[auto_1fr_1fr] gap-1">
              <div />
              <div className="text-center text-xs font-medium text-muted-foreground font-ui py-2">Match</div>
              <div className="text-center text-xs font-medium text-muted-foreground font-ui py-2">Not Match</div>

              <div className="flex items-center text-xs font-medium text-muted-foreground font-ui pr-3">
                <span className="[writing-mode:vertical-lr] rotate-180">Match</span>
              </div>
              <div className="flex h-20 items-center justify-center rounded bg-success/15 text-success font-heading text-2xl font-bold">{tp}</div>
              <div className="flex h-20 items-center justify-center rounded bg-destructive/10 text-destructive font-heading text-2xl font-bold">{fp}</div>

              <div className="flex items-center text-xs font-medium text-muted-foreground font-ui pr-3">
                <span className="[writing-mode:vertical-lr] rotate-180">Not Match</span>
              </div>
              <div className="flex h-20 items-center justify-center rounded bg-destructive/10 text-destructive font-heading text-2xl font-bold">{fn}</div>
              <div className="flex h-20 items-center justify-center rounded bg-success/15 text-success font-heading text-2xl font-bold">{tn}</div>
            </div>
            <div className="mt-2 -ml-6 text-center text-xs font-semibold text-muted-foreground font-ui uppercase tracking-wider [writing-mode:vertical-lr] rotate-180 absolute" />
          </div>
        </div>
      </div>

      {/* Feature Embedding Visualization */}
      <div className="rounded border border-border bg-card p-6">
        <h2 className="mb-1 text-lg font-heading font-bold">Feature Embedding Visualization (t-SNE)</h2>
        <p className="mb-4 text-xs text-muted-foreground font-ui">
          2D projection of CNN feature vectors from the Siamese Network
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" dataKey="x" name="Dim 1" tick={{ fontSize: 10 }} />
            <YAxis type="number" dataKey="y" name="Dim 2" tick={{ fontSize: 10 }} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ fontFamily: "var(--font-ui)", fontSize: 12 }} />
            <Scatter
              name="Writer A"
              data={embeddingData.filter((d) => d.cluster === "Writer A")}
              fill="hsl(var(--primary))"
              opacity={0.7}
            />
            <Scatter
              name="Writer B"
              data={embeddingData.filter((d) => d.cluster === "Writer B")}
              fill="hsl(var(--success))"
              opacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center justify-center gap-6 text-xs font-ui text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" />Writer A</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-success" />Writer B</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
