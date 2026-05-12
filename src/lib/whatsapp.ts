export function buildWhatsAppShareUrl(text: string) {
  const message = encodeURIComponent(text);
  return `https://wa.me/?text=${message}`;
}
