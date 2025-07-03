"use client";

import { Box, Flex, Loader, Progress, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./task.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Tasks = () => {
  interface User {
    fullName: string;
    profileImage: string;
  }

  interface AnsweredQuestion {
    id: string;
    userId: string;
    taskId: string;
    questionId: number;
    userAnswer: string;
    isCorrect: boolean;
    scoreEarned: number;
    answeredAt: string;
    user: {
      id: string;
      fullName: string;
      nickName: string | null;
      email: string;
      profileImage: string;
      role: string;
      totalScore: number;
      answered: number;
    };
    task: {
      id: string;
      title: string;
      url: string;
      imageUrl: string;
      description: string;
      points: number;
      createdAt: string;
      updatedAt: string;
    };
    question: {
      id: number;
      questionText: string;
      options: string[];
      correctAnswer: string;
    };
  }

  interface TaskType {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    points: number;
    isAnsweredByUser: boolean;
    tags: { tag?: { name?: string } }[];
    title: string;
    url: string;
    userTask: AnsweredQuestion[];
    createdAt: string;
    updatedAt: string;
  }

  interface TaskProgress {
    completedTasks: number;
    totalTasks: number;
    progressPercent: number;
  }

  interface LeaderboardStatus {
    message: string;
    peopleToBypass: number;
    pointsToBypass: number;
  }

  const [taskProgress, setTaskProgress] = useState<TaskProgress>({
    completedTasks: 0,
    totalTasks: 0,
    progressPercent: 0,
  });
  const [leaderboardStatus, setLeaderboardStatus] = useState<LeaderboardStatus>(
    {
      message: "",
      peopleToBypass: 0,
      pointsToBypass: 0,
    }
  );
  const [progress, setProgress] = useState<number>(0);
  const [task, setTask] = useState<TaskType[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTask = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };
  const handleDoneTask = (taskId: string) => {
    router.push(`/dashboard/tasks/completed/${taskId}`);
  };

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          // `${url}/api/v1/tasks/undoneTasks/${userId}`,
          `${url}/api/v1/tasks`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTask(data.data || []);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    const fetchtaskDetails = async () => {
      try {
        const response = await fetch(`${url}/api/v1/tasks/task-progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTaskProgress({
          completedTasks: data.data.completedTasks || 0,
          totalTasks: data.data.totalTasks || 0,
          progressPercent: data.data.progressPercent || 0,
        });
        setProgress(data.data.progressPercent || 0);
      } catch (error) {
        console.error("Error fetching task details data:", error);
      }
    };

    const fetchStat = async () => {
      try {
        const response = await fetch(
          `${url}/api/v1/tasks/leaderboard-progress `,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        console.log("Stat data:", data);
        setLeaderboardStatus({
          message: data.data.message || "",
          peopleToBypass: data.data.peopleToBypass || 0,
          pointsToBypass: data.data.pointsToBypass || 0,
        });
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    if (token) {
      fetchTasks();
      fetchtaskDetails();
      fetchStat();
    }
  }, [token, url, userId]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/v1/userPage/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Fetched user data:", data);
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
  }, [token, url, userId]);

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
                <Progress
                  w={"100%"}
                  color="#f28520"
                  value={typeof progress === "number" ? progress : 0}
                />
                {/* <Text className={styles.completed}>
                  {taskProgress?.completedTasks}/{taskProgress?.totalTasks}
                </Text> */}
              </Stack>
              {leaderboardStatus?.peopleToBypass > 0 ? (
                <Text className={styles.morePoints}>
                  Earn more {leaderboardStatus?.pointsToBypass} points to bypass{" "}
                  {leaderboardStatus?.peopleToBypass} person&#40;s&#41;
                </Text>
              ) : (
                <Text className={styles.morePoints}>
                  {leaderboardStatus?.message ||
                    "Keep up the good work this month!"}
                </Text>
              )}
            </Stack>

            <Flex visibleFrom="md">
              <p className={styles.todoTask}>
                {taskProgress?.completedTasks}/{taskProgress?.totalTasks}{" "}
                <span className={styles.todoSpan}>tasks</span>
              </p>
            </Flex>
          </Flex>

          <Stack className={styles.taskStack}>
            <Title className={styles.availTitle}>Available Tasks</Title>

            <Flex className={styles.taskFlex}>
              {task?.map((task, index: number) => {
                if (task.isAnsweredByUser) {
                  return (
                    <Stack key={index} className={styles.taskBox}>
                      <Stack
                        className={styles.imageBox}
                        style={{ opacity: "0.6" }}
                        onClick={() => handleDoneTask(task.id)}
                      >
                        <Image
                          src={task.url}
                          alt="task image"
                          width={240}
                          height={150}
                          className={styles.taskImg}
                        />
                        <p className={styles.taskPnt}>Completed</p>
                      </Stack>
                      <Flex className={styles.flexSpace}>
                        <Text className={styles.taskDate}>
                          {new Date(task.createdAt).toLocaleDateString("en-GB")}
                        </Text>
                        <Text className={styles.taskDate}>
                          {task.tags[0]?.tag?.name || "No Tags"}
                        </Text>
                      </Flex>
                      <Title
                        className={styles.taskTitle}
                        onClick={() => handleDoneTask(task.id)}
                      >
                        {task.title}
                      </Title>
                    </Stack>
                  );
                } else {
                  return (
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
                          {task.tags[0]?.tag?.name || "No Tags"}
                        </Text>
                      </Flex>
                      <Title
                        className={styles.taskTitle}
                        onClick={() => handleTask(task.id)}
                      >
                        {task.title}
                      </Title>
                    </Stack>
                  );
                }
              })}
            </Flex>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Tasks;
