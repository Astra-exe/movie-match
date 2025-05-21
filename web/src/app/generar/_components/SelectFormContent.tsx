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
              title: "Error de validación",
              description: "Por favor, revisa los campos resaltados.",
              variant: "error",
            });
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
          title: "Información enviada",
          description: "Gracias por completar el formulario.",
          variant: "success",
        });
      } catch (error) {
        console.error("Form submission error:", error);
        toast({
          title: "Error",
          description: "Hubo un problema al enviar el formulario.",
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
