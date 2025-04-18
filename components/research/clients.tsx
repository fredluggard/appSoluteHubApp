import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./client.module.css";
import Image from "next/image";

const logos = [
  "/icons/fanLogo.svg",
  "/icons/roundLogo.svg",
  "/icons/ojLogo.svg",
  "/icons/ipsumLogo.svg",
  "/icons/printLogo.svg",
  "/icons/chainLogo.svg",
  "/icons/ojLogo.svg",
];

const cards = [
  {
    id: "1",
    title: "Software Development",
    text: "Lorem ipsum dolor sit amet consectetur. Dui  nam semper pellen tesque leo ac ut.",
    img: "/icons/carbon_cluster.svg",
  },
  {
    id: "2",
    title: "Data Analysis",
    text: "Lorem ipsum dolor sit amet consectetur. Dui  nam semper pellen tesque leo ac ut.",
    img: "/icons/data_cluster.svg",
  },
  {
    id: "3",
    title: "Solution Architecture",
    text: "Lorem ipsum dolor sit amet consectetur. Dui  nam semper pellen tesque leo ac ut.",
    img: "/icons/lab_cluster.svg",
  },
  {
    id: "4",
    title: "Technical Research",
    text: "Lorem ipsum dolor sit amet consectetur. Dui  nam semper pellen tesque leo ac ut.",
    img: "/icons/research_cluster.svg",
  },
];

const ClientCard = () => {
  return (
    <Stack className={styles.clientContainer}>
      <Stack className={styles.clientTop}>
        <Stack className={styles.topStack}>
          <Title className={styles.clientTitle}>Our Clients</Title>
          <Text className={styles.clientText}>
            We have been working with some Fortune 500+ clients
          </Text>
        </Stack>
        <Flex className={styles.clientFlex}>
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt=""
              width={48}
              height={48}
              className={styles.clientImg}
            />
          ))}
        </Flex>
      </Stack>

      <Stack className={styles.clientBottom}>
        <Stack className={styles.topStack}>
          <Title className={styles.clientTitle}>
            Lorem ipsum dolor sit amet consectetur.
          </Title>
          <Text className={styles.clientText}>
            Lorem ipsum dolor sit amet consectetur.
          </Text>
        </Stack>
        <Flex className={styles.cardFlex}>
          {cards.map((card, index) => (
            <Stack key={index} className={styles.card}>
              <Image
                src={card.img}
                alt=""
                width={40}
                height={40}
                className={styles.cardImg}
              />
              <Title className={styles.cardTitle}>{card.title}</Title>
              <Text className={styles.cardText}>{card.text}</Text>
            </Stack>
          ))}
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ClientCard;
