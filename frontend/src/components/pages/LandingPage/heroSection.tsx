import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function HeroSection() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center bg-background p-4 dark:bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl text-foreground mb-6">
            Music Theory & Literacy, Gamified.
          </h1>
          <p className="text-2xl text-muted-foreground mb-12">
            Quizzes, Articles, and more!
          </p>
          <Button variant="default" className="h-15 w-40 text-xl group">
            Get Started
            <ArrowRight className="w-10 h-10 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </>
  );
}
