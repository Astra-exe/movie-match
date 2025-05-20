import { createContext, useMemo, useState, useCallback } from "react";

export interface MultiFormContextValue {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isComplete: boolean;
  setComplete: (complete: boolean) => void;
  visibleSteps: number[];
  registerStep: (step: number, isVisible: boolean) => void;
  validateStep: (step: number) => Promise<boolean>;
  setStepValidator: (step: number, validator: () => Promise<boolean>) => void;
  reset: () => void;
  submittedData: any;
  setSubmittedData: (data: any) => void;
}

export const MultiFormContext = createContext<MultiFormContextValue | null>(
  null
);

export function MultiFormContextProvider({
  children,
  initialStep = 0,
  totalSteps,
}: {
  children: React.ReactNode;
  initialStep: number;
  totalSteps: number;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isComplete, setIsComplete] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [stepValidators, setStepValidators] = useState<{
    [key: number]: () => Promise<boolean>;
  }>({});
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Register a step as visible or hidden
  const registerStep = useCallback((step: number, isVisible: boolean) => {
    setVisibleSteps((prev) => {
      if (isVisible && !prev.includes(step)) {
        return [...prev, step].sort((a, b) => a - b);
      } else if (!isVisible && prev.includes(step)) {
        return prev.filter((s) => s !== step);
      }
      return prev;
    });
  }, []);

  // Set a validator function for a specific step
  const setStepValidator = useCallback(
    (step: number, validator: () => Promise<boolean>) => {
      setStepValidators((prev) => ({ ...prev, [step]: validator }));
    },
    []
  );

  // Validate a specific step
  const validateStep = useCallback(
    async (step: number) => {
      const validator = stepValidators[step];
      if (validator) {
        return await validator();
      }
      return true;
    },
    [stepValidators]
  );

  // Navigate to a specific step
  const goToStep = useCallback(
    async (step: number) => {
      if (visibleSteps.includes(step)) {
        const isValid = await validateStep(currentStep);
        if (isValid) {
          setCurrentStep(step);
        }
      } else if (visibleSteps.length > 0) {
        // Find the closest visible step
        const closestStep = visibleSteps.reduce((prev, curr) =>
          Math.abs(curr - step) < Math.abs(prev - step) ? curr : prev
        );
        setCurrentStep(closestStep);
      }
    },
    [visibleSteps, validateStep, currentStep]
  );

  // Navigate to the next step
  const nextStep = useCallback(async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      const currentIndex = visibleSteps.indexOf(currentStep);
      if (currentIndex < visibleSteps.length - 1) {
        setCurrentStep(visibleSteps[currentIndex + 1]);
        return true;
      }
    }
    return false;
  }, [currentStep, visibleSteps, validateStep]);

  // Navigate to the previous step
  const prevStep = useCallback(() => {
    const currentIndex = visibleSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(visibleSteps[currentIndex - 1]);
    }
  }, [currentStep, visibleSteps]);

  // Set the wizard as complete
  const setComplete = useCallback((complete: boolean) => {
    setIsComplete(complete);
  }, []);

  // Reset the wizard to its initial state
  const reset = useCallback(() => {
    setCurrentStep(initialStep);
    setIsComplete(false);
    setSubmittedData(null);
  }, [initialStep]);

  // Calculate derived state
  const currentStepIndex = visibleSteps.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep =
    currentStepIndex === visibleSteps.length - 1 && visibleSteps.length > 0;

  const contextValue = useMemo<MultiFormContextValue>(() => {
    return {
      currentStep,
      totalSteps,
      prevStep,
      nextStep,
      goToStep,
      isFirstStep,
      isLastStep,
      isComplete,
      setComplete,
      visibleSteps,
      registerStep,
      validateStep,
      setStepValidator,
      reset,
      submittedData,
      setSubmittedData,
    };
  }, [
    currentStep,
    totalSteps,
    prevStep,
    nextStep,
    goToStep,
    isFirstStep,
    isLastStep,
    isComplete,
    setComplete,
    visibleSteps,
    registerStep,
    validateStep,
    setStepValidator,
    reset,
    submittedData,
    setSubmittedData,
  ]);

  return (
    <MultiFormContext.Provider value={contextValue}>
      {children}
    </MultiFormContext.Provider>
  );
}
