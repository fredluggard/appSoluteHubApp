import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./about.module.css";

const About = () => {
  return (
    <Stack className={styles.aboutContainer}>
      <Stack className={styles.aboutTop}>
        <Flex className={styles.wrapper}>
          <Stack className={styles.aboutLeft}>
            <Text className={styles.subTitle}>WHO WE ARE</Text>
            <Title className={styles.title}>
              Appsolute - Innovating the future one solution at a time.
            </Title>
          </Stack>
          <Stack className={styles.aboutRight}>
            <Text className={styles.text}>
              We are a creative tech brand helping people understand, explore,
              and use technology with confidence.
            </Text>
          </Stack>
        </Flex>
        <Image
          src={"/images/about.png"}
          alt="A group of friends"
          width={200}
          height={200}
          className={styles.aboutImage}
        />
      </Stack>

      <Flex className={styles.mission}>
        <Stack className={styles.handsBox}>
          <Title className={styles.handsTitle}>Our Mission</Title>
          <Title order={4} className={styles.handsSubTitle}>
            Make technology accessible to everyone by designing people-first
            experiences, building discovery tools, and creating educational
            content that actually makes sense.
          </Title>
          <Text className={styles.handsText}>
            AppSoluteHub is our platform for discovering cutting-edge apps,
            software, AI solutions, and hardware tailored to solve real problems
            and elevate your professional edge. Appsolute R&D is our innovation
            lab where we explore new tools and technologies to create
            forward-thinking solutions for real-world challenges. Finally,
            Appsolute Kids brings technology to young minds through fun,
            engaging experiences that make learning practical and exciting.
          </Text>
        </Stack>

        <Image
          src={"/images/hands.png"}
          alt="People holding hands"
          width={300}
          height={300}
          className={styles.handsImage}
        />
      </Flex>

      <Flex className={styles.vision}>
        <Stack className={styles.handsBox}>
          <Title className={styles.handsTitle}>Our Vision</Title>
          <Title order={4} className={styles.handsSubTitle}>
            A world where technology is for everyone.
          </Title>
          <Text className={styles.handsText}>
            To create a world where everyone regardless of age, background, or
            skill can use technology with confidence.
          </Text>
        </Stack>

        <Image
          src={"/images/contact.png"}
          alt="People holding hands"
          width={300}
          height={300}
          className={styles.handsImage}
        />
      </Flex>
    </Stack>
  );
};

export default About;
