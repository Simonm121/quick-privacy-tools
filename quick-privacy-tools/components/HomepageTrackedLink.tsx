"use client";

import Link from "next/link";
import type { ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type HomepageTrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  trackingName: string;
  trackingSection: string;
};

export default function HomepageTrackedLink({
  href,
  children,
  className = "",
  trackingName,
  trackingSection,
}: HomepageTrackedLinkProps) {
  function handleClick() {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "homepage_click", {
      link_name: trackingName,
      link_section: trackingSection,
      link_target: href,
    });
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
