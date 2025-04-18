import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./research.module.css";
import CustomBtn from "../button/customBtn";
import Image from "next/image";

const HeroRD = () => {
  return (
    <Flex className={styles.heroRDContainer}>
      <Stack className={styles.heroLeft}>
        <Text className={styles.heroTitle}>
          Lorem ipsum dolor sit amet{" "}
          <Text className={styles.text}>consectetur.</Text>
        </Text>
        <Text className={styles.heroText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>
        <CustomBtn text="Contact Us Now!" bgColor="#34449C" url="#" />
      </Stack>
      <Image
        src="/icons/standing.svg"
        alt=""
        width={500}
        height={500}
        className={styles.heroImg}
      />
    </Flex>
  );
};

export default HeroRD;
