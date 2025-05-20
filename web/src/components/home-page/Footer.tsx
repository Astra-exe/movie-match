import Link from "next/link";
import { Popcorn } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container px-4 py-12 sm:px-8 md:py-16 lg:py-20">
        <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-white">
              <Popcorn className="h-6 w-6" />
              <span className="text-xl">MovieMatch</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Descubre películas que conectan con tu estilo único. Nuestra plataforma impulsada por IA aprende tus gustos y encuentra las películas perfectas para ti.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/generate"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Generar
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Explora
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Comunidad</h3>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contribuye en GitHub
            </Link>
          </div>
        </section>

        <div className="mt-10 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-gray-500">
              © 2025 MovieMatch. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link
                href="https://github.com"
                className="hover:text-white transition-colors"
              >
                Github
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 shadow-lg">
            <p className="text-sm font-medium text-white">
              ¿Listo para encontrar tu próxima película favorita?{" "}
              <Link
                href="#"
                className="ml-1 underline text-secondary hover:text-secondary/80"
              >
                Ingresa ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
