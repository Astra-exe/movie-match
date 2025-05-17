"use client";

import { useEffect } from "react";
import { useMultiForm } from "@/app/generate/hooks/useMultiFormContext";
import { cn } from "@/lib/utils";

interface FormStepProps {
  step: number;
  children: React.ReactNode;
  className?: string;
  shouldShow?: () => boolean;
  validator?: () => Promise<boolean>;
  fieldNames?: string[];
}

export default function FormStep({
  step,
  children,
  className,
  shouldShow = () => true,
  validator,
  fieldNames = [],
}: FormStepProps) {
  const { currentStep, registerStep, setStepValidator } = useMultiForm();
  const isVisible = shouldShow();

  // Register this step with the form step and set its validator
  useEffect(() => {
    registerStep(step, isVisible);
    if (validator) {
      setStepValidator(step, validator);
    }

    // Cleanup when unmounting
    return () => registerStep(step, false);
  }, [step, isVisible, registerStep, setStepValidator, validator]);

  // Only render if this step is visible and is the current step
  if (!isVisible || step !== currentStep) {
    return null;
  }

  return (
    <div
      className={cn("form-step", className)}
      data-fields={fieldNames.join(",")}
    >
      {children}
    </div>
  );
}
