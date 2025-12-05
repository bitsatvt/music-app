import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InfoSection() {
  return (
    <>
      <div className="bg-linear-to-br from-secondary/30 to-secondary">
        {/*Section 1*/}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                Insert Image.
              </div>
              <div>
                <h2 className="text-4xl text-foreground mb-4">
                  Master Music Theory
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Dive deep into the fundamentals of music theory with our
                  comprehensive lessons. Learn scales, chord progressions,
                  harmony, and more through interactive content designed to make
                  complex concepts easy to understand.
                </p>
                <div className="flex flex-col gap-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Interactive lessons and exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Step-by-step progression paths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Practice at your own pace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Section 2*/}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl text-foreground mb-4">
                  Develop Your Ear
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Train your ear to recognize intervals, chords, and melodies
                  with our advanced ear training tools. Perfect for musicians of
                  all levels looking to improve their musical perception and
                  listening skills.
                </p>
                <div className="flex flex-col gap-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Interval recognition exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Chord identification practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Melodic dictation training</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
                insert image
              </div>
            </div>
          </div>
        </section>

        {/*Section 3*/}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                insert image
              </div>
              <div>
                <h2 className="text-4xl text-foreground mb-4">
                  Track Your Progress
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Stay motivated with our comprehensive progress tracking
                  system. Build streaks, earn achievements, and watch your
                  musical knowledge grow day by day. See detailed analytics on
                  your performance and areas for improvement.
                </p>
                <div className="flex flex-col gap-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Daily streak tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Performance analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    <span>Achievement badges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-linear-to-br from-primary to-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl text-white mb-6">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of musicians improving their skills every day
          </p>
          <Button variant="secondary" className="px-8 py-4 group">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </>
  );
}
