"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import type { SelectionData } from "@/lib/data/schema";
import { formSchema, defaultValues, stepFields } from "@/lib/data/schema";
import SelectWrapperForm from "@/app/generate/_components/SelectWrapperForm";
import VisitInfoStep from "@/app/generate/_components/FormSteps/FormStepVisit";
import FormStepAttendences from "./FormSteps/FormStepAttendences";
import FormStepContext from "./FormSteps/FormStepContext";
import { submitFormSelectMovie } from "@/actions/generate";
import Results from "./Results";

export default function SelectForm() {
  const [results, setResults] = useState<any>(null);

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

  const onSubmit = async (values: SelectionData) => {
    try {
      const dataResponse = await submitFormSelectMovie(values);

      if (dataResponse.success) {
        if (dataResponse.data) {
          // toast
          const { recommendations } = dataResponse.data;
          setResults(recommendations); // Save the results to state
        }
      } else {
        //  toast({
        //   title: "Error",
        //   description: dataResponse.error,
        //   variant: "destructive",
        // })
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // toast({
      //   title: "Submission failed",
      //   description: "There was a problem. Please try again.",
      //   variant: "destructive",
      // })
    }
  };

  if (results) {
    // Render the server Results component with the results as prop
    return <Results results={results} />;
  }

  return (
    <>
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
