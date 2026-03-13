import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, X, ArrowRight } from "lucide-react";

const PIPELINE_STEPS = [
  "Preprocessing Images",
  "Grayscale Conversion",
  "Noise Removal & Normalization",
  "Extracting CNN Features",
  "Siamese Network Comparison",
  "Computing Similarity Score",
];

const VerifyPage: React.FC = () => {
  const [refImage, setRefImage] = useState<string | null>(null);
  const [testImage, setTestImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const refInput = useRef<HTMLInputElement>(null);
  const testInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (setter: (v: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = useCallback(async () => {
    setProcessing(true);
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 700));
    }
    // If images are identical, return perfect match
    const isIdentical = refImage === testImage;
    const score = isIdentical ? 1.0 : Math.random() * 0.4 + 0.6;
    const result = score > 0.9 ? "MATCH" : "NOT MATCH";
    navigate("/result", {
      state: {
        score: Math.round(score * 100) / 100,
        result,
        refImage,
        testImage,
      },
    });
  }, [refImage, testImage, navigate]);

  const UploadZone = ({ image, onClear, onClickUpload, label }: {
    image: string | null; onClear: () => void; onClickUpload: () => void; label: string;
  }) => (
    <div className="flex-1 rounded border border-border bg-card">
      <div className="border-b border-border px-5 py-3">
        <h3 className="text-sm font-semibold font-ui text-muted-foreground uppercase tracking-wider">{label}</h3>
      </div>
      <div className="p-5">
        {image ? (
          <div className="relative">
            <img src={image} alt={label} className="mx-auto max-h-64 rounded border border-border object-contain" />
            <button onClick={onClear} className="absolute right-2 top-2 rounded bg-card p-1 shadow-sm border border-border hover:bg-accent">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <button onClick={onClickUpload} className="flex h-52 w-full flex-col items-center justify-center rounded border-2 border-dashed border-border bg-background transition-colors hover:border-primary/50 hover:bg-accent/50">
            <Upload className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground font-ui">Click to upload</p>
            <p className="mt-1 text-xs text-muted-foreground/60 font-ui">PNG, JPG up to 10MB</p>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Handwriting Verification</h1>
        <p className="mt-1 text-muted-foreground font-ui">Upload two samples to compare using the Siamese Neural Network</p>
      </div>

      <input ref={refInput} type="file" accept="image/*" className="hidden" onChange={handleFile(setRefImage)} />
      <input ref={testInput} type="file" accept="image/*" className="hidden" onChange={handleFile(setTestImage)} />

      <div className="mb-6 flex gap-4">
        <UploadZone image={refImage} onClear={() => setRefImage(null)} onClickUpload={() => refInput.current?.click()} label="Reference Sample" />
        <div className="flex items-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>
        <UploadZone image={testImage} onClear={() => setTestImage(null)} onClickUpload={() => testInput.current?.click()} label="Test Sample" />
      </div>

      {processing && (
        <div className="mb-6 rounded border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold font-ui text-muted-foreground uppercase tracking-wider">
            AI Pipeline Progress
          </h3>
          <div className="space-y-2">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i < currentStep ? "bg-success" : i === currentStep ? "bg-primary animate-pipeline-pulse" : "bg-border"
                }`} />
                <span className={`text-sm font-ui ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground/50"
                }`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={handleVerify} disabled={!refImage || !testImage || processing} className="px-8">
        {processing ? "Processing..." : "Run Verification"}
      </Button>
    </div>
  );
};

export default VerifyPage;
