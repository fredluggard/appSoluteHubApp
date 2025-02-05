import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./blog.module.css";
import Image from "next/image";
import LinkButton from "../button";

const BlogHero = () => {
  const date = new Date(2025, 4, 23).toDateString();
  const writer = "John Doe";

  return (
    <Stack className={styles.blogContainer}>
      <Flex className={styles.blogFlex}>
        <Stack className={styles.blogBox}>
          <Title order={4} className={styles.blogSubTitle}>
            Featured Post
          </Title>

          <Title className={styles.blogTitle}>
            Step-by-step guide to choosing great font pairs
          </Title>

          <Text className={styles.blogWriter}>
            By {writer} | {date}
          </Text>

          <Text className={styles.blogText}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </Text>

          <LinkButton url="#" text="Read More" />
        </Stack>

        <Image
          src={"/images/manSitting.png"}
          alt="People holding hands"
          width={300}
          height={300}
          className={styles.blogImage}
        />
      </Flex>
    </Stack>
  );
};

export default BlogHero;
