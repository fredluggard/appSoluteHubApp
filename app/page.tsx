import { Stack } from "@mantine/core";
import Navbar from "../components/navbar";
import HeroSection from "@/components/hero";
import HomeBlog from "@/components/homeBlog";
import Explore from "@/components/explore";
import KidSection from "@/components/kidSection";
import MoreBlog from "@/components/homeBlog/moreBlog";

export default function Home() {
  return (
    <Stack gap={0}>
      <Navbar />
      <HeroSection />
      <HomeBlog />
      <Explore />
      <KidSection />
      <MoreBlog />
    </Stack>
  );
}
