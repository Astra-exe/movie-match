import type React from "react";
// This is a simplified version of the toast component
// In a real project, you would use the full implementation from shadcn/ui

import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "error" | "success" | "warning" | "info";
};

export const toast = ({
  title,
  description,
  action,
  variant = "default",
}: ToastProps) => {
  console.log("Toast called:", { title, description, variant });

  // For default type, use the regular toast
  if (variant === "default") {
    return sonnerToast(title, {
      description,
      action,
    });
  }

  // For other types, use the specific toast method
  return sonnerToast[variant](title, {
    description,
    action,
  });
};
