"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { contextOpts, moodOpts, genres } from "@/lib/data/mocks";
import { useEffect, useState } from "react";

const formSchemaStep1 = z.object({
  name: z
    .string({ required_error: "Visit name is required" })
    .nonempty("Visit name is required")
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(10, { message: "Name must be at most 40 characters long" }),
  people: z
    .number()
    .int()
    .gte(1, { message: "At least has to be 1" })
    .lte(8, { message: "This is too big, set a value less or equal than 8" }),
});

const attendeeSchema = z.object({
  friendName: z.string().min(1, { message: "Friend's name is required" }),
  movieGender: z.enum(genres.map((opt) => opt.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Movie gender preference is required" }),
  }),
});

const formSchemaStep2 = z.object({
  friends: z
    .array(attendeeSchema)
    .min(1, { message: "At least one friend is required" }),
});

const formSchemaStep3 = z.object({
  context: z.enum(contextOpts.map((opt) => opt.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Context is required" }),
  }),
  mood: z.enum(moodOpts.map((opt) => opt.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Mood is required" }),
  }),
  comments: z.string().min(1, { message: "Comments are required" }),
});

const formSchema = formSchemaStep1
  .merge(formSchemaStep2.partial())
  .merge(formSchemaStep3.partial());
type SelectionData = z.infer<typeof formSchema>;

export default function MovieForm() {
  const [step, setStep] = useState(1);

  const form = useForm<SelectionData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      people: 1,
      friends: [{ friendName: "", movieGender: "" }],
      context: "",
      mood: "",
      comments: "",
    },
  });

  const peopleCount = form.watch("people");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "friends",
  });

  useEffect(() => {
    const diff = peopleCount - fields.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        append({ friendName: "", movieGender: "" });
      }
    } else if (diff < 0) {
      for (let i = 0; i < -diff; i++) {
        remove(fields.length - 1 - i);
      }
    }
  }, [peopleCount, fields.length, append, remove]);

  const onSubmit = async (data: SelectionData) => {
    console.log(data);
    try {
      const result = formSchema.safeParse(data);
      if (!result.success) throw new Error("Invalid data");
      // fetch to craete a new group
      // const { fullname, city, weight, height, age, experience } = result.data;
      // toast.promise(
      //   createPlayer({
      //     fullname,
      //     city,
      //     weight,
      //     height,
      //     age,
      //     experience,
      //   }),
      //   {
      //     loading: "Inscribiendo jugador...",
      //     success: () => "Jugador inscrito con éxito!",
      //     error: (error) => {
      //       if (error instanceof Error) {
      //         return error.message.includes("No autorizado")
      //           ? "Debes iniciar sesión para crear parejas"
      //           : error.message;
      //       }
      //       return "Error desconocido al inscribir al jugador";
      //     },
      //   }
      // );
    } catch (error) {
      console.error("Unexpected error:", error);
      // toast.error("Error inesperado al crear la pareja");
    }
    form.reset();
  };

  async function nextStep() {
    let valid = false;
    if (step === 1) {
      valid = await form.trigger(["name", "people"]);
    } else if (step === 2) {
      valid = await form.trigger("friends");
    } else {
      valid = true;
    }

    if (valid) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Step indicator */}

        {/* Steps Forms*/}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-5">Your Visit</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name your visit</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-ring placeholder:text-gray-400 placeholder:italic"
                      placeholder="Enter visit name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="people"
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
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-5">Visit Attendences</h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-popover space-y-6 border rounded px-4 py-6 mb-6"
                >
                  <div className="flex justify-end">
                    <span className="font-semibold text-lg mb-2 bg-secondary p-1.5 rounded">
                      Attendence {index + 1}
                    </span>
                  </div>

                  <FormField
                    control={form.control}
                    name={`friends.${index}.friendName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attendence's Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter attendence's name"
                            {...field}
                            className="border border-ring"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`friends.${index}.movieGender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Movie Genre Preference</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue=""
                          >
                            <SelectTrigger className="border border-ring w-full">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              {genres.map((option) => (
                                <SelectItem
                                  key={option.name}
                                  value={option.name}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Context</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select context" />
                      </SelectTrigger>
                      <SelectContent>
                        {contextOpts.map((option) => (
                          <SelectItem key={option.name} value={option.name}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Mood</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {moodOpts.map((option) => (
                          <SelectItem key={option.name} value={option.name}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Input placeholder="Any other comments..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Any other comments you want to add?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Control navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button
              variant="outline"
              type="button"
              onClick={prevStep}
              className="cursor-pointer"
            >
              Back
            </Button>
          )}

          {step < 3 && (
            <Button type="button" onClick={nextStep} className="cursor-pointer">
              Next
            </Button>
          )}

          {step === 3 && (
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
