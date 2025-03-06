import JoinUs from "@/components/joinUs";
import MediaHero from "@/components/mediaPage";
import MediaCards from "@/components/mediaPage/mediaCards";
import MediaContents from "@/components/mediaPage/mediaContents";
import { Stack } from "@mantine/core";
import React from "react";

const MediaPage = () => {
  return (
    <Stack>
      <MediaHero />
      <MediaCards />
      <MediaContents />
      <JoinUs />
    </Stack>
  );
};

export default MediaPage;
