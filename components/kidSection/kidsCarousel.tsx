"use client";

import { Carousel } from "@mantine/carousel";
import { Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./kidsCarousel.module.css";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

const KidsCarousel = () => {
  const tutorials = [
    {
      title: "How to open a stock account at Tradiant?",
      src: "/images/vidImg1.png",
      url: "/",
    },
    {
      title:
        "How to optimize analysis tools and Artificial Intelligence in Tradiant",
      src: "/images/vidImg2.png",
      url: "/",
    },
    {
      title: "Explanation of each free and paid feature in Tradiant",
      src: "/images/vidImg3.png",
      url: "/",
    },
  ];

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack>
      <Carousel
        height={380}
        loop
        align="start"
        slideSize={isMobile ? "70%" : "25%"}
        slideGap="md"
        slidesToScroll={1}
        withControls={false}
      >
        {tutorials.map((tutorial) => (
          <Carousel.Slide key={tutorial.title}>
            <Link href={tutorial.url}>
              <Stack className={styles.card}>
                <Image
                  src={tutorial.src}
                  alt={tutorial.title}
                  width={370}
                  height={300}
                />
                <Text className={styles.text}>{tutorial.title}</Text>
              </Stack>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};

export default KidsCarousel;
