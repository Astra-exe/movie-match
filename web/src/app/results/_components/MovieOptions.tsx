"use client";

import { useState } from "react";
import { Suspense } from "react";

import Image from "next/image";
import {
  Heart,
  Play,
  Users,
  SaveIcon,
  LogInIcon,
  Calendar,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardMovieOption from "./CardMovieOption";
import CardMovieOptionSkeleton from "./CardMovieOptionSkeleton";
import "@justinribeiro/lite-youtube";

interface MovieOptionsProps {
  movieList: {
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
  }[];
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

export default function MovieOptions({
  movieList,
  infoVisit,
}: MovieOptionsProps) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const selectMovie = (indexMovie: number) => {
    setSelectedMovieIndex(indexMovie);
    setShowDetails(true);
  };

  const nextMovie = () => {
    const nextIndex = selectedMovieIndex + 1;
    if (nextIndex >= movieList.length) {
      setSelectedMovieIndex(0);
      return;
    }
    setSelectedMovieIndex(nextIndex);
  };

  const prevMovie = () => {
    const prevIndex = selectedMovieIndex - 1;
    if (prevIndex < 0) {
      setSelectedMovieIndex(movieList.length - 1);
      return;
    }
    setSelectedMovieIndex(prevIndex);
  };

  const selectedMovie = movieList[selectedMovieIndex];

  return (
    <div>
      {/* Movie Options */}
      <section className="relative max-w-6xl mx-auto mb-8">
        <Suspense
          fallback={
            <div className="flex justify-center overflow-x-auto gap-4 py-4 snap-x snap-mandatory scrollbar-hide">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardMovieOptionSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="flex justify-center overflow-x-auto gap-4 py-4 snap-x snap-mandatory scrollbar-hide">
            {movieList.map((movie, index) => (
              <CardMovieOption
                key={movie.id}
                movie={movie}
                isSelected={selectedMovieIndex === index}
                indexMovie={index}
                onSelect={selectMovie}
              />
            ))}
          </div>
        </Suspense>
      </section>

      {/* Movie Details Pick */}
      {showDetails && (
        <section className="max-w-6xl mx-auto bg-gray-900 rounded-xl p-4 md:p-8 animate-fadeIn">
          <article className="grid md:grid-cols-[300px_1fr] gap-6">
            {/* Poster Img */}
            <div className="relative aspect-[2/3] mx-auto md:mx-0 max-w-[300px]">
              <Image
                src={selectedMovie.posterPath || "/placeholder.svg"}
                alt={selectedMovie.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Movie info */}
            <div className="space-y-4">
              {/* Title and affinity */}
              <div className="flex flex-col-reverse  sm:justify-between sm:items-start gap-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {selectedMovie.title}
                </h2>
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full self-start">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500 mr-1.5" />
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      Afinidad:
                    </span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">
                    {selectedMovie.affinity}%
                  </span>
                </div>
              </div>

              {/* Movie genres  */}
              <div className="flex flex-wrap gap-2">
                {selectedMovie.genres.map((genre: string) => (
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
                  Detalles de la visita
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Nombre de la visita</p>
                    <p className="font-medium">{infoVisit.visit}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Estado de ánimo</p>
                    <div className="flex items-center gap-1.5">
                      {/* <Smile className="w-4 h-4 text-yellow-400" /> */}
                      <p className="font-medium">{infoVisit.mood}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-400">Contexto</p>
                    <p>{infoVisit.context}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-400">Comentarios</p>
                    <p className="text-sm">{infoVisit.comments}</p>
                  </div>
                </div>
              </div>

              {/* Movie overview */}
              <p className="text-gray-300">{selectedMovie.overview}</p>

              {/* Why to watch - reasons */}
              <div>
                <h3 className="text-lg font-semibold mb-2">¿Por qué verla?</h3>
                <p className="text-gray-300">{selectedMovie.why}</p>
              </div>

              {/* People to go */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Personas en el plan({infoVisit.people.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {infoVisit.people.map((attendee) => (
                    <div
                      key={attendee.name}
                      className="flex items-center gap-2 bg-gray-800/60 rounded-lg p-2"
                    >
                      <Badge variant="outline" className="bg-gray-700">
                        {attendee.name}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Tag className="w-3 h-3" />
                        <span>Prefiere: {attendee.genre}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-x-5 items-center">
                {selectedMovie.youtubeVideoKey && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-input text-foreground hover:bg-secondary cursor-pointer">
                        <Play className="w-4 h-4 mr-2" />
                        Ver Trailer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle></DialogTitle>
                      <DialogClose className="absolute bg-white/60 top-4 right-4 rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-[20] cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </DialogClose>
                      <div className="">
                        {/* @ts-expect-error: Custom element not recognized by TS */}
                        <lite-youtube videoid={selectedMovie.youtubeVideoKey} />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}
