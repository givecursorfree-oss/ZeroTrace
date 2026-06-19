import { SITE } from '@/data/content';

export function BetaBadge() {
  return (
    <span className="inline-flex min-h-[28px] items-center gap-2 rounded-[var(--radius-badges)] border border-[var(--color-ash-border)] bg-[var(--color-parchment-white)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-midnight-ink)] shadow-[var(--shadow-subtle)]">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-ember-orange)]"
        aria-hidden="true"
      />
      {SITE.versionLabel}
    </span>
  );
}
