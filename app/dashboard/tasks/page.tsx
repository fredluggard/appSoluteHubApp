"use client";

import { Box, Flex, Loader, Progress, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./task.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// const tasks = [
//   {
//     id: "1",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "2",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task2.png",
//   },
//   {
//     id: "3",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task3.png",
//   },
//   {
//     id: "4",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "5",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task4.png",
//   },
//   {
//     id: "6",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task5.png",
//   },
//   {
//     id: "7",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "8",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "9",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "10",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "11",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
//   {
//     id: "12",
//     title: "How to open a stock account on Tradient?",
//     points: "200",
//     date: "2/3/2025",
//     tags: "YouTube, AI",
//     image: "/images/task1.png",
//   },
// ];

const Tasks = () => {
  interface User {
    fullName: string;
    profileImage: string;
  }

  interface TaskType {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    points: number;
    tags: string[];
    title: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }

  const [task, setTask] = useState<TaskType[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTask = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${url}/api/v1/tasks`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/v1/userPage/${userId}`);
        const data = await response.json();
        setUser(data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Stack className={styles.taskContainer}>
      {loading ? (
        <Stack className={styles.innerBox} justify="center" align="center">
          <Loader color="blue" size="lg" />
        </Stack>
      ) : (
        <Stack className={styles.innerBox}>
          <Flex className={styles.topFlex}>
            <Stack className={styles.topStack}>
              <Image
                src={user ? user?.profileImage : "/images/userProfile.png"}
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
              <Title className={styles.userName}>{user?.fullName}</Title>
              <Stack className={styles.progressBox}>
                <Progress w={"90%"} color="#f28520" value={30} />
                <Text className={styles.completed}>158/500</Text>
              </Stack>
              <Text className={styles.morePoints}>
                Earn more 332 more points to bypass 50 people
              </Text>
            </Stack>

            <Flex visibleFrom="md">
              <p className={styles.todoTask}>
                2/{task.length} {""}{" "}
                <span className={styles.todoSpan}>tasks</span>
              </p>
            </Flex>
          </Flex>

          <Stack className={styles.taskStack}>
            <Title className={styles.availTitle}>Available Tasks</Title>

            <Flex className={styles.taskFlex}>
              {task?.map((task, index: any) => (
                <Stack key={index} className={styles.taskBox}>
                  <Stack
                    className={styles.imageBox}
                    onClick={() => handleTask(task.id)}
                  >
                    <Image
                      src={task.url}
                      alt="task image"
                      width={240}
                      height={150}
                      className={styles.taskImg}
                    />
                    <p className={styles.taskPnt}>{task.points} points</p>
                  </Stack>
                  <Flex className={styles.flexSpace}>
                    <Text className={styles.taskDate}>
                      {new Date(task.createdAt).toLocaleDateString("en-GB")}
                    </Text>
                    <Text className={styles.taskDate}>
                      {/* {task.tags.join(", ")} */}
                      {task.tags[0]}
                    </Text>
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
      )}
    </Stack>
  );
};

export default Tasks;
