import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MySelectionsPage() {
  return (
    <div className="w-full min-h-screen min-w-[320px] font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="bg-background text-foreground pb-32">
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
        <main>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-12">
            {Array(8)
              .fill(null)
              .map((item, index) => {
                return (
                  <div className="flex flex-col items-center" key={index}>
                    <Card className="group relative w-full bg-transparent border-0 shadow-none">
                      <CardContent className="p-0">
                        {/* Movie poster with neon effect container */}
                        <Link href={"/selections/1"}>
                          <div className="relative w-full aspect-square p-1">
                            {/* Neon glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary via-ring to-primary opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300 ease-in-out"></div>

                            {/* Poster container */}

                            <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-transparent group-hover:border-ring transition-all duration-300 ease-in-out">
                              {/* Movie poster image */}
                              <Image
                                width={300}
                                height={450}
                                src={
                                  "https://image.tmdb.org/t/p/w300/5dj0ERxM8NxoiWBdlY6TT9PJmKi.jpg"
                                }
                                alt={"Star wars III"}
                                className="h-full w-full object-cover rounded-full transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-3"
                              />

                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out backdrop-blur-[2px] rounded-full">
                                {/* Movie title */}
                                <h3 className="text-center font-bold px-2 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-sm">
                                  La guerra de las galaxias. Episodio III: La
                                  venganza de los Sith
                                </h3>

                                {/* Delete button */}
                                {/* <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-white hover:text-red-500 hover:bg-white/10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out delay-75 cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </Button> */}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>

                    {/* Context caption */}
                    <div className="text-center">
                      <p className="font-medium px-1">
                        <Link href={"/selections/1"}>
                          Movie night with friends and the force
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
