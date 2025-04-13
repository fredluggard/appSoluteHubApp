"use client";

import { Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./kidSection.module.css";
import LinkButton from "../button";
import Image from "next/image";
import KidsCarousel from "./kidsCarousel";

const KidSection = () => {
  return (
    <Stack className={styles.container}>
      <Stack className={styles.kidSection}>
        <Stack className={styles.top}>
          <Stack className={styles.leftBox}>
            <Title className={styles.title}>
              Our videos will make your kids fall in love with Tech
            </Title>
            <Text className={styles.text}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </Text>
            <LinkButton url="kids" text="Learn More &#62;" />
          </Stack>
          <Stack className={styles.rightBox}>
            <Image
              src="/images/kidsImage.png"
              width={508}
              height={628}
              alt="kid"
              className={styles.img}
            />
          </Stack>
        </Stack>
        <Stack className={styles.bottom}>
          <Stack w={"100%"}>
            <Title className={styles.videoTitle}>Video Tutorials</Title>
            <Text className={styles.videoText}>
              Educating your kids about ai and software with our video tutorial
              is one of the best things you can do for them.
            </Text>
          </Stack>

          <Stack w={"100%"}>
            <KidsCarousel />
          </Stack>
        </Stack>
      </Stack>

      <Stack className={styles.kidSection}>
        <Stack className={styles.topLevel}>
          <Stack className={styles.leftBoxLevel}>
            <Title className={styles.title}>
              AppSolute Media grow your knowledge and business with our tailored
              ai and software videos
            </Title>
            <Text className={styles.text}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </Text>
            <LinkButton url="/media" text="Learn More &#62;" />
          </Stack>
          <Stack className={styles.rightBox}>
            <Image
              src="/images/appMedia.png"
              width={508}
              height={628}
              alt=""
              className={styles.img}
            />
          </Stack>
        </Stack>
        <Stack className={styles.bottom}>
          <Stack w={"100%"}>
            <Title className={styles.videoTitle}>Video Tutorials</Title>
            <Text className={styles.videoText}>
              Educating your kids about ai and software with our video tutorial
              is one of the best things you can do for them.
            </Text>
          </Stack>

          <Stack w={"100%"}>
            <KidsCarousel />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default KidSection;
