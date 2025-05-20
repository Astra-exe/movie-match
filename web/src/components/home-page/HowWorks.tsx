export default function HowWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Cómo funciona Movie Matcher
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Nuestro algoritmo analiza tus preferencias y tu estado de ánimo para recomendarte películas que realmente disfrutarás.
            </p>
          </div>
          <ul className="space-y-4 lg:space-y-6">
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex w-8 h-8 items-center justify-center rounded-full bg-red-100 text-red-900 dark:bg-secondary dark:text-foreground">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Inicia sesión</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Inicia sesión en tu cuenta de Movie Matcher para acceder al sistema de recomendaciones.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex w-8 h-8 items-center justify-center rounded-full bg-red-100 text-red-900 dark:bg-secondary dark:text-foreground">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Genera una recomendación</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Genera tus selecciones de películas basadas en nuestro proceso para encontrar las mejores coincidencias para ti.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-red-100 text-red-900 dark:bg-secondary dark:text-foreground">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Comparte tus resultados</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Comparte tus recomendaciones de las películas perfectas para cualquier ocasión. ¡Solo preocupate por disfrutar!
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
