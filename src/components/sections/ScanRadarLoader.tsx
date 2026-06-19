import styles from './ScanRadarLoader.module.css';

const DOTS = ['dot-1', 'dot-2', 'dot-3', 'dot-4', 'dot-5'] as const;

/** CSS radar scan — adapted from Uiverse.io by Valeron-T */
export function ScanRadarLoader() {
  return (
    <div className={styles.loader} role="img" aria-label="Radar scanning for privacy risks">
      <span className={styles.sweep} aria-hidden="true" />
      {DOTS.map((id) => (
        <span key={id} id={id} className={styles.dot} aria-hidden="true" />
      ))}
    </div>
  );
}
