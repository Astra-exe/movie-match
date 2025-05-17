"use server";

import type { SelectionData } from "@/lib/data/schema";

interface RecommendationGenerated {
  affinity: number;
  genres: string[];
  movie_id: string;
  title: string;
  why: string;
}

interface SelectMovieResponse {
  recommendations: RecommendationGenerated[];
}

interface SubmitFormSelectMovieResponse {
  success: boolean;
  data: SelectMovieResponse | null;
  message: string;
  error?: string;
}

const URL_API_ANALIZE = "http://localhost:5000/recommend";

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

    const response = await fetch(URL_API_ANALIZE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    const data = await response.json();

    return {
      success: true,
      data,
      message: "Your movie options has been successfully selected!",
    };
  } catch (error) {
    console.error("Error submiting data", error);
    return {
      success: false,
      data: null,
      error: "Failed to submit data.",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
