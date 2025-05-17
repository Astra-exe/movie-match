import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import SelectForm from "./_components/SelectForm";

export default function GeneratePage() {
  return (
    <div className="w-full min-h-screen min-w-[320px] font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="bg-background text-foreground pb-32">
        <header className="w-[90%] mx-auto">
          <div className="py-8 md:py-14 lg:py-20 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-primary">
              Generate Your Movie Selection
            </h1>
            <p className="mb-3 text-lg text-gray-300">
              Use our AI-powered tool to generate your ideal option to watch in
              theaters based on your visit information.
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
