import type { MetadataRoute } from "next";
const baseUrl = "https://quickprivacytools.com";
const paths = ["", "/what-is-my-ip", "/ip-location-checker", "/vpn-leak-test", "/browser-fingerprint-test", "/password-generator", "/password-checker", "/email-breach-checker", "/metadata-remover", "/username-generator", "/whois-lookup", "/dns-lookup"];
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "" ? 1 : 0.8 }));
}
