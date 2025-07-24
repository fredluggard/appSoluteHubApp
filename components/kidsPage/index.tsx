import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./kidsHero.module.css";
import CustomBtn from "../button/customBtn";
import Image from "next/image";

const KidsHero = () => {
  return (
    <Stack className={styles.heroContent}>
      <Flex className={styles.heroFlex}>
        <Stack className={styles.heroStack}>
          <Title className={styles.heroTitle}>
            Our videos teaches your kids about AI and Software
          </Title>
          <Text className={styles.heroText}>
            We teach kids about tech, one fun video at a time. From AI to
            software, our videos break down big tech ideas into bite-sized fun
            for curious young minds.
          </Text>
          <CustomBtn
            url="https://www.youtube.com/@appsolute_kids"
            text="Watch Now >"
            bgColor="#ff1709"
            img="/icons/mdi_youtube.svg"
          />
        </Stack>

        <Image
          src={"/images/kids.png"}
          alt=""
          width={300}
          height={300}
          className={styles.img}
        />
      </Flex>
    </Stack>
  );
};

export default KidsHero;
