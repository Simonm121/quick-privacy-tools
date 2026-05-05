import type { Metadata } from "next";

const siteUrl = "https://www.quickprivacytools.com";

type PageMetadataInput = {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
};

export function buildPageMetadata({
  title,
  absoluteTitle,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const socialTitle = absoluteTitle ?? title;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: "Quick Privacy Tools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
