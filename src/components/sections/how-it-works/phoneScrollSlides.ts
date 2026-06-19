import type { STEPS } from '@/data/content';
import { STEP_MOCKUPS } from '@/data/mockups';

export type PhoneScrollSlide = {
  title: string;
  description: string;
  bgColor: string;
  image?: string | { src: string; alt?: string };
  ctaText: string;
  ctaUrl: string;
};

const STEP_BACKGROUNDS = ['#ffffff', '#ffffff', '#ffffff'] as const;

/** Map How it works steps to PhoneScrollPro slide data. */
export function buildPhoneScrollSlides(steps: typeof STEPS): PhoneScrollSlide[] {
  return steps.map((step, index) => {
    const mockup = STEP_MOCKUPS[index];
    return {
      title: step.title,
      description: step.description,
      bgColor: STEP_BACKGROUNDS[index] ?? '#fdfcfc',
      image: mockup ? { src: mockup.src, alt: mockup.alt } : undefined,
      ctaText: '',
      ctaUrl: '/get-app',
    };
  });
}
