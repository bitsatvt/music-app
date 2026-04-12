import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6
        bg-[radial-gradient(circle_at_50%_50%,_#f0f4ff_0%,_white_100%)]
        dark:bg-[radial-gradient(circle_at_50%_50%,_#160d22_0%,_#0a0a0f_100%)]"
    >
      {/* Floating blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] bg-[#9D79BC]/15 dark:bg-[#9D79BC]/10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] bg-[#91C4F2]/20 dark:bg-[#91C4F2]/10" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#9D79BC] dark:text-[#c9a2e0]">
          Music Theory &amp; Literacy, Gamified.
        </h1>
        <div className="mt-12">
          <Button
            className="h-12 px-8 text-base font-medium group
              bg-[#9D79BC] text-white hover:bg-[#8a68a8]
              dark:bg-[#9D79BC] dark:text-[#0a0a0f] dark:hover:bg-[#b08fd0]"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Abstract music image at bottom */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-6xl opacity-20 pointer-events-none dark:opacity-10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPAcoQ3XlNlDiOzQ32VFKeE2Q4bCVTXgcyZzdBq_EJAi2Vlv_ADzpkQZ1KBnvnNtLGIwVB4SsBsX1_Up9E-4pG8BRo9fsmjKDWSpz5RJtah53Bj-gByoT6Z5FInmRwqIoXk7dBlXljGuhl_UHJIKlN78fR0-PxXHz4GLyjvDG3QxL-lTXFmZC_awFChpvzCTWQfliMrk5T1_I0buu0E5lEexAjXOmtHslYwxinNLVc_1VSpNjz3lcUPO2mNFN2GpjzlkV_qxzKbZZD"
          alt=""
          className="w-full h-auto object-cover"
        />
      </div> */}
    </section>
  );
}
