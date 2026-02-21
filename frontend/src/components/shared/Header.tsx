import { Music2 } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-foreground rounded-lg flex items-center justify-center">
            <Link href="/">
              <Music2 className="w-6 h-6 text-white" />
            </Link>
          </div>
          <span className="text-2xl text-foreground">MusIQ</span>
        </div>
        <nav className="flex items-center gap-8">
          <Link
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="#faq"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="login"
            className="text-foreground hover:text-primary transition-colors"
          >
            Log In
          </Link>
        </nav>
      </div>
    </header>
  );
}
