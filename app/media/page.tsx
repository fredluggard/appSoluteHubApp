"use client";

import React, { useEffect, useState } from "react";
import JoinUs from "@/components/joinUs";
import MediaHero from "@/components/mediaPage";
import MediaCards from "@/components/mediaPage/mediaCards";
import MediaContents from "@/components/mediaPage/mediaContents";
import { Stack } from "@mantine/core";
import { EducationalVideo } from "@/types/commonTypes";

const MediaPage = () => {
  const [mediaContent, setMediaContent] = useState<EducationalVideo[]>([]);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchContent = async () => {
    try {
      const response = await fetch(`${url}/api/v1/contents/videos `);
      const data = await response.json();
      setMediaContent(data?.data || []);
    } catch (error) {
      console.error("Error fetching content data:", error);
    }
  };
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <Stack>
      <MediaHero />
      <MediaCards />
      <MediaContents content={mediaContent} />
      <JoinUs />
    </Stack>
  );
};

export default MediaPage;
