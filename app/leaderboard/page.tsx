import { Flex, Stack, Table, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./leader.module.css";

const LeaderBoard = () => {
  const date = new Date().toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const data = [
    {
      rank: "1",
      name: "James Bond",
      points: "4000",
      joined: "12/09/2023",
      answered: "10",
      image: "/images/team.png",
    },
    {
      rank: "2",
      name: "Darmain Joe",
      points: "4000",
      joined: "12/09/2023",
      answered: "10",
      image: "/images/team.png",
    },
    {
      rank: "3",
      name: "Sarah Lee",
      points: "4000",
      joined: "12/09/2023",
      answered: "10",
      image: "/images/team.png",
    },
    {
      rank: "4",
      name: "William Spencer",
      points: "4000",
      joined: "12/09/2023",
      answered: "10",
      image: "/images/team.png",
    },
    {
      rank: "5",
      name: "Abel Woods",
      points: "4000",
      joined: "12/09/2023",
      answered: "10",
      image: "/images/team.png",
    },
  ];

  const rows = data.map((user, i) => (
    <tr key={i} className={styles.tableRow}>
      <td className={styles.tableText}>{user.rank}</td>
      <td className={styles.tableText2}>
        <Flex align={"center"} w={"60%"} h={70} gap={20}>
          <Image
            src={user.image}
            alt={user.name}
            width={35}
            height={35}
            className={styles.userImg}
          />
          <Text>{user.name}</Text>
        </Flex>
      </td>
      <td className={styles.tableText}>{user.joined}</td>
      <td className={styles.tableText}>{user.answered}</td>
      <td className={styles.tableText}>{user.points}</td>
    </tr>
  ));

  return (
    <Stack className={styles.leadContainer}>
      <Flex className={styles.leadHead}>
        <Title className={styles.leadTitle}>AppSolute Leaderboard</Title>
        <Text className={styles.leadText}>
          Last Updated: <span className={styles.leadText2}>{date}</span>
        </Text>
      </Flex>

      <Flex className={styles.leaderFlex}>
        <Stack className={styles.secondBox}>
          <Text className={styles.pos2}>2</Text>
          <Image
            src={"/images/team.png"}
            alt="user"
            width={150}
            height={150}
            className={styles.posImg}
          />
          <Title className={styles.posText}>2nd Place</Title>
          <Text className={styles.posName}>{data[1].name}</Text>
          <Flex className={styles.posFlex}>
            <Title className={styles.points}>{data[1].points}</Title>
            <Text className={styles.pointText}>Points</Text>
          </Flex>
        </Stack>

        <Stack className={styles.firstBox}>
          <Text className={styles.pos1}>1</Text>
          <Image
            src={"/images/team.png"}
            alt="user"
            width={150}
            height={150}
            className={styles.posImg}
          />
          <Title className={styles.posText}>1st Place</Title>
          <Text className={styles.posName}>{data[0].name}</Text>
          <Flex className={styles.posFlex}>
            <Title className={styles.points}>{data[0].points}</Title>
            <Text className={styles.pointText}>Points</Text>
          </Flex>
        </Stack>

        <Stack className={styles.secondBox}>
          <Text className={styles.pos3}>3</Text>
          <Image
            src={"/images/team.png"}
            alt="user"
            width={150}
            height={150}
            className={styles.posImg}
          />
          <Title className={styles.posText}>3rd Place</Title>
          <Text className={styles.posName}>{data[2].name}</Text>
          <Flex className={styles.posFlex}>
            <Title className={styles.points}>{data[2].points}</Title>
            <Text className={styles.pointText}>Points</Text>
          </Flex>
        </Stack>
      </Flex>

      <Table>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableHead}>Rank</th>
            <th className={styles.tableHead}>Participant Name</th>
            <th className={styles.tableHead}>Joined</th>
            <th className={styles.tableHead}>Answered</th>
            <th className={styles.tableHead}>Points</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
};

export default LeaderBoard;
