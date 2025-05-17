"use client";

import FormStep from "@/app/generate/_components/FormStep";
import type { SelectionData } from "@/lib/data/schema";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface VisitInfoStepProps {
  form: UseFormReturn<SelectionData>;
  stepFields: string[];
}

export default function VisitInfoStep({
  form,
  stepFields,
}: VisitInfoStepProps) {
  const validateStep = async () => {
    return form.trigger(stepFields as any);
  };

  return (
    <FormStep step={0} validator={validateStep} fieldNames={stepFields}>
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Your Visit</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visit Name</FormLabel>
              <FormControl>
                <Input
                  className="border border-ring placeholder:text-gray-400 placeholder:italic"
                  placeholder="Movie night"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of People</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={8}
                  className="border border-ring"
                  {...field}
                  onChange={(e) => {
                    // Convert string to number
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormStep>
  );
}
