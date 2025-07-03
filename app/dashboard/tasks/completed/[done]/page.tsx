"use client";

import {
  Box,
  Button,
  Flex,
  Loader,
  Progress,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const DoneTasks = () => {
  interface TaskType {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    points: number;
    isAnsweredByUser: boolean;
    tags: { tag?: { name?: string } }[];
    title: string;
    imageUrl: string;
    url: string;
    userTask: AnsweredQuestion[];
    createdAt: string;
    updatedAt: string;
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

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);

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
  const [taskDetails, setTaskDetails] = useState<TaskType>({} as TaskType);
  const [task, setTask] = useState<AnsweredQuestion[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);

  const quizQuestions = useMemo(() => task ?? [], [task]);

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const params = useParams();
  const taskId = params.done;
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();
  const handleEndTask = () => {
    router.push("/dashboard/tasks");
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Task data:", data);
      setTaskDetails(data?.Task);
      setTask(data?.Task.userTasks);
      setTotalScore(task.reduce((sum, t) => sum + t.scoreEarned, 0));
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  }, [taskId, url, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${url}/api/v1/userPage/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, userId, url]);

  useEffect(() => {
    const fetchtaskDetails = async () => {
      if (!token) return;
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
        console.error("Error fetching task details:", error);
      }
    };

    const fetchStat = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          `${url}/api/v1/tasks/leaderboard-progress`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setLeaderboardStatus({
          message: data.data.message || "",
          peopleToBypass: data.data.peopleToBypass || 0,
          pointsToBypass: data.data.pointsToBypass || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchtaskDetails();
    fetchStat();
  }, [token, url]);

  return (
    <Stack className={styles.tasksContainer}>
      {loading ? (
        <Stack className={styles.innerBox} justify="center" align="center">
          <Loader color="blue" size="lg" />
        </Stack>
      ) : (
        <Stack className={styles.innerBox}>
          {/* profile and progress */}
          <Flex className={styles.topFlex}>
            <Stack className={styles.topStack}>
              <Image
                src={user ? user?.profileImage : "/images/userProfile.png"}
                alt="user profile"
                width={50}
                height={50}
                className={styles.userImg}
              />
            </Stack>

            <Stack className={styles.downStack}>
              <Title className={styles.userName}>{user?.fullName}</Title>
              <Stack className={styles.progressBox}>
                <Progress w={"90%"} color="#f28520" value={progress} />
                <Text className={styles.completed}>
                  {taskProgress?.completedTasks}/{taskProgress?.totalTasks}
                </Text>
              </Stack>
              <Text className={styles.morePoints}>
                {leaderboardStatus?.peopleToBypass > 0
                  ? `Earn more ${leaderboardStatus.pointsToBypass} points to bypass ${leaderboardStatus.peopleToBypass} person(s)`
                  : leaderboardStatus.message ||
                    "Keep up the good work this month!"}
              </Text>
            </Stack>
          </Flex>

          {/* task preview */}
          <Stack className={styles.questStack}>
            <Image
              src={taskDetails?.imageUrl || "/images/dashBlog.png"}
              alt="task"
              width={405}
              height={260}
              className={styles.questImg}
            />
            <Flex className={styles.questFlex}>
              <Text className={styles.questTitle}>{taskDetails?.title}</Text>
              <Link
                href={taskDetails?.url ?? "#"}
                target="_blank"
                className={styles.questLink}
              >
                <Image
                  src={"/icons/linkOut.svg"}
                  alt="task"
                  width={20}
                  height={20}
                />
              </Link>
            </Flex>
          </Stack>

          {/* questions */}
          <Stack className={styles.mainStack}>
            <Text className={styles.mainQuest}>Questions</Text>
            <Stack className={styles.mainStack}>
              {task?.map((userTask, idx) => {
                const { question, userAnswer } = userTask;

                const getOptionClass = (option: string) => {
                  if (option === question.correctAnswer) return styles.correct;
                  if (
                    option === userAnswer &&
                    option !== question.correctAnswer
                  )
                    return styles.incorrect;
                  return styles.radio;
                };

                return (
                  <Box key={userTask.id} className={styles.mainStack}>
                    <Flex justify="space-between" align="center">
                      <Text className={styles.questionText}>
                        {idx + 1}. {question.questionText}
                      </Text>
                      <Text className={styles.index}>
                        {idx + 1}/{quizQuestions.length}
                      </Text>
                    </Flex>
                    <Radio.Group
                      value={userAnswer}
                      className={styles.radioGroup}
                    >
                      {question.options.map((option) => (
                        <Radio
                          key={option}
                          value={option}
                          label={option}
                          disabled
                          className={`${styles.radio} ${getOptionClass(
                            option
                          )}`}
                        />
                      ))}
                    </Radio.Group>
                  </Box>
                );
              })}
            </Stack>
            <Stack className={styles.showStack}>
              <Image
                src={"/icons/confetti.svg"}
                alt=""
                width={100}
                height={100}
              />

              <Text className={styles.showText}>You have earned</Text>
              <Text className={styles.showTitle}>{totalScore} points</Text>
              <Stack className={styles.showBtnBox}>
                <Button className={styles.showBtn} onClick={handleEndTask}>
                  Next Task
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default DoneTasks;
