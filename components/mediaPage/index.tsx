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
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </Text>
          <CustomBtn
            url="#"
            text="Watch Now >"
            bgColor="#ff1709"
            img="/icons/mdi_youtube.svg"
          />
        </Stack>

        <Image
          src={"/images/neural.png"}
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
