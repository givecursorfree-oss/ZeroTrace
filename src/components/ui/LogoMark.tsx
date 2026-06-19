import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { BRAND } from '@/data/content';
interface LogoMarkProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

/** Next/Image mark with paired intrinsic + auto height so CSS sizing never warps aspect ratio. */
export function LogoMark({ size = 32, className, priority }: LogoMarkProps) {
  return (
    <ProtectedImage
      src={BRAND.mark}
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={className}
      style={{ width: size, height: 'auto' }}
    />
  );
}
