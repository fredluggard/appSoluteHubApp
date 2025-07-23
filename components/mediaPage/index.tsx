import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./mediaHero.module.css";
import CustomBtn from "../button/customBtn";
import Image from "next/image";

const MediaHero = () => {
  return (
    <Stack className={styles.heroContent}>
      <Flex className={styles.heroFlex}>
        <Stack className={styles.heroStack}>
          <Text className={styles.heroLittle}>Uploaded - 5 mins ago</Text>
          <Title className={styles.heroTitle}>
            How DeepSeek is taking over the world
          </Title>
          <Text className={styles.heroText}>
            Discover the Perfect Tech Solution for Every Challenge Every problem
            has a tech solution: we help you find it. Watch our latest showcase
            of innovative tools, apps, and solutions that are transforming how
            professionals work and succeed.
          </Text>
          <CustomBtn
            url="#"
            text="Watch Now >"
            bgColor="#ff1709"
            img="/icons/mdi_youtube.svg"
          />
        </Stack>

        <Image
          src={"/images/dddd.jpeg"}
          alt=""
          width={300}
          height={300}
          className={styles.img}
        />
      </Flex>
    </Stack>
  );
};

export default MediaHero;
