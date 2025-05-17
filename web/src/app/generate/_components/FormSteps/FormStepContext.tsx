"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormStep from "@/app/generate/_components/FormStep";
import type { UseFormReturn } from "react-hook-form";
import type { SelectionData } from "@/lib/data/schema";
import { contextOpts, moodOpts } from "@/lib/data/mocks";

interface ContextStepProps {
  form: UseFormReturn<SelectionData>;
  stepFields: string[];
}

export default function FormStepContext({
  form,
  stepFields,
}: ContextStepProps) {
  const validateStep = async () => {
    const values = form.getValues();
    if (!values.context) {
      form.setError("context", {
        type: "manual",
        message: "Context is required",
      });
      return false; // Prevent step completion
    }
    if (!values.mood) {
      form.setError("mood", { type: "manual", message: "Mood is required" });
      return false; // Prevent step completion
    }
    return form.trigger(stepFields as any);
  };

  return (
    <FormStep step={2} validator={validateStep} fieldNames={stepFields}>
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Visit Context</h3>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="context"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Context</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="border border-ring w-full"
                      autoFocus
                    >
                      <SelectValue placeholder="Select context" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contextOpts.map((context) => (
                      <SelectItem key={context.name} value={context.name}>
                        {context.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border border-ring w-full placeholder:text-gray-400 placeholder:italic">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {moodOpts.map((mood) => (
                      <SelectItem key={mood.name} value={mood.name}>
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional comments or notes about this visit..."
                  className="min-h-[120px] border border-ring"
                  {...field}
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
