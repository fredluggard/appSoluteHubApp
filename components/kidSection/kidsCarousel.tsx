"use client";

import { Carousel } from "@mantine/carousel";
import { Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./kidsCarousel.module.css";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { EducationalVideo } from "@/types/commonTypes";

interface KidsCarouselProps {
  content: EducationalVideo[];
}

const KidsCarousel = ({ content }: KidsCarouselProps) => {
  const tutorials = content;
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack>
      <Carousel
        height={390}
        loop
        align="start"
        slideSize={isMobile ? "70%" : "25%"}
        slideGap="md"
        slidesToScroll={1}
        withControls={false}
      >
        {tutorials?.slice(0, 9).map((tutorial) => (
          <Carousel.Slide key={tutorial.title}>
            <Link href={tutorial.url} className={styles.link}>
              <Stack className={styles.card}>
                <Image
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  width={370}
                  height={300}
                  className={styles.cardImage}
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
