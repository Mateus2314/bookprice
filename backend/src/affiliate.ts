export function generateAffiliateUrl(platform: string, originalUrl: string, tag?: string): string {
  switch (platform) {
    case "amazon":
      return tag ? `${originalUrl}${originalUrl.includes("?") ? "&" : "?"}tag=${tag}` : originalUrl;
    case "shopee":
      return tag ? `${originalUrl}?af_id=${tag}` : originalUrl;
    default:
      return originalUrl;
  }
}
