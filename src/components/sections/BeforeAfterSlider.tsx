'use client';

import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { useCallback, useRef, useState } from 'react';
import { LogoMark } from '@/components/ui/LogoMark';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  fileName: string;
}

/** Drag slider — original (GPS embedded) vs sanitized export. */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  fileName,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const dragging = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      dragging.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setFromClientX(event.clientX);
    },
    [setFromClientX],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      setFromClientX(event.clientX);
    },
    [setFromClientX],
  );

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((p) => Math.max(4, p - 2));
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((p) => Math.min(96, p + 2));
    }
  }, []);

  return (
    <div className={styles.shell}>
      <div className={styles.core}>
        <div
          ref={rootRef}
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className={styles.afterLayer}>
            <ProtectedImage
              src={afterSrc}
              alt={afterAlt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className={styles.photo}
              priority={false}
            />
            <span className={[styles.chip, styles.chipSafe].join(' ')}>Sanitized</span>
          </div>

          <div className={styles.beforeLayer} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <ProtectedImage
              src={beforeSrc}
              alt={beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className={styles.photo}
              priority
            />
            <span className={[styles.chip, styles.chipRisk].join(' ')}>GPS embedded</span>
          </div>

          <div className={styles.handle} style={{ left: `${position}%` }} aria-hidden="true">
            <span className={styles.handleLine} />
            <span className={styles.handleKnob}>
              <LogoMark size={28} className={styles.handleLogo} />
            </span>
          </div>

          <label className={styles.srOnly} htmlFor="before-after-range">
            Drag to compare original and sanitized photo
          </label>
          <input
            id="before-after-range"
            type="range"
            min={4}
            max={96}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            onKeyDown={onKeyDown}
            className={styles.range}
            aria-valuetext={`${Math.round(position)} percent. Original on the left, sanitized on the right.`}
          />
        </div>

        <p className={styles.fileName}>{fileName}</p>
        <div className={styles.legend}>
          <span className={styles.legendBefore}>Original</span>
          <span className={styles.legendHint}>Drag slider</span>
          <span className={styles.legendAfter}>Sanitized</span>
        </div>
      </div>
    </div>
  );
}
