"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!pathname) return;

    const postAnalytics = async () => {
      try {
        const response = await fetch(`${url}/api/v1/behavior/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interaction: "VIEW",
            page: pathname,
          }),
        });
        await response.json();
      } catch (error) {
        console.error("Error posting page analytics data:", error);
      }
    };

    postAnalytics();
  }, [pathname, url]);

  return null;
}
