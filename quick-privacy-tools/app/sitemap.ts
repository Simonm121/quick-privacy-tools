import type { MetadataRoute } from "next";

const baseUrl = "https://www.quickprivacytools.com";

const paths = [
  "",
  "/what-is-my-ip",
  "/ip-location-checker",
  "/vpn-leak-test",
  "/browser-fingerprint-test",
  "/password-generator",
  "/password-checker",
  "/email-breach-checker",
  "/metadata-remover",
  "/username-generator",
  "/whois-lookup",
  "/dns-lookup",

  // NEW SEO PAGES
  "/what-is-my-ip-location",
  "/what-is-my-ip-address-and-location",
  "/is-my-vpn-working",

  // FOOTER PAGES
  "/privacy-policy",
  "/terms",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
