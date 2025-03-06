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

export default KidsHero;
