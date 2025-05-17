"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormStep from "@/app/generate/_components/FormStep";
import { useFieldArray } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { SelectionData } from "@/lib/data/schema";
import { genres } from "@/lib/data/mocks";
import { useEffect } from "react";

interface FriendsStepProps {
  form: UseFormReturn<SelectionData>;
  stepFields: string[];
  people: number;
}

export default function FormStepAttendences({
  form,
  stepFields,
  people,
}: FriendsStepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "people",
  });

  const validateStep = async () => {
    return form.trigger(stepFields as any);
  };

  // Ensure we have exactly the number of friends matching the people count
  useEffect(() => {
    const currentCount = fields.length;

    // If we need to add more friends
    if (currentCount < people) {
      // Add the missing number of friends
      const friendsToAdd = people - currentCount;
      for (let i = 0; i < friendsToAdd; i++) {
        append({ name: "", genre: genres[0].name, emojis: [] });
      }
    }
    // If we need to remove excess friends
    else if (currentCount > people) {
      // Remove excess friends from the end
      const friendsToRemove = currentCount - people;
      for (let i = 0; i < friendsToRemove; i++) {
        remove(currentCount - 1 - i);
      }
    }
  }, [append, fields.length, people, remove]);

  return (
    <FormStep step={1} validator={validateStep} fieldNames={stepFields}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Attendences</h3>
          <span className="text-sm text-muted-foreground">
            {fields.length} of {people} attendences
          </span>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-popover p-4 border rounded relative"
            >
              <span className="inline-flex items-center justify-center w-8 aspect-square p-1.5 mb-4 bg-secondary rounded-full font-semibold text-sm">
                {index + 1}
              </span>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name={`people.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attendence's Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="border border-ring placeholder:text-gray-400 placeholder:italic"
                          autoFocus={index === 0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`people.${index}.genre`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Movie Genre Preference</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-ring w-full">
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre.name} value={genre.name}>
                              {genre.label}
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
                  name={`people.${index}.emojis`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Representative Emojis</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="😎🎬"
                          className="border border-ring placeholder:text-gray-400 placeholder:italic"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join("")
                              : ""
                          }
                          onChange={(e) => {
                            // Split input into array of emojis
                            const emojiArray = Array.from(
                              e.target.value
                            ).filter((char) => /\p{Emoji}/u.test(char));
                            field.onChange(emojiArray);
                          }}
                          maxLength={4} // 2 emojis, but some emojis are 2 chars
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        {form.formState.errors.people &&
          !Array.isArray(form.formState.errors.people) && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.people.message}
            </p>
          )}
      </div>
    </FormStep>
  );
}
