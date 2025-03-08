"use client";

import { Box, Flex, Progress, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./task.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const tasks = [
  {
    id: "1",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "2",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task2.png",
  },
  {
    id: "3",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task3.png",
  },
  {
    id: "4",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "5",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task4.png",
  },
  {
    id: "6",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task5.png",
  },
  {
    id: "7",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "8",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "9",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "10",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "11",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
  {
    id: "12",
    title: "How to open a stock account on Tradient?",
    points: "200",
    date: "2/3/2025",
    tags: "YouTube, AI",
    image: "/images/task1.png",
  },
];

const Tasks = () => {
  const [task, setTask] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleTask = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, userRes] = await Promise.all([
          fetch(`${url}/api/v1/tasks`).then((res) => res.json()),
          fetch(`${url}/api/v1/users/auth/${token}`).then((res) => res.json()),
        ]);

        console.log(taskRes?.data);
        console.log(userRes?.data);

        setTask(taskRes?.data);
        setUser(userRes?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <Stack className={styles.taskContainer}>
      <Stack className={styles.innerBox}>
        <Flex className={styles.topFlex}>
          <Stack className={styles.topStack}>
            <Image
              src={"/images/userProfile.png"}
              alt="user profile"
              width={50}
              height={50}
              className={styles.userImg}
            />
            <Box bg={"orange"} className={styles.cameraBox}>
              <Image
                src={"/icons/camera.svg"}
                alt=""
                width={20}
                height={20}
                className={styles.cameraIcon}
              />
            </Box>
          </Stack>

          <Stack className={styles.downStack}>
            <Title className={styles.userName}>Sochima Onah</Title>
            <Stack className={styles.progressBox}>
              <Progress w={"90%"} color="#f28520" value={30} />
              <Text className={styles.completed}>158/500</Text>
            </Stack>
            <Text className={styles.morePoints}>
              Earn more 332 more points to bypass 50 people
            </Text>
          </Stack>

          <Flex>
            <p className={styles.todoTask}>
              2/55 {""} <span className={styles.todoSpan}>tasks</span>
            </p>
          </Flex>
        </Flex>

        <Stack className={styles.taskStack}>
          <Title className={styles.availTitle}>Available Tasks</Title>

          <Flex className={styles.taskFlex}>
            {tasks.map((task, index) => (
              <Stack key={index} className={styles.taskBox}>
                <Stack
                  className={styles.imageBox}
                  onClick={() => handleTask(task.id)}
                >
                  <Image
                    src={task.image}
                    alt="task image"
                    width={240}
                    height={150}
                    className={styles.taskImg}
                  />
                  <p className={styles.taskPnt}>{task.points} points</p>
                </Stack>
                <Flex className={styles.flexSpace}>
                  <Text className={styles.taskDate}>{task.date}</Text>
                  <Text className={styles.taskDate}>{task.tags}</Text>
                </Flex>
                <Title
                  className={styles.taskTitle}
                  onClick={() => handleTask(task.id)}
                >
                  {task.title}
                </Title>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Tasks;
