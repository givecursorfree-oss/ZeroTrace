import { SITE } from '@/data/content';
import { LogoMark } from '@/components/ui/LogoMark';

interface BrandLogoProps {
  showWordmark?: boolean;
  markSize?: number;
  className?: string;
}

export function BrandLogo({ showWordmark = true, markSize = 32, className }: BrandLogoProps) {
  return (
    <span className={['inline-flex items-center gap-2.5', className].filter(Boolean).join(' ')}>
      <LogoMark size={markSize} className="shrink-0 rounded-md" priority />
      {showWordmark ? (
        <span className="font-wordmark text-sm font-bold tracking-[0.04em] text-[var(--color-midnight-ink)]">
          {SITE.name}
        </span>
      ) : null}
    </span>
  );
}
