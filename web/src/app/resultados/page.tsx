import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";
import { getMovieInfoById } from "@/lib/utils";
import { cookies } from "next/headers";
import MovieOptions from "./_components/MovieOptions";
import { Suspense } from "react";

interface GenerateResult {
  affinity: number;
  genres: string[];
  movie_id: string;
  title: string;

  why: string;
}

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

interface MovieOption {
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
}

export default async function ResultsPage() {
  // get the movie options from the cookies
  const cookieStore = await cookies();
  const cookie = cookieStore.get("optionsGenerated");
  let movieRecommendations: SelectMovieResponse | null = null;
  if (cookie) {
    const decoded = Buffer.from(cookie.value, "base64").toString("utf-8");
    movieRecommendations = JSON.parse(decoded);
  }

  let movieOptions: MovieOption[] = [];
  if (movieRecommendations) {
    const movieOptionsPromise = movieRecommendations.recommendations.map(
      async (item: GenerateResult) => {
        const { affinity, genres, movie_id, why } = item;
        const movieInfo = await getMovieInfoById(movie_id);
        const {
          title: titleMovie,
          overview,
          release_date,
          poster_path,
          backdrop_path,
          youtube_video_key,
        } = movieInfo;

        // Mix the resultsData and the movie info to render the movie cards options
        return {
          id: String(movie_id),
          title: String(titleMovie ?? ""),
          overview: String(overview ?? ""),
          genres,
          releaseDate: String(release_date ?? ""),
          posterPath: poster_path ?? "",
          backdropPath: backdrop_path ?? "",
          youtubeVideoKey: String(youtube_video_key ?? ""),
          affinity: Number(((affinity ?? 0) * 100).toFixed(2)),
          why: String(why ?? ""),
        };
      }
    );
    // Use Promise.all to wait for all movie info promises to resolve with await
    movieOptions = await Promise.all(movieOptionsPromise);
    console.log({ movieOptions, info: movieRecommendations.info });
  }

  // Handle errors if any of the promises fail
  if (movieOptions.some((movie) => movie === null)) {
    throw new Error("Error fetching movie data");
  }

  return (
    <div className="w-full min-h-screen min-w-[320px] font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="bg-background text-foreground pb-32">
        <header className="w-[90%] mx-auto">
          <div className="py-8 md:py-14 lg:py-20 text-center max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Tus recomendaciones de películas
            </h1>
            <p className="mb-3 text-lg text-gray-300">
              Revisa las opciones que encontramos para ti según tu información y
              elige tu favorita. Estamos seguros de que la disfrutarás.
            </p>
          </div>
        </header>
        <main>
          <div>
            {!movieRecommendations || movieOptions.length === 0 ? (
              <div className="text-center py-8 text-xl">
                No se encontraron películas que coincidan con tus preferencias.
                Por favor intenta de nuevo.
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="text-center py-10 text-lg">
                    Cargando recomendaciones...
                  </div>
                }
              >
                <MovieOptions
                  movieList={movieOptions}
                  infoVisit={movieRecommendations.info}
                />
              </Suspense>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
