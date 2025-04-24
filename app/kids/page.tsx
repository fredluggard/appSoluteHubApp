import JoinUs from "@/components/joinUs";
import KidsHero from "@/components/kidsPage";
import KidsImageCard from "@/components/kidsPage/kidsPage";
import KidStats from "@/components/kidsPage/kidStats";
import KidsVideos from "@/components/kidsPage/kidsVideos";
import { Stack } from "@mantine/core";
import React from "react";

const KidsPage = () => {
  return (
    <Stack w={"100vw"} style={{ overflowX: "hidden" }}>
      <KidsHero />
      <KidsImageCard />
      <KidStats />
      <KidsVideos />
      <JoinUs />
    </Stack>
  );
};

export default KidsPage;
