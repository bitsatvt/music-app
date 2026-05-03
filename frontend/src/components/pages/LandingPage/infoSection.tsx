import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InfoSection() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#9D79BC]/10 via-[#91C4F2]/15 to-[#8CA0D7]/10 dark:from-[#0a0a0f] dark:via-[#160d22] dark:to-[#0a0a0f]">
        {/*Section 1*/}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <img
                className="rounded-2xl overflow-hidden shadow-lg dark:hidden"
                src="/images/theory.png"
                alt="music theory image"
              />
              <img
                src="/images/dark-theory.png"
                alt="music theory image"
                className="hidden rounded-2xl overflow-hidden shadow-lg dark:block"
              />
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-[#9D79BC] mb-4 dark:text-[#c9a2e0]">
                  Master Music Theory
                </h2>
                <p className="text-lg text-[#8CA0D7] mb-6 dark:text-[#9D79BC]">
                  Dive deep into the fundamentals of music theory with our
                  comprehensive lessons. Learn scales, chord progressions,
                  harmony, and more through interactive content designed to make
                  complex concepts easy to understand.
                </p>
                <div className="flex flex-col gap-3 text-[#8CA0D7] dark:text-[#9D79BC]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Interactive lessons and exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Step-by-step progression paths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
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
                <h2 className="text-4xl font-bold tracking-tight text-[#9D79BC] mb-4 dark:text-[#c9a2e0]">
                  Develop Your Ear
                </h2>
                <p className="text-lg text-[#8CA0D7] mb-6 dark:text-[#9D79BC]">
                  Train your ear to recognize intervals, chords, and melodies
                  with our advanced ear training tools. Perfect for musicians of
                  all levels looking to improve their musical perception and
                  listening skills.
                </p>
                <div className="flex flex-col gap-3 text-[#8CA0D7] dark:text-[#9D79BC]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Interval recognition exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Chord identification practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Melodic dictation training</span>
                  </div>
                </div>
              </div>
              <img
                className="rounded-2xl overflow-hidden shadow-lg order-1 md:order-2 dark:hidden"
                src="/images/ear.png"
                alt="train your ear"
              />
              <img
                src="/images/dark-ear.png"
                alt="music ear"
                className="hidden rounded-2xl overflow-hidden shadow-lg order-1 md:order-2 dark:block"
              />
            </div>
          </div>
        </section>

        {/*Section 3*/}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <img
                className="rounded-2xl overflow-hidden shadow-lg dark:hidden"
                src="/images/progress.png"
              />
              <img
                src="/images/dark-progress.png"
                alt="music prog"
                className="hidden rounded-2xl overflow-hidden shadow-lg dark:block"
              />
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-[#9D79BC] mb-4 dark:text-[#c9a2e0]">
                  Track Your Progress
                </h2>
                <p className="text-lg text-[#8CA0D7] mb-6 dark:text-[#9D79BC]">
                  Stay motivated with our comprehensive progress tracking
                  system. Build streaks, earn achievements, and watch your
                  musical knowledge grow day by day. See detailed analytics on
                  your performance and areas for improvement.
                </p>
                <div className="flex flex-col gap-3 text-[#8CA0D7] dark:text-[#9D79BC]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Daily streak tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Performance analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9D79BC] rounded-full dark:bg-[#c9a2e0]"></div>
                    <span>Achievement badges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#9D79BC] to-[#8CA0D7] dark:from-[#160d22] dark:to-[#0a0a0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold tracking-tight text-white mb-6 dark:text-[#c9a2e0]">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 dark:text-[#9D79BC]">
            Join thousands of musicians improving their skills every day
          </p>
          <Button className="h-12 px-8 text-base font-medium group bg-white text-[#9D79BC] hover:bg-white/90 dark:bg-[#9D79BC] dark:text-[#0a0a0f] dark:hover:bg-[#b08fd0]">
            <Link
              href="/signup"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Get Started
            </Link>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </section>
    </>
  );
}
