import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "destructive";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, variant = "default" }) => {
  return (
    <div className="rounded border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-ui">{title}</p>
          <p
            className={cn(
              "mt-1 text-3xl font-bold font-heading",
              variant === "success" && "text-success",
              variant === "destructive" && "text-destructive",
              variant === "default" && "text-foreground"
            )}
          >
            {value}
          </p>
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded",
          variant === "success" && "bg-success/10 text-success",
          variant === "destructive" && "bg-destructive/10 text-destructive",
          variant === "default" && "bg-primary/10 text-primary"
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
