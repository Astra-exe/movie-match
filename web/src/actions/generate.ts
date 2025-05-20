"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { SelectionData } from "@/lib/data/schema";

// import { generateOpts } from "@/lib/data/mocks";

interface RecommendationGenerated {
  affinity: number;
  genres: string[];
  movie_id: string;
  title: string;
  why: string;
}

interface SelectMovieResponse {
  recommendations: RecommendationGenerated[];
  info: {
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

interface SubmitFormSelectMovieResponse {
  success: boolean;
  data: SelectMovieResponse | null;
  message: string;
  error?: string;
}

export async function submitFormSelectMovie(
  values: SelectionData
): Promise<SubmitFormSelectMovieResponse> {
  try {
    const { name, size, people, context, mood, comments } = values;

    const payload = {
      name,
      size,
      people,
      context,
      mood,
      comments,
    };

    // return {
    //   success: true,
    //   data: {
    //     ...generateOpts,
    //     info: {
    //       visit: name,
    //       context: context ?? "",
    //       mood: mood ?? "",
    //       comments: comments ?? "",
    //       people: people ?? [],
    //     },
    //   },
    //   message: "Your movie options has been successfully selected!",
    // };

    const urlRecommend = `${process.env.API_ANALIZE_URL}/recommend`;
    const response = await fetch(urlRecommend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error al generar los datos");
    }

    const dataResults = await response.json();

    return {
      success: true,
      data: {
        ...dataResults,
        info: {
          visit: name,
          context: context ?? "",
          mood: mood ?? "",
          comments: comments ?? "",
          people: people ?? [],
        },
      },
      message: "Tus opciones de película han sido seleccionadas exitosamente!",
    };
  } catch (error) {
    console.error("Error submiting data", error);
    return {
      success: false,
      data: null,
      error: "Error al enviar los datos. Inténtalo de nuevo más tarde",
      message:
        error instanceof Error ? error.message : "Ocurrio un error desconocido",
    };
  }
}

export async function passDataToServer(data: SelectMovieResponse) {
  const cookieStore = await cookies();

  // const cookieValue = encodeURIComponent(JSON.stringify(data));
  const jsonString = JSON.stringify(data);
  const encodedValue = Buffer.from(jsonString).toString("base64");

  console.log("setting cookie");
  cookieStore.set({
    name: "optionsGenerated",
    value: encodedValue,
    path: "/", // recommended to specify path
    httpOnly: true, // recommended for security if cookie is not accessed by client JS
    maxAge: 60 * 60,
    sameSite: "lax",
  });

  redirect("/results");
}
