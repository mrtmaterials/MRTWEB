import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * The supplied company logo is a raster lockup. Keep its full 4:3 artwork
 * intact; use the separate brand-mark.svg only where a compact app icon is
 * required.
 */
export function BrandLogo({
  className,
  priority = false,
  sizes = "(max-width: 640px) 152px, 208px",
}: BrandLogoProps) {
  return (
    <Image
      alt="MRT Materials"
      className={className}
      height={960}
      priority={priority}
      sizes={sizes}
      src="/brand/logo.jpg"
      width={1280}
    />
  );
}
