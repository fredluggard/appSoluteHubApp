import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./mediaCards.module.css";

const contents = [
  {
    id: 1,
    title: "Marketing",
    text: "ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "/icons/marketing.svg",
  },
  {
    id: 2,
    title: "Business",
    text: "ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "/icons/business.svg",
  },
  {
    id: 3,
    title: "Social Media",
    text: "ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "/icons/social.svg",
  },
  {
    id: 4,
    title: "Research",
    text: "ubiquitous models rather than parallel initiatives. Seamlessly reinvent success.",
    img: "/icons/research.svg",
  },
];

const MediaCards = () => {
  return (
    <Stack className={styles.mediaContainer}>
      <Stack className={styles.mediaStack}>
        <Title className={styles.mediaTitle}>
          Empowering tech professionals with AI tools and resources.
        </Title>
        <Text className={styles.mediaText}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
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

export default MediaCards;
