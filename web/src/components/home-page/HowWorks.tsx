export default function HowWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How Movie Matcher Works
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our algorithm analyzes your preferences and viewing history to
              recommend movies you'll actually enjoy.
            </p>
          </div>
          <ul className="space-y-4 lg:space-y-6">
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex w-8 h-8 items-center justify-center rounded-full bg-red-100 text-red-900 dark:bg-secondary dark:text-foreground">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Login</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Login to your account to access certain features.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex w-8 h-8 items-center justify-center rounded-full bg-red-100 text-red-900 dark:bg-secondary dark:text-foreground">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Generate your selections</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Generate your movie selections based on our process to find
                  the best matches for you.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-red-100 text-red-900 dark:bg-secondary dark:text-foreground">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Save your selections</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive tailored movie suggestions that match your unique
                  preferences.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
