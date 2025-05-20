import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex items-center gap-4 sm:gap-6">
      <Link
        href="/"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Inicio
      </Link>
      <Link
        href="/generate"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Generar
      </Link>
      <Link
        href="/explore"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Explora
      </Link>
      <SignedOut>
        <SignInButton
          mode="modal"
          appearance={{
            elements: {
              formButtonPrimary: "bg-slate-500 hover:bg-slate-400 text-sm",
            },
          }}
        >
          <Button variant="default" size="sm" className="ml-2 cursor-pointer">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
