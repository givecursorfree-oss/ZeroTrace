'use client';

import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { createElement, type ElementType, type ReactNode, type RefObject } from 'react';

type CustomVariants = Variants & {
  visible: (index: number) => Record<string, unknown>;
};

interface TimelineContentProps {
  as?: ElementType;
  children?: ReactNode;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants: CustomVariants;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const motionMap: Record<string, ElementType> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
  button: motion.button,
  a: motion.a,
};

export function TimelineContent({
  as = 'div',
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  ...rest
}: TimelineContentProps) {
  const reduceMotion = useReducedMotion();
  const isInView = useInView(timelineRef, { once: true, amount: 0.08, margin: '0px 0px -40px 0px' });
  const MotionComponent = motionMap[String(as)] ?? motion.div;

  return createElement(
    MotionComponent,
    {
      className,
      initial: reduceMotion ? false : 'hidden',
      animate: reduceMotion || isInView ? 'visible' : 'hidden',
      variants: customVariants,
      custom: animationNum,
      ...rest,
    },
    children,
  );
}
