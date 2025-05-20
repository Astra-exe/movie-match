"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/useToast";
import { useState } from "react";

import SelectWrapperForm from "@/app/generate/_components/SelectWrapperForm";
import VisitInfoStep from "@/app/generate/_components/FormSteps/FormStepVisit";
import FormStepAttendences from "@/app/generate/_components/FormSteps/FormStepAttendences";
import FormStepContext from "@/app/generate/_components/FormSteps/FormStepContext";

import type { SelectionData } from "@/lib/data/schema";
import { formSchema, defaultValues, stepFields } from "@/lib/data/schema";
import { submitFormSelectMovie, passDataToServer } from "@/actions/generate";

export default function SelectForm() {
  const form = useForm<SelectionData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  // Watch the number of people to pass to the Attendences step
  const numPeople = useWatch({
    control: form.control,
    name: "size",
    defaultValue: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: SelectionData) => {
    setIsLoading(true);
    let recommendationsMovies = null;
    try {
      const dataResponse = await submitFormSelectMovie(values);

      if (dataResponse.success) {
        if (dataResponse.data) {
          toast({
            title: "Your movie options are ready",
            description: dataResponse.message,
            variant: "success",
          });
          recommendationsMovies = dataResponse.data;
        }
      } else {
        toast({
          title: "Error",
          description: dataResponse.error,
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem. Please try again.",
        variant: "error",
      });
    }
    if (recommendationsMovies) {
      await passDataToServer(recommendationsMovies);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <span className="text-lg text-white font-semibold">
            Processing your movie options...
          </span>
        </div>
      )}
      <SelectWrapperForm
        title="Movie Visit Selection"
        description="Plan your perfect movie outing in just a few steps."
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        form={form}
        stepFields={stepFields}
        persistenceKey="movie-visit-planner"
        persistForm={true}
      >
        <VisitInfoStep form={form} stepFields={stepFields[0]} />
        <FormStepAttendences
          form={form}
          stepFields={stepFields[1]}
          people={numPeople}
        />
        <FormStepContext form={form} stepFields={stepFields[2]} />
      </SelectWrapperForm>
    </>
  );
}
