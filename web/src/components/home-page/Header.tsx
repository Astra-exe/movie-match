import NavBar from "@/components/home-page/NavBar";
import Logo from "@/components/icons/Logo";

export default function Header() {
  return (
    <header className="px-4 sm:px-6 md:px-8 border-b bg-foreground w-full">
      <div className="container flex flex-wrap items-center justify-between h-auto min-h-14 py-2 gap-y-2">
        {/* Logo */}
        <div className="flex  items-center gap-2 font-bold min-w-0">
          <Logo className="w-8 h-8 shrink-0" />
          <strong className="truncate">MovieMatch</strong>
        </div>
        {/* Navbar */}
        <div className="ml-auto w-full sm:w-auto flex justify-end">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
