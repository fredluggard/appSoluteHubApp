import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./onGoing.module.css";
import Link from "next/link";

const OngoingProjects = () => {
  return (
    <Stack className={styles.ongoingProjects}>
      <Flex className={styles.top}>
        <Title className={styles.mainTitle}>Ongoing Research Projects</Title>
        <div className={styles.contain}>
          <span className={styles.line1}></span>
          <span className={styles.line2}></span>
        </div>
      </Flex>

      <Flex className={styles.bottom}>
        <Stack className={styles.left}>
          <Title className={styles.title}>
            We are a community of content writers who share their learnings
          </Title>
          <Text className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Link href="/blog" className={styles.link}>
            Read More &#62;
          </Link>
        </Stack>

        <Stack className={styles.right}>
          <Title className={styles.title}>
            We are a community of content writers who share their learnings
          </Title>
          <Text className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Link href="/research" className={styles.link}>
            Read More &#62;
          </Link>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default OngoingProjects;
