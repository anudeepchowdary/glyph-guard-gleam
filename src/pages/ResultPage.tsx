import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { score = 0.85, result = "NOT MATCH", refImage, testImage } = (location.state || {}) as {
    score: number; result: string; refImage?: string; testImage?: string;
  };

  const percentage = Math.round(score * 100);
  const isMatch = result === "MATCH";

  // SVG gauge
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score * circumference);

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link to="/verify" className="inline-flex items-center gap-2 text-sm text-muted-foreground font-ui hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Verification
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded border border-border bg-card p-8 text-center">
          <h1 className="mb-6 text-2xl font-heading font-bold">Verification Result</h1>

          {/* Gauge */}
          <div className="mx-auto mb-6 relative" style={{ width: 200, height: 200 }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
              <circle
                cx="100" cy="100" r={radius} fill="none"
                stroke={isMatch ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-heading font-bold">{percentage}%</span>
              <span className="text-xs text-muted-foreground font-ui">Similarity</span>
            </div>
          </div>

          {/* Result badge */}
          <div className={`inline-flex items-center gap-2 rounded px-6 py-3 text-lg font-heading font-bold ${
            isMatch ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}>
            {isMatch ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
            {result}
          </div>

          <p className="mt-4 text-sm text-muted-foreground font-ui">
            Threshold: 90% — {isMatch ? "Samples likely belong to the same writer" : "Samples appear to be from different writers"}
          </p>
        </div>

        {/* Image comparison */}
        {(refImage || testImage) && (
          <div className="grid grid-cols-2 gap-4">
            {refImage && (
              <div className="rounded border border-border bg-card p-4">
                <p className="mb-3 text-xs font-semibold font-ui text-muted-foreground uppercase tracking-wider">Reference Sample</p>
                <img src={refImage} alt="Reference" className="mx-auto max-h-48 rounded border border-border object-contain" />
              </div>
            )}
            {testImage && (
              <div className="rounded border border-border bg-card p-4">
                <p className="mb-3 text-xs font-semibold font-ui text-muted-foreground uppercase tracking-wider">Test Sample</p>
                <img src={testImage} alt="Test" className="mx-auto max-h-48 rounded border border-border object-contain" />
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Link to="/verify"><Button>New Verification</Button></Link>
          <Link to="/history"><Button variant="outline">View History</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
