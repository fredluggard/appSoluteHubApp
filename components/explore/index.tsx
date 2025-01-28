import { Stack, Title } from "@mantine/core";
import React from "react";
import styles from "./explore.module.css";
import ExploreCarousel from "./exploreCarousel";

const Explore = () => {
  return (
    <Stack className={styles.explore}>
      <Title className={styles.title}>Explore our diverse topics</Title>
      <ExploreCarousel />
    </Stack>
  );
};

export default Explore;
