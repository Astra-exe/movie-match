"use client";

import React from "react";
import type { z } from "zod";
import type { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { MultiFormContextProvider } from "@/app/generate/context/MultiFormContext";
import { SelectFormContent } from "./SelectFormContent";
import { MultiFormProgress } from "./MultiFormProgress";

interface SelectWrapperFormProps<T extends z.ZodType> {
  title: string;
  description?: string;
  defaultValues: z.infer<T>;
  onSubmit: (values: z.infer<T>) => void;
  children: React.ReactNode;
  className?: string;
  form: UseFormReturn<z.infer<T>>;
  stepFields?: { [key: number]: string[] };
  persistenceKey?: string;
  persistForm?: boolean;
}

export default function SelectWrapperForm<T extends z.ZodType>({
  title,
  description,
  defaultValues,
  onSubmit,
  children,
  className,
  form,
  stepFields = {},
  persistenceKey = "multi-step-form-data",
  persistForm = false,
}: SelectWrapperFormProps<T>) {
  return (
    <article className="bg-card p-8 border-2 border-border rounded max-w-4xl mx-auto">
      <hgroup className="mb-8">
        <h3 className="font-bold text-3xl">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </hgroup>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <MultiFormContextProvider
            totalSteps={React.Children.count(children)}
            initialStep={0}
          >
            <SelectFormContent
              onSubmit={onSubmit}
              form={form}
              stepFields={stepFields}
            >
              <MultiFormProgress className="mb-8" />
              {children}
            </SelectFormContent>
          </MultiFormContextProvider>
        </form>
      </Form>
    </article>
  );
}
