import Image, { type ImageProps } from 'next/image';

type ProtectedImageProps = ImageProps & {
  protectedAsset?: boolean;
};

/** Next/Image with drag and selection hardening for public marketing assets. */
export function ProtectedImage({
  className,
  protectedAsset = true,
  draggable = false,
  ...props
}: ProtectedImageProps) {
  return (
    <Image
      {...props}
      draggable={draggable}
      className={[protectedAsset ? 'protected-asset' : '', className].filter(Boolean).join(' ')}
      data-protected-asset={protectedAsset ? 'true' : undefined}
    />
  );
}
