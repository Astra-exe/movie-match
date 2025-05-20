"use client";

import { useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  Users,
  SaveIcon,
  LogInIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardMovieOption from "./CardMovieOption";
import FormCreateSelectMovie from "./FormCreateSelectMovie";
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

const attendees = ["Maria", "John", "Alex", "Sarah", "Michael"];

export default function MovieOptions({
  movieList,
  infoVisit,
}: MovieOptionsProps) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const { isSignedIn, isLoaded } = useUser();

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
      </section>

      {/* Movie Details Pick */}
      {showDetails && (
        <section className="max-w-6xl mx-auto bg-gray-900 rounded-xl p-4 md:p-8 animate-fadeIn">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="relative aspect-[2/3] mx-auto md:mx-0 max-w-[300px]">
              <Image
                src={selectedMovie.posterPath || "/placeholder.svg"}
                alt={selectedMovie.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {selectedMovie.title}
                </h2>
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full self-start">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500 mr-1.5" />
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      Affinity Score:
                    </span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">
                    {selectedMovie.affinity}%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedMovie.genres.map((genre) => (
                  <Badge
                    key={genre}
                    className="bg-accent text-primary-foreground"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-300">{selectedMovie.overview}</p>

              <div>
                <h3 className="text-lg font-semibold mb-2">Why Watch It</h3>
                <p className="text-gray-300">{selectedMovie.why}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  People Going ({attendees.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {attendees.map((person) => (
                    <Badge
                      key={person}
                      variant="outline"
                      className="bg-gray-800 rounded-full"
                    >
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-x-5 items-center">
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

                {!isSignedIn ? (
                  <SignInButton
                    mode="modal"
                    appearance={{
                      elements: {
                        formButtonPrimary:
                          "bg-slate-500 hover:bg-slate-400 text-sm",
                      },
                    }}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="ml-2 cursor-pointer"
                    >
                      <LogInIcon className="h-4 w-4 mr-2" />
                      Logueate para guardar
                    </Button>
                  </SignInButton>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                        <SaveIcon className="w-4 h-4 mr-2" />
                        Guardar esta opción
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card text-foreground border border-gray-800 w-auto  md:w-[120vw] mx-auto">
                      <DialogTitle>Guarda tu selección de pelicula</DialogTitle>
                      <DialogDescription>
                        Tu has seleccionado{" "}
                        <span className="font-semibold">
                          {selectedMovie.title}
                        </span>
                      </DialogDescription>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-16 h-24 relative flex-shrink-0">
                            <Image
                              src={
                                selectedMovie.posterPath || "/placeholder.svg"
                              }
                              alt={selectedMovie.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{selectedMovie.title}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                              <span className="text-sm">
                                {selectedMovie.affinity}% Score Affinity
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <FormCreateSelectMovie
                            infoVisit={infoVisit}
                            moviePick={selectedMovie}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
