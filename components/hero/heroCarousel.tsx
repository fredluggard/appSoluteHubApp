"use client";

import { Stack, Text, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./heroCarousel.module.css";
import classes from "./options.module.css";
import LinkButton from "../button";

const HeroCarousel = () => {
  const heroDetails = [
    {
      tag: "R & D",
      title: "Explore our Research and Development center",
      desc: "This is where bold ideas meet cutting-edge tech. Our Research & Development center is where we test, tweak, and turn sparks of genius into real solutions.",
      src: "/images/hero1.png",
      url: "/research-development",
      imgClass: "hero1",
    },
    {
      tag: "APPSOLUTE MEDIA",
      title: "Explore AppSolute media  for our Educational vidoes",
      desc: "Learning shouldn't feel like a chore. That's why we created AppSolute Media,  a library of educational videos designed to help you learn faster, smarter, and in ways that are actually worth your time.",
      src: "/images/hero2.png",
      url: "/media",
      imgClass: "hero3",
    },
    {
      tag: "APPSOLUTE KIDS",
      title: "Explore our AppSolute kids section",
      desc: "This is where young minds explore the world of tech. The Kids section delivers fun, safe, and interactive content designed to teach kids the basics of technology while keeping them entertained.",
      src: "/images/hero3.png",
      url: "/kids",
      imgClass: "hero2",
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
        withControls={false}
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
                <LinkButton url={item.url} text="Learn More &#62;" />
              </Stack>
            </Stack>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default HeroCarousel;
