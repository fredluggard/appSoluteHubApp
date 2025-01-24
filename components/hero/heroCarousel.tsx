"use client";

import { Stack, Text, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import styles from "./heroCarousel.module.css";

const HeroCarousel = () => {
  const heroDetails = [
    {
      tag: "R & D",
      title: "Explore our Research and Development center",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      src: "/images/hero1.png",
      url: "/",
      imgClass: "hero1",
    },
    {
      tag: "APPSOLUTE MEDIA",
      title: "Explore AppSolute media  for our Educational vidoes",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      src: "/images/hero2.png",
      url: "/",
      imgClass: "hero2",
    },
    {
      tag: "APPSOLUTE KIDS",
      title: "Explore our AppSolute kids section",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      src: "/images/hero3.png",
      url: "/",
      imgClass: "hero3",
    },
  ];

  return (
    <>
      <Carousel
        height={720}
        loop
        align="start"
        slidesToScroll={1}
        styles={{
          control: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          },
        }}
        className={styles.carousel}
      >
        {heroDetails.map((item) => (
          <Carousel.Slide key={item.tag}>
            <Stack
              className={`${styles.slideContent} ${styles[item.imgClass]}`}
            >
              <Stack className={styles.slideContentInner}>
                <Text>{item.tag}</Text>
                <Title order={1}>{item.title}</Title>
              </Stack>
            </Stack>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default HeroCarousel;
