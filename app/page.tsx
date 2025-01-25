import { Stack } from "@mantine/core";
import Navbar from "../components/navbar";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <Stack gap={0}>
      <Navbar />
      <HeroSection />
    </Stack>
  );
}
