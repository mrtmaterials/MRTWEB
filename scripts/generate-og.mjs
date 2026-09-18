import sharp from "sharp";

const width = 1200;
const height = 630;
const logo = await sharp("public/brand/logo-transparent.webp")
  .resize({ width: 350, height: 285, fit: "inside" })
  .png()
  .toBuffer();

const overlay = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" x2="1">
        <stop offset="0" stop-color="#071f1c" stop-opacity="0.96" />
        <stop offset="0.51" stop-color="#0a2925" stop-opacity="0.88" />
        <stop offset="1" stop-color="#092420" stop-opacity="0.32" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#08231f" opacity="0.24" />
    <rect width="1200" height="630" fill="url(#shade)" />
    <text x="67" y="392" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="49" font-weight="700">Materials sourced</text>
    <text x="67" y="452" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="49" font-weight="700">with precision.</text>
    <text x="68" y="512" fill="#bde9dd" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="500" letter-spacing="5">VIETNAM | GLOBAL SOURCING</text>
  </svg>
`);

await sharp("public/images/editorial/lab-hero.webp")
  .resize(width, height, { fit: "cover", position: "centre" })
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 55, top: 35 },
  ])
  .webp({ quality: 88 })
  .toFile("public/brand/og-card.webp");
