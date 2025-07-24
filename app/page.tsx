import { Stack } from "@mantine/core";
import HeroSection from "@/components/hero";
import HomeBlog from "@/components/homeBlog";
import Explore from "@/components/explore";
import KidSection from "@/components/kidSection";
import MoreBlog from "@/components/homeBlog/moreBlog";
import OngoingProjects from "@/components/projects";
import JoinUs from "@/components/joinUs";

export default function Home() {
  return (
    <Stack w="100%" gap={0}>
      <HeroSection />
      <HomeBlog />
      <Explore />
      <KidSection />
      <MoreBlog />
      {/* <OngoingProjects /> */}
      <JoinUs />
    </Stack>
  );
}
