import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const URL_API_TMDB = "https://api.themoviedb.org/3";

export async function fetchMovieById({ idMovie }: { idMovie: string }) {
  const urlToFetch = `${URL_API_TMDB}/movie/${idMovie}?api_key=${process.env.TMDB_API_KEY}&language=es-MX`;
  try {
    const response = await fetch(urlToFetch);
    console.log(response);
    if (!response.ok) {
      throw new Error("Something went wrong, try again later");
    }

    const movieData = response.json();
    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export async function fetchMovieVideoById({ idMovie }: { idMovie: string }) {
  const urlToFetch = `${URL_API_TMDB}/movie/${idMovie}/videos?api_key=${process.env.TMDB_API_KEY}&language=es-MX`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error("Something went wrong, try again later");
    }

    const movieVideoData = response.json();
    return movieVideoData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export async function getMovieInfoById(idMovie: string) {
  const movieData = await fetchMovieById({ idMovie });
  const movieVideoData = await fetchMovieVideoById({ idMovie });
  if (!movieData) {
    throw new Error("Error fetching movie data");
  }
  if (!movieVideoData) {
    throw new Error("Error fetching movie video data");
  }

  const posterPathUrl = getMoviePosterUrl(movieData.poster_path, 500);
  const backdropPathUrl = getMoviePosterUrl(movieData.backdrop_path, 1280);
  const videoYouTubeKey = movieVideoData.results.find(
    (video: { site: string; type: string }) =>
      video.site === "YouTube" && video.type === "Trailer"
  )?.key;

  return {
    title: movieData.title,
    genres: movieData.genres.map((genre: { name: string }) => genre.name),
    overview: movieData.overview,
    release_date: movieData.release_date,
    poster_path: posterPathUrl,
    backdrop_path: backdropPathUrl,
    youtube_video_key: videoYouTubeKey,
  };
}
export function getMoviePosterUrl(posterPath: string, width = 500) {
  if (!posterPath) {
    return null; // Handle the case where posterPath is not available
  }
  // Construct the full URL for the poster image
  const baseUrl = "https://image.tmdb.org/t/p";
  const size = `w${width}`; // You can change the size as needed
  return `${baseUrl}/${size}/${posterPath}`;
}
