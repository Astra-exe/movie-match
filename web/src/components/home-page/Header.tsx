import NavBar from "@/components/home-page/NavBar";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="px-8 border-b bg-foreground">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold">
          <Logo className="w-8 h-8" />
          <strong>MovieMatcher</strong>
        </div>
        {/* Navbar */}
        <div className="ml-auto">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
