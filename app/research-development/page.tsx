import JoinUs from "@/components/joinUs";
import HeroRD from "@/components/research";
import ResearchArt from "@/components/research/articles";
import ClientCard from "@/components/research/clients";
import GetIn from "@/components/research/getIn";
import { Stack } from "@mantine/core";
import React from "react";

const ResearchPage = () => {
  return (
    <Stack>
      <HeroRD />
      <ClientCard />
      <GetIn />
      <ResearchArt />
      <JoinUs />
    </Stack>
  );
};

export default ResearchPage;
