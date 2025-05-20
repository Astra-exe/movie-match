import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface FormCreateSelectMovieProps {
  moviePick: {
    id: string;
    title: string;
    overview: string;
    genres: string[];
    releaseDate: string;
    posterPath: string;
    backdropPath: string;
    youtubeVideoKey: string;
    affinity: number;
    why: string;
  };
  infoVisit: {
    visit: string;
    context: string;
    mood: string;
    comments: string;
    people: {
      name: string;
      genre: string;
      emojis: string[];
    }[];
  };
}

const FormSchema = z.object({
  isPublic: z.boolean(),
});

export default function FormCreateSelectMovie({
  moviePick,
  infoVisit,
}: FormCreateSelectMovieProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isPublic: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // using a server component to create a selection
    console.log({ data, moviePick, infoVisit });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 rounded-lg border p-3 shadow-sm">
                <FormLabel>
                  ¿Quieres que tu seleccion generada sea publica?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              Save Pick
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
