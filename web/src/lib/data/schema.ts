import { z } from "zod";
import { genres, contextOpts, moodOpts } from "@/lib/data/mocks";

// Step 1: Basic visit information
export const formSchemaStep1 = z.object({
  name: z
    .string({ required_error: "Visit name is required" })
    .nonempty("Visit name is required")
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(120, { message: "Name must be at most 120 characters long" }),
  size: z
    .number()
    .int()
    .gte(1, { message: "At least has to be 1" })
    .lte(8, { message: "This is too big, set a value less or equal than 8" }),
});

// Attendece schema for Step 2
export const attendenceSchema = z.object({
  name: z.string().min(1, { message: "Friend's name is required" }),
  genre: z.enum(genres.map((opt) => opt.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Movie gender preference is required" }),
  }),
  emojis: z
    .array(z.string().emoji({ message: "Only emoji characters are allowed" }), {
      invalid_type_error: "Please enter exactly two emojis",
    })
    .length(2, { message: "Please enter exactly two emojis" }),
});

// Step 2: Attendences information
export const formSchemaStep2 = z.object({
  people: z
    .array(attendenceSchema)
    .min(1, { message: "At least one attendece is required" }),
});

// Step 3: Context information
export const formSchemaStep3 = z.object({
  context: z.enum(contextOpts.map((opt) => opt.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Context is required" }),
  }),
  mood: z.enum(moodOpts.map((opt) => opt.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Mood is required" }),
  }),
  comments: z.string(),
});

// Combined schema with partial steps 2 and 3
export const formSchema = formSchemaStep1
  .merge(formSchemaStep2.partial())
  .merge(formSchemaStep3.partial());

export type SelectionData = z.infer<typeof formSchema>;

// Default values for the form
export const defaultValues: SelectionData = {
  name: "",
  size: 1,
  people: [],
  context: undefined,
  mood: undefined,
  comments: "",
};

// Define the fields for each step
export const stepFields = {
  0: ["name", "size"],
  1: ["people"],
  2: ["context", "mood", "comments"],
};
