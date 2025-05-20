import Header from "@/components/home-page/Header";
import HowWorks from "@/components/home-page/HowWorks";
import Footer from "@/components/home-page/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen min-w-[320px] font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-white">
          {/* Cinema Screen */}
          <div className="relative mx-auto mb-16 w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
            {/* Screen title and description */}
            <div className="h-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg shadow-lg flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
              <article className="relative z-10 text-center">
                <span className="inline-block  mb-2">
                  <Logo className="w-16 h-16" />
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                  Movie Match
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-[700px] mx-auto">
                  Encuentra el match perfecto en una película
                </p>
              </article>
              <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Screen light projection effect */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-60 overflow-hidden">
              {/* Main projection beam */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3/4 h-full bg-gray-300/10 blur-xl rounded-full animate-pulse"></div>

              {/* Colored light beams */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2/3 h-full bg-blue-500/5 blur-xl rounded-full animate-pulse-slow"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-red-500/5 blur-xl rounded-full animate-pulse-slower"></div>

              {/* Dust particles in the beam */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-float-slow"></div>
                <div className="absolute top-1/3 left-1/2 w-0.5 h-0.5 bg-white rounded-full animate-float-slower"></div>
                <div className="absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full animate-float"></div>
                <div className="absolute top-1/5 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-float-slow"></div>
                <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full animate-float-slower"></div>
              </div>

              {/* Light flicker effect */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3/5 h-full bg-white/5 blur-xl rounded-full animate-flicker"></div>
            </div>

            {/* Cinema seats */}
            <div className="p-8 pt-20 bg-gray-900 rounded-b-lg">
              {/* First row - fewer seats */}
              <div className="grid grid-cols-8 gap-4 mb-6 transform-style-3d rotate-x-5 translate-z-0">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square group perspective-[500px]"
                    >
                      <div className="w-full h-full flex flex-col transition-all duration-300 transform group-hover:z-10 relative preserve-3d group-hover:translate-z-12 group-hover:scale-110">
                        {/* Seat back */}
                        <div className="w-full h-1/2 bg-gradient-to-b from-red-900 to-red-950 rounded-t-md shadow-md transform translate-z-2">
                          <div className="absolute inset-x-1 top-1 bottom-1/2 bg-gradient-to-b from-red-800 to-red-900 rounded-t-sm"></div>
                        </div>
                        {/* Seat cushion */}
                        <div className="w-full h-1/2 bg-gradient-to-b from-red-900 to-red-950 rounded-b-md shadow-md flex items-center justify-center relative transform translate-z-4">
                          <div className="absolute inset-x-1 top-0 bottom-1 bg-gradient-to-b from-red-800 to-red-900 rounded-b-sm">
                            {/* Seat fold line */}
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-red-950"></div>
                          </div>
                          {/* Seat number */}
                          <div className="absolute bottom-1 inset-x-0 text-xs text-center text-gray-300 opacity-70 group-hover:opacity-100 group-hover:text-white">
                            {i + 1}
                          </div>
                        </div>
                        {/* 3D effect elements */}
                        <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/20 rounded-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                        <div className="absolute inset-x-0 bottom-0 h-2 bg-black/40 transform translate-y-2 translate-z-0 group-hover:translate-y-6 group-hover:scale-x-110 transition-transform duration-300 blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-md"></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Second row - with armrests */}
              <div className="grid grid-cols-10 gap-3 mb-6 transform-style-3d rotate-x-5 translate-z-8">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square group perspective-[500px]"
                    >
                      <div className="w-full h-full flex flex-col transition-all duration-300 transform group-hover:z-10 relative preserve-3d group-hover:translate-z-12 group-hover:scale-110">
                        {/* Seat back */}
                        <div className="w-full h-1/2 bg-gradient-to-b from-red-900 to-red-950 rounded-t-md shadow-md transform translate-z-2">
                          <div className="absolute inset-x-1 top-1 bottom-1/2 bg-gradient-to-b from-red-800 to-red-900 rounded-t-sm"></div>
                        </div>
                        {/* Seat cushion */}
                        <div className="w-full h-1/2 bg-gradient-to-b from-red-900 to-red-950 rounded-b-md shadow-md flex items-center justify-center relative transform translate-z-4">
                          <div className="absolute inset-x-1 top-0 bottom-1 bg-gradient-to-b from-red-800 to-red-900 rounded-b-sm">
                            {/* Seat fold line */}
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-red-950"></div>
                          </div>
                          {/* Armrests */}
                          <div className="absolute -left-1 top-1/4 h-1/2 w-2 bg-gray-700 rounded-l-full transform -translate-x-1"></div>
                          <div className="absolute -right-1 top-1/4 h-1/2 w-2 bg-gray-700 rounded-r-full transform translate-x-1"></div>
                          {/* Seat number */}
                          <div className="absolute bottom-1 inset-x-0 text-xs text-center text-gray-300 opacity-70 group-hover:opacity-100 group-hover:text-white">
                            {i + 11}
                          </div>
                        </div>
                        {/* 3D effect elements */}
                        <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/20 rounded-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                        <div className="absolute inset-x-0 bottom-0 h-2 bg-black/40 transform translate-y-2 translate-z-0 group-hover:translate-y-6 group-hover:scale-x-110 transition-transform duration-300 blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-md"></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Third row - premium seats */}
              <div className="grid grid-cols-8 gap-4 transform-style-3d rotate-x-5 translate-z-16">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square group perspective-[500px]"
                    >
                      <div className="w-full h-full flex flex-col transition-all duration-300 transform group-hover:z-10 relative preserve-3d group-hover:translate-z-12 group-hover:scale-110">
                        {/* Seat back */}
                        <div className="w-full h-1/2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-md shadow-md border-t-2 border-x-2 border-yellow-600/30 transform translate-z-2">
                          <div className="absolute inset-x-1 top-1 bottom-1/2 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-sm"></div>
                        </div>
                        {/* Seat cushion */}
                        <div className="w-full h-1/2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-md shadow-md flex items-center justify-center relative border-b-2 border-x-2 border-yellow-600/30 transform translate-z-4">
                          <div className="absolute inset-x-1 top-0 bottom-1 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-sm">
                            {/* Seat fold line */}
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gray-800"></div>
                          </div>
                          {/* Armrests */}
                          <div className="absolute -left-1 top-1/4 h-1/2 w-2 bg-gray-600 rounded-l-full transform -translate-x-1"></div>
                          <div className="absolute -right-1 top-1/4 h-1/2 w-2 bg-gray-600 rounded-r-full transform translate-x-1"></div>
                          {/* Seat number */}
                          <div className="absolute bottom-1 inset-x-0 text-xs text-center text-gray-300 opacity-70 group-hover:opacity-100 group-hover:text-white font-medium">
                            {i + 21}
                          </div>
                        </div>
                        {/* 3D effect elements */}
                        <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/20 rounded-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                        <div className="absolute inset-x-0 bottom-0 h-2 bg-black/40 transform translate-y-2 translate-z-0 group-hover:translate-y-6 group-hover:scale-x-110 transition-transform duration-300 blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-md"></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Center aisle */}
              <div className="w-full h-12 mt-8 flex items-center justify-center">
                <div className="w-1/2 h-2 bg-red-600/50 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Hero copy */}
          <article className="mt-8 mx-auto max-w-3xl text-center bg-card p-8 border-2 border-border">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              <strong className="text-primary">Películas</strong> hechas{" "}
              <strong className="text-primary">para</strong> ti
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Dinos lo que te gusta y nosotros encontraremos las películas perfectas para ti. No más scroll sin fin en los servicios de streaming.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/80 cursor-pointer"
              >
                <Link href="/generate">
                  Comienza ahora <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="link"
                className="cursor-pointer border-primary border-2 hover:bg-primary hover:text-background"
              >
                <Link href="/explore">Explorar selecciones</Link>
              </Button>
            </div>
          </article>
        </section>
      </main>

      {/* Info */}
      <HowWorks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
