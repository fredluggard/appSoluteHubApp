import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./mediaCards.module.css";

const contents = [
  {
    id: 1,
    title: "Marketing",
    text: "Discover tools and platforms that automate campaigns, analyze performance, and amplify your reach. ",
    img: "/icons/marketing.svg",
  },
  {
    id: 2,
    title: "Business",
    text: "Explore innovative business solutions that streamline operations, enhance productivity, and drive growth.",
    img: "/icons/business.svg",
  },
  {
    id: 3,
    title: "Social Media",
    text: "Find the perfect social media tools and apps that simplify content creation, scheduling, and engagement.",
    img: "/icons/social.svg",
  },
  {
    id: 4,
    title: "Research",
    text: "Uncover research tools and AI solutions that transform how you gather, analyze, and present information.",
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
          At AppSolute, we believe there&apos;s a tech solution for every
          challenge you face. Our platform is your gateway to discovering
          cutting-edge apps, software, AI solutions, and hardware that can solve
          your specific problems and elevate your professional game.
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
