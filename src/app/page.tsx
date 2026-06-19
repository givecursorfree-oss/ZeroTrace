import { HeroSection } from '@/components/hero/HeroSection';
import { VideoCtaSection } from '@/components/landing/VideoCtaSection';
import { Footer } from '@/components/layout/Footer';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Comparison } from '@/components/sections/Comparison';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { OpenSource } from '@/components/sections/OpenSource';
import { Privacy } from '@/components/sections/Privacy';
import { ScanRadar } from '@/components/sections/ScanRadar';
import { TrustBand } from '@/components/sections/TrustBand';
import { DeveloperNote } from '@/components/sections/DeveloperNote';

export default function HomePage() {
  return (
    <>
      <main className="page-main w-full max-w-full">
        <HeroSection />
        <TrustBand />
        <DeveloperNote />
        <HowItWorks />
        <ScanRadar />
        <Features />
        <BeforeAfter />
        <Comparison />
        <Privacy />
        <OpenSource />
        <VideoCtaSection />
      </main>
      <Footer />
    </>
  );
}
