"use client";

import { useState } from "react";
import { useMultiForm } from "@/app/generar/hooks/useMultiFormContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MultiFormButtonsProps {
  className?: string;
  onComplete?: (visibleSteps: number[]) => void;
  completeText?: string;
  nextText?: string;
  prevText?: string;
}

export default function MultiFormButtons({
  className,
  onComplete,
  completeText = "Completar",
  nextText = "Siguiente",
  prevText = "Atrás",
}: MultiFormButtonsProps) {
  const {
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    validateStep,
    currentStep,
    visibleSteps,
    setComplete,
  } = useMultiForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      if (isLastStep) {
        const isValid = await validateStep(currentStep);
        console.log("Last step validation result:", isValid);

        if (isValid && onComplete) {
          console.log("Calling onComplete with visible steps:", visibleSteps);
          onComplete(visibleSteps);
          setComplete(true); // Set the form to complete state
        } else {
          console.log("Validation failed or no onComplete handler");
        }
      } else {
        await nextStep();
      }
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-between mt-8", className)}>
      {/* Hide back button if first step */}
      {!isFirstStep ? (
        <button
          type="button"
          onClick={prevStep}
          className={cn(
            "flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors bg-muted hover:bg-muted/80 cursor-pointer"
          )}
          disabled={isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
          {prevText}
        </button>
      ) : (
        <div />
      )}

      {/* Next/Complete button */}
      <button
        type="button"
        onClick={handleNext}
        className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isLastStep ? completeText : nextText}
        {!isLastStep && !isLoading && <ChevronRight className="h-4 w-4" />}
      </button>
    </div>
  );
}
