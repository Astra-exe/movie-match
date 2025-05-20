import { useEffect } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useMultiForm } from "@/app/generar/hooks/useMultiFormContext";
import MultiFormButtons from "@/app/generar/_components/MultiFormButtons";
import { toast } from "@/hooks/useToast";

interface SelectFormContentProps<T extends FieldValues> {
  onSubmit: (values: T) => void;
  form: UseFormReturn<T>;
  stepFields: { [key: number]: string[] };
  children: React.ReactNode;
  onStepChange?: () => void;
  clearPersistedData?: () => void;
}

export function SelectFormContent<T extends FieldValues>({
  onSubmit,
  form,
  stepFields,
  children,
  onStepChange,
  clearPersistedData,
}: SelectFormContentProps<T>) {
  const { setSubmittedData, currentStep } = useMultiForm();

  // Save form data when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange();
    }
  }, [currentStep, onStepChange]);

  // Handle form completion with visible steps
  const handleComplete = (visibleSteps: number[]) => {
    // Only validate fields from visible steps
    const fieldsToValidate = visibleSteps.flatMap(
      (step) => stepFields[step] || []
    );

    // Custom submit handler that only validates visible fields
    const customSubmit = async () => {
      try {
        console.log("Submitting form with visible steps:", visibleSteps);
        console.log("Fields to validate:", fieldsToValidate);

        // If there are fields to validate, trigger validation
        if (fieldsToValidate.length > 0) {
          const isValid = await form.trigger(fieldsToValidate as any);
          console.log("Validation result:", isValid);

          if (!isValid) {
            toast({
              title: "Validation Error",
              description: "Please check your inputs and try again.",
              variant: "error",
            });
            console.log("Please check your inputs and try again.");
            return;
          }
        }

        // Get the form values and submit
        const values = form.getValues();
        console.log("Form values:", values);

        // Store the submitted data in the wizard context
        setSubmittedData(values);

        // Call the onSubmit function directly
        onSubmit(values);

        // Clear persisted data after successful submission
        if (clearPersistedData) {
          clearPersistedData();
        }

        // Show a success toast
        toast({
          title: "Form submitted!",
          description: "Thank you for completing the form.",
          variant: "success",
        });
      } catch (error) {
        console.error("Form submission error:", error);
        toast({
          title: "Error",
          description: "There was a problem submitting the form.",
          variant: "error",
        });
      }
    };

    // Execute the submit handler
    customSubmit();
  };

  return (
    <>
      {children}
      <MultiFormButtons onComplete={handleComplete} />
    </>
  );
}
