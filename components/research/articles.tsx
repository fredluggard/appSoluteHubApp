import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./articles.module.css";

const blogPost = [
  {
    id: "1",
    title: "PM mental models",
    desc: "Mental models are simple expressions of complex processes or relationships.",
    date: "1 Jan 2025",
    img: "/images/models.png",
  },
  {
    id: "2",
    title: "PM mental models",
    desc: "Mental models are simple expressions of complex processes or relationships.",
    date: "1 Jan 2025",
    img: "/images/models.png",
  },
  {
    id: "3",
    title: "PM mental models",
    desc: "Mental models are simple expressions of complex processes or relationships.",
    date: "1 Jan 2025",
    img: "/images/models.png",
  },
  {
    id: "4",
    title: "PM mental models",
    desc: "Mental models are simple expressions of complex processes or relationships.",
    date: "1 Jan 2025",
    img: "/images/models.png",
  },
];

const ResearchArt = () => {
  return (
    <Stack className={styles.researchContainer}>
      <Stack className={styles.headStack}>
        <Title className={styles.title}>
          Check out some of our research Articles
        </Title>
        <Text className={styles.text}>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
      </Stack>

      <Flex gap={20} className={styles.flexContainer}>
        {blogPost.map((post) => (
          <Stack key={post.id} className={styles.card}>
            <Image
              src={post.img}
              alt="hero"
              width={500}
              height={500}
              className={styles.cardImg}
            />
            <Stack className={styles.cardContent}>
              <Text className={styles.date}>{post.date}</Text>
              <Flex className={styles.cardFlex}>
                <Title className={styles.cardTitle}>{post.title}</Title>
                <Image src={"/icons/arrow.svg"} alt="" width={10} height={10} />
              </Flex>
              <Text className={styles.desc} lineClamp={2}>
                {post.desc}
              </Text>
            </Stack>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
};

export default ResearchArt;
