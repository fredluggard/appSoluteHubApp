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
              We Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Title>
          </Stack>
          <Stack className={styles.aboutRight}>
            <Text className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Title>
          <Text className={styles.handsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Title>
          <Text className={styles.handsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat.
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
