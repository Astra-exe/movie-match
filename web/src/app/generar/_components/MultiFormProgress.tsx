"use client";
import { useMultiForm } from "@/app/generar/hooks/useMultiFormContext";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function MultiFormProgress({ className }: { className?: string }) {
  const { currentStep, visibleSteps, goToStep } = useMultiForm();

  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-2 my-4",
        className
      )}
    >
      {visibleSteps.map((step, index) => {
        const isActive = currentStep === step;
        const isCompleted =
          visibleSteps.indexOf(currentStep) > visibleSteps.indexOf(step);

        return (
          <div key={step} className="flex items-center">
            {index > 0 && (
              <div
                className={cn(
                  "h-0.5 w-10",
                  visibleSteps.indexOf(currentStep) >= index
                    ? "bg-primary"
                    : "bg-ring/40"
                )}
              />
            )}
            <button
              type="button"
              onClick={() => goToStep(step)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer",
                isActive && "border-primary bg-primary text-primary-foreground",
                isCompleted && "border-primary bg-primary/20 text-primary",
                !isActive && !isCompleted && "border-muted bg-background"
              )}
              aria-label={`Go to step ${index + 1}`}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
