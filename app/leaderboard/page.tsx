"use client";

import { Flex, Loader, Stack, Table, Text, Title } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./leader.module.css";

const LeaderBoard = () => {
  interface User {
    id: string;
    rank: string;
    fullName: string;
    totalScore: string;
    joined: string;
    answered: string;
    profileImage: string;
  }

  const [data, setData] = useState<User[]>([]);
  const date = new Date().toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/leaderborad`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setData(data.leaderboard);
    } catch (error) {
      console.error("Error fetching Leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch(`${baseUrl}/api/v1/leaderborad`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setData(data.leaderboard);
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with the fetch operation:", error);
    //   });
    fetchData();
  }, []);

  const rows = data?.map((user, i) => (
    <tr key={i} className={styles.tableRow}>
      <td className={styles.tableText}>{i + 1}</td>
      <td className={styles.tableText2}>
        <Flex align={"center"} w={"60%"} h={70} gap={20}>
          <Image
            src={user.profileImage || "/images/userProfile.png"}
            alt={user.fullName}
            width={35}
            height={35}
            className={styles.userImg}
          />
          <Text>{user.fullName}</Text>
        </Flex>
      </td>
      <td className={styles.tableText}>
        {new Date(user.joined).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className={styles.tableText}>{user.answered}</td>
      <td className={styles.tableText}>{user.totalScore}</td>
    </tr>
  ));

  return (
    <>
      {loading ? (
        <Stack className={styles.innerBox} justify="center" align="center">
          <Loader color="blue" size="lg" />
        </Stack>
      ) : (
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
                src={
                  data[1]?.profileImage && data[1].profileImage.trim() !== ""
                    ? data[1].profileImage
                    : "/images/userProfile.png"
                }
                alt="user"
                width={150}
                height={150}
                className={styles.posImg}
              />
              <Title className={styles.posText}>2nd Place</Title>
              <Text className={styles.posName}>{data[1]?.fullName}</Text>
              <Flex className={styles.posFlex}>
                <Title className={styles.points}>{data[1]?.totalScore}</Title>
                <Text className={styles.pointText}>Points</Text>
              </Flex>
            </Stack>

            <Stack className={styles.firstBox}>
              <Text className={styles.pos1}>1</Text>
              <Image
                src={
                  data[0]?.profileImage && data[0].profileImage.trim() !== ""
                    ? data[0].profileImage
                    : "/images/userProfile.png"
                }
                alt="user"
                width={150}
                height={150}
                className={styles.posImg}
              />
              <Title className={styles.posText}>1st Place</Title>
              <Text className={styles.posName}>{data[0]?.fullName}</Text>
              <Flex className={styles.posFlex}>
                <Title className={styles.points}>{data[0]?.totalScore}</Title>
                <Text className={styles.pointText}>Points</Text>
              </Flex>
            </Stack>

            <Stack className={styles.secondBox}>
              <Text className={styles.pos3}>3</Text>
              <Image
                src={
                  data[2]?.profileImage && data[2].profileImage.trim() !== ""
                    ? data[2].profileImage
                    : "/images/userProfile.png"
                }
                alt="user"
                width={150}
                height={150}
                className={styles.posImg}
              />
              <Title className={styles.posText}>3rd Place</Title>
              <Text className={styles.posName}>{data[2]?.fullName}</Text>
              <Flex className={styles.posFlex}>
                <Title className={styles.points}>{data[2]?.totalScore}</Title>
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
      )}
    </>
  );
};

export default LeaderBoard;
