"use client";

import { Stack, Text, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./heroCarousel.module.css";
import classes from "./options.module.css";
import Link from "next/link";

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

  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <>
      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        height={720}
        loop
        align="start"
        slidesToScroll={1}
        withIndicators
        styles={{
          control: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          },
        }}
        className={styles.carousel}
        classNames={classes}
      >
        {heroDetails.map((item) => (
          <Carousel.Slide key={item.tag}>
            <Stack
              className={`${styles.slideContent} ${styles[item.imgClass]}`}
            >
              <Stack className={styles.slideContentInner}>
                <Text className={styles.tag}>{item.tag}</Text>
                <Title order={1} className={styles.title}>
                  {item.title}
                </Title>
                <Text className={styles.desc}>{item.desc}</Text>
                <Link href="#" className={styles.learn}>
                  <span>Learn More &#62;</span>
                </Link>
              </Stack>
            </Stack>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default HeroCarousel;
