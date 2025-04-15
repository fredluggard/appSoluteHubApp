import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./team.module.css";

const Team = () => {
  const teamMembers = [
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      img: "/images/team.png",
    },
  ];

  return (
    <Stack className={styles.team}>
      <Title className={styles.title}>Meet The Team</Title>

      <Flex className={styles.itemBox}>
        {teamMembers.map((item, index) => (
          <Stack key={index} className={styles.itemCover}>
            <Image
              src={item.img}
              alt=""
              width={250}
              height={250}
              className={styles.image}
            />
            <Title className={styles.itemTitle}>{item.name}</Title>
            <Text className={styles.itemText}>{item.role}</Text>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
};

export default Team;
