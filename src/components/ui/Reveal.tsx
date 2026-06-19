'use client';

import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[styles.reveal, visible ? styles.visible : '', className].filter(Boolean).join(' ')}
      style={{ transitionDelay: delay ? `${delay * 100}ms` : undefined }}
    >
      {children}
    </div>
  );
}
