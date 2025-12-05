import Header from "@/components/shared/Header";
import HeroSection from "@/components/pages/LandingPage/heroSection";
import InfoSection from "@/components/pages/LandingPage/infoSection";
import { ModeToggle } from "@/components/shared/ModeToggle";

export default function Landing() {
  return (
    <>
      <Header />
      <HeroSection />
      <InfoSection />
      <ModeToggle />
    </>
  );
}
