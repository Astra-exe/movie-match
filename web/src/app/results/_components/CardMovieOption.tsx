import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";

interface CardMovieOptionProps {
  movie: {
    id: string;
    posterPath: string;
    title: string;
    affinity: number;
  };
  isSelected: boolean;
  indexMovie: number;
  onSelect: (index: number) => void;
}

export default function CardMovieOption({
  movie,
  isSelected,
  indexMovie,
  onSelect,
}: CardMovieOptionProps) {
  return (
    <>
      <Card
        key={movie.id}
        className={`flex-shrink-0 w-[220px] md:w-[260px] bg-card border-gray-800 cursor-pointer backdrop-blur-sm snap-center transition-all duration-300 ${
          isSelected
            ? "ring-2 ring-primary scale-105 selected-card"
            : "opacity-80 hover:opacity-100 hover:scale-102"
        }`}
        onClick={() => onSelect(indexMovie)}
      >
        <CardContent className="p-3">
          <div className="relative aspect-[2/3] mb-3">
            <Image
              src={movie.posterPath || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                <span className="text-sm font-medium">{movie.affinity}%</span>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        </CardContent>
      </Card>
    </>
  );
}
