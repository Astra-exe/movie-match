import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";
import { Badge } from "@/components/ui/badge";
import { getMovieInfoById } from "@/lib/utils";
import { Calendar, Heart, Tag, Users } from "lucide-react";
import Image from "next/image";

export default async function SelectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("Movie id ", id);

  // 1 get the pick selection from DB by the id
  const selectionInfo = {
    visitName: "Sci-Fi Thursday",
    isPublic: false,
    context: "Weekly friend gathering for new releases",
    mood: "Excited",
    why: "The epic conclusion to the first part with breathtaking visuals, compelling performances, and faithful adaptation of the beloved sci-fi novel. Denis Villeneuve's direction creates an immersive experience that will leave you in awe.",
    affinity: 50,
    comments:
      "Everyone has been waiting for this sequel since the first part. We're planning to get there early for good seats.",
    people: [
      {
        name: "Jonh",
        genre: "Sci-Fi",
      },
      {
        name: "Alex",
        genre: "Adventure",
      },
      {
        name: "Maria",
        genre: "Sci-Fi",
      },
      {
        name: "Sarah",
        genre: "Drama",
      },
    ],
  };

  // 2 get the movie info by the movieId  from TMDB
  const movieInfoFromTMDB = await getMovieInfoById("1895");

  const {
    title,
    genres,
    overview,
    poster_path,
    backdrop_path,
    youtube_video_key,
  } = movieInfoFromTMDB;

  const movieInfo = {
    title,
    overview,
    genres,
    posterPath: poster_path,
    backdropPath: backdrop_path,
    youtubeKey: youtube_video_key,
  };

  // 3 mix the information needed if is neccesary
  // 4 add suspense

  return (
    <div className="w-full min-h-screen min-w-[320px] font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="bg-background text-foreground pb-32">
        {/* Page title and description */}
        <header className="w-[90%] mx-auto">
          <div className="py-8 md:py-14 lg:py-20 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-primary">
              My Movie Pick Selections
            </h1>
            <p className="mb-3 text-lg text-gray-300">
              Your collection of movie picks based on your visit information
            </p>
          </div>
        </header>

        {/* Selection of this poage */}
        <main>
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl p-4 md:p-8 animate-fadeIn">
            <article className="grid md:grid-cols-[300px_1fr] gap-6">
              {/* Poster Img */}
              <div className="relative aspect-[2/3] mx-auto md:mx-0 max-w-[300px]">
                <Image
                  src={movieInfo.posterPath || "/placeholder.svg"}
                  alt={movieInfo.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Movie info */}
              <div className="space-y-4">
                {/* Title and affinity */}
                <div className="flex flex-col-reverse  sm:justify-between sm:items-start gap-2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {movieInfo.title}
                  </h2>
                  <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full self-start">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500 mr-1.5" />
                      <span className="text-xs sm:text-sm font-medium text-gray-300">
                        Affinity Score:
                      </span>
                    </div>
                    <span className="font-bold text-sm sm:text-base">
                      {50}%
                    </span>
                  </div>
                </div>

                {/* Movie genres  */}
                <div className="flex flex-wrap gap-2">
                  {movieInfo.genres.map((genre: string) => (
                    <Badge
                      key={genre}
                      className="bg-accent text-primary-foreground"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>

                {/* Visit Information */}
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-3 border border-gray-700">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Visit Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Visit Name</p>
                      <p className="font-medium">{selectionInfo.visitName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Mood</p>
                      <div className="flex items-center gap-1.5">
                        {/* <Smile className="w-4 h-4 text-yellow-400" /> */}
                        <p className="font-medium">{selectionInfo.mood}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-400">Context</p>
                      <p>{selectionInfo.context}</p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-400">Comments</p>
                      <p className="text-sm">{selectionInfo.comments}</p>
                    </div>
                  </div>
                </div>

                {/* Movie overview */}
                <p className="text-gray-300">{movieInfo.overview}</p>

                {/* Why to watch - reasons */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Why Watch It</h3>
                  <p className="text-gray-300">{selectionInfo.why}</p>
                </div>

                {/* People to go */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    People Going ({selectionInfo.people.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectionInfo.people.map((attendee) => (
                      <div
                        key={attendee.name}
                        className="flex items-center gap-2 bg-gray-800/60 rounded-lg p-2"
                      >
                        <Badge variant="outline" className="bg-gray-700">
                          {attendee.name}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-300">
                          <Tag className="w-3 h-3" />
                          <span>Prefers: {attendee.genre}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
