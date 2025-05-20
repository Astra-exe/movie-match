import NavBar from "@/components/home-page/NavBar";
import { Popcorn } from "lucide-react";

export default function Header() {
  return (
    <header className="px-8 border-b bg-foreground">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold">
          <Popcorn className="h-5 w-5" />
          <strong>MovieMatch</strong>
        </div>
        {/* Navbar */}
        <div className="ml-auto">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
