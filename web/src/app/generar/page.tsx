import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import SelectForm from "./_components/SelectForm";

export default function GeneratePage() {
  return (
    <div className="w-full min-h-screen min-w-[320px] font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="bg-background text-foreground pt-8 pb-32">
        <header className="w-[90%] mx-auto">
          <div className="py-8 md:py-14 lg:py-20 text-center max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Genera tu selección de películas
            </h1>
            <p className="mb-3 md:text-lg text-gray-300">
              Utiliza nuestra herramienta potenciada con IA para descubrir la
              película perfecta para ver, personalizada según los detalles de tu
              visita.
            </p>
          </div>
        </header>
        <main>
          <SelectForm />
        </main>
      </div>
      <Footer />
    </div>
  );
}
