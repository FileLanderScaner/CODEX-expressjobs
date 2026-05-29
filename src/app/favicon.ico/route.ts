export const dynamic = "force-static";

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#07111f"/>
  <rect x="14" y="18" width="36" height="28" rx="6" fill="#132238" stroke="#60a5fa" stroke-width="3"/>
  <path d="M24 18v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill="none" stroke="#60a5fa" stroke-width="3"/>
  <path d="M20 33h24" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml",
    },
  });
}
