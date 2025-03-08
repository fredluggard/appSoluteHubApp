"use client";

import { Carousel } from "@mantine/carousel";
import React from "react";
import styles from "./exploreCarousel.module.css";
import { Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

const ExploreCarousel = () => {
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };

  const exploreDetails = [
    {
      tag: "R & D",
      title: "Explore our Research and Development center",
      writer: "Uche",
      src: "/images/exploreCard.png",
      url: "/research",
    },
    {
      tag: "MEDIA",
      title: "Explore AppSolute media  for our Educational vidoes",
      writer: "Sochima",
      src: "/images/hero2.png",
      url: "/media",
    },
    {
      tag: "KIDS",
      title: "Explore our AppSolute kids section",
      writer: "Fredrick",
      src: "/images/hero3.png",
      url: "/kids",
    },
    {
      tag: "Blog",
      title: "Explore our AppSolute Blog section",
      writer: "Joy",
      src: "/images/hero1.png",
      url: "/blog",
    },
  ];

  return (
    <>
      <Carousel
        height={580}
        loop
        align="start"
        slideSize="25%"
        slideGap="md"
        slidesToScroll={1}
        withControls={false}
      >
        {exploreDetails.map((item) => (
          <Carousel.Slide key={item.tag}>
            <Stack
              className={styles.content}
              style={{ backgroundImage: `url(${item.src})` }}
              onClick={() => handleClick(item.url)}
            >
              <Stack className={styles.slideContent}>
                <span className={styles.tag}>{item.tag}</span>
                <Stack>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.writer}>By {item.writer}</span>
                </Stack>
              </Stack>
            </Stack>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default ExploreCarousel;
