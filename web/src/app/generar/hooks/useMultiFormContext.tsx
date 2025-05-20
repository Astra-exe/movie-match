import { MultiFormContext } from "@/app/generar/context/MultiFormContext";
import { useContext } from "react";

export function useMultiForm() {
  const context = useContext(MultiFormContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
