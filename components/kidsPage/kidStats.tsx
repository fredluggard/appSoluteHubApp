import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./kidStats.module.css";

const reviews = [
  {
    id: "1",
    name: "Emily Halter",
    text: "EduPlay has been a game-changer for my 7-year-old! The adaptive games make learning enjoyable, and the personalized practice sheets are a lifesaver.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mars Sam",
    text: "The practice sheets help me get better at stuff, and the bedtime stories are super fun. I can even tell my own stories sometimes! EduPlay makes me look forward to learning.",
    rating: 5,
  },
  {
    id: "3",
    name: "Lisa Parker",
    text: "Homeschooling three kids can be challenging, but EduPlay has been a game-changer for us. The games cover a range of subjects, making learning diverse and engaging",
    rating: 5,
  },
];

const KidStats = () => {
  return (
    <Stack className={styles.statsContainer}>
      <Flex className={styles.topFlex}>
        <Stack visibleFrom="md">
          <Image
            src={"/icons/robot.svg"}
            alt=""
            height={200}
            width={200}
            className={styles.topImage}
          />
        </Stack>
        <Stack className={styles.topStack}>
          <Title className={styles.topTitle}>
            95% of parents said their children learn a lot from our videos
          </Title>
          <Text className={styles.topText}>
            Below are some of the reviews parents left on our website
          </Text>
        </Stack>
        <Stack>
          <Image
            src={"/icons/artificial.svg"}
            alt=""
            height={200}
            width={200}
            className={styles.topImage}
          />
        </Stack>
      </Flex>

      <Flex className={styles.midFlex}>
        {reviews.map((review) => (
          <Stack key={review.id} className={styles.midStack}>
            <Image
              src={"/icons/comma.svg"}
              alt=""
              height={50}
              width={50}
              className={styles.midImage}
            />
            <Text className={styles.midText}>{review.text}</Text>
            <Flex className={styles.starFlex}>
              <Text className={styles.nameText}>{review.name}</Text>
              <Flex className={styles.starBox}>
                {Array(review.rating)
                  .fill(0)
                  .map((_, index) => (
                    <Image
                      key={index}
                      src={"/icons/nounStar.svg"}
                      alt="star"
                      height={20}
                      width={20}
                      className={styles.starImage}
                    />
                  ))}
              </Flex>
            </Flex>
          </Stack>
        ))}
      </Flex>

      <Stack className={styles.joinStack}>
        <Title className={styles.joinTitle}>
          Let your Kids join millions of other kids and learn
        </Title>
        <Flex className={styles.joinFlex}>
          <Stack className={styles.lovedBox}>
            <Text className={styles.lovedText}>Loved by over</Text>
            <Text className={styles.lovedTitle}>30 million Subscribers</Text>
          </Stack>
          <Stack className={styles.lovedBox}>
            <Text className={styles.lovedText}>We have over</Text>
            <Text className={styles.lovedTitle}>50 million views</Text>
          </Stack>
          <Stack className={styles.lovedBox}>
            <Text className={styles.lovedText}>Published</Text>
            <Text className={styles.lovedTitle}>1000 videos</Text>
          </Stack>
        </Flex>
        <Stack hiddenFrom="md">
          <Image
            src={"/icons/robot.svg"}
            alt=""
            height={200}
            width={200}
            className={styles.topImage}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default KidStats;
