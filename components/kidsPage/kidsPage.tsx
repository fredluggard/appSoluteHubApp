"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./kidspage.module.css";

const contents = [
  {
    id: 1,
    title: "Software",
    text: "From games to apps, we show kids how software powers their world and how they can be part of creating it.",
    img: "/icons/marketing.svg",
  },
  {
    id: 2,
    title: "Business",
    text: "We introduce kids to how tech is used in business, problem-solving, creativity, and smart thinking all rolled into one.",
    img: "/icons/business.svg",
  },
  {
    id: 3,
    title: "Science",
    text: "Kids discover how tech and science work together. From AI-powered tools to cool inventions that change the world.",
    img: "/icons/social.svg",
  },
  {
    id: 4,
    title: "Academics",
    text: "We turn traditional subjects into tech-powered adventures that boost learning and curiosity in school and beyond.",
    img: "/icons/research.svg",
  },
];

const KidsImageCard = () => {
  return (
    <Stack className={styles.mediaContainer}>
      <Stack className={styles.mediaStack}>
        <Title className={styles.mediaTitle}>
          Why our videos are so important to your kids
        </Title>
        <Text className={styles.mediaText}>
          Tech is everywhere but understanding it shouldn&apos;t be confusing.
          Our content helps kids explore, question, and grow their digital
          confidence.
        </Text>
      </Stack>

      <Flex className={styles.cardFlex}>
        {contents.map((content) => (
          <Stack key={content.id} className={styles.cardStack}>
            <Image
              src={content.img}
              alt=""
              width={70}
              height={70}
              className={styles.img}
            />
            <Title className={styles.cardTitle}>{content.title}</Title>
            <Text className={styles.cardText}>{content.text}</Text>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
};

export default KidsImageCard;
