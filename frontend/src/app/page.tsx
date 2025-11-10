import {LandingPage} from '@/components/pages/LandingPage/landing';
import Header from '@/components/shared/header';
import {ModeToggle} from '@/components/shared/ModeToggle';

export default function Landing() {
  return (
    <>
      <Header />
      <LandingPage />
      <ModeToggle />
    </>
  );
}
