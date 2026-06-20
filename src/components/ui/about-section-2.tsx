'use client';

import { DEVELOPER_NOTE, SITE } from '@/data/content';
import { TimelineContent } from '@/components/ui/timeline-animation';
import { GitHubIcon } from '@/components/ui/GitHubIcon';
import { useRef } from 'react';

const highlightClass =
  'inline rounded-md border-2 border-dotted px-1.5 py-0.5 align-baseline sm:px-2';

export default function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.55,
      },
    }),
    hidden: {
      filter: 'blur(6px)',
      y: 24,
      opacity: 0,
    },
  };

  const textVariants = {
    visible: (i: number) => ({
      filter: 'blur(0px)',
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      opacity: 0,
      y: 16,
    },
  };

  return (
    <section
      className="page-gutter bg-[var(--color-warm-sand)] py-[var(--section-padding-y)]"
      aria-labelledby="developer-note-heading"
    >
      <div className="mx-auto max-w-6xl" ref={heroRef}>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="flex-1">
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="display-headline mb-8 text-2xl !leading-[110%] text-[var(--color-midnight-ink)] sm:text-4xl md:text-5xl"
            >
              <span id="developer-note-heading" className="sr-only">
                {DEVELOPER_NOTE.heading}
              </span>
              We built ZeroTrace because{' '}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className={`${highlightClass} border-[#186f64] text-[#186f64]`}
              >
                sharing
              </TimelineContent>{' '}
              a photo should not{' '}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className={`${highlightClass} border-[#b45309] text-[#b45309]`}
              >
                leak
              </TimelineContent>{' '}
              where you were standing. Everything runs on{' '}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className={`${highlightClass} border-[#3d6b4f] text-[#3d6b4f]`}
              >
                your device
              </TimelineContent>
              . We are still in beta, so verify exports before you share sensitive work.
            </TimelineContent>

            <div className="mt-12 flex flex-col gap-6 justify-between sm:flex-row sm:items-end">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-xs sm:text-xl"
              >
                <div className="mb-1 font-medium capitalize text-[var(--color-midnight-ink)]">
                  {DEVELOPER_NOTE.name}
                </div>
                <div className="font-semibold uppercase text-[var(--color-driftwood)]">
                  {DEVELOPER_NOTE.role}
                </div>
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={textVariants}
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[var(--color-midnight-ink)] px-5 text-sm font-medium text-[var(--color-parchment-white)] shadow-[0_12px_32px_-12px_rgba(25,40,55,0.45)]"
              >
                <GitHubIcon size={16} />
                View source
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
