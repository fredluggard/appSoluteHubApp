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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./taskId.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

const TaskID = () => {
  interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
    taskId: string;
  }

  interface TaskType {
    id: string;
    title: string;
    tags: string[];
    imageUrl: string;
    url: string;
    points: number;
    questions: Question[];
  }

  interface Answer {
    questionId: number;
    userAnswer: string;
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
  const [hide, setHide] = useState(true);
  const [task, setTask] = useState<TaskType | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const currentQuestion = useMemo(
    () => quizQuestions[currentQuestionIndex] || null,
    [quizQuestions, currentQuestionIndex]
  );

  useEffect(() => {
    setAnswers(Array(quizQuestions.length).fill(null));
  }, [quizQuestions]);

  const checkAnswer = (index: number) => {
    if (!currentQuestion) return;
    if (currentQuestion.options[index] === currentQuestion.correctAnswer) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };
  const handleNext = () => {
    if (answers[currentQuestionIndex] === null)
      return alert("Please select an answer.");

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setHide(false);
    }
  };

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const { taskId } = useParams();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const submitScore = async () => {
    try {
      const response = await fetch(`${url}/api/v1/doTasks/answer/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          answers: userAnswers,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error ${response.status}:`, errorMessage);
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Score submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const router = useRouter();
  const handleEndTask = async () => {
    try {
      await submitScore();
      router.push("/dashboard/tasks");
    } catch (error) {
      console.error("Failed to submit score:", error);
      alert("There was an issue submitting your answers. Please try again.");
    }
  };

  const handleOptionChange = (idx: number) => {
    if (answers[currentQuestionIndex] !== null) return;

    const selectedAnswer = currentQuestion?.options[idx] || "";
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    checkAnswer(idx);

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion?.id ?? 0,
        userAnswer: selectedAnswer,
      },
    ]);
  };

  const getOptionClass = (idx: number) => {
    const selectedAnswer = answers[currentQuestionIndex];
    if (selectedAnswer === null) return styles.radio;
    if (currentQuestion?.options[idx] === currentQuestion?.correctAnswer) {
      return styles.correct;
    }
    if (currentQuestion?.options[idx] === selectedAnswer) {
      return styles.incorrect;
    }
    return styles.radio;
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
      console.log("Response status:", response);
      const data = await response.json();
      setTask(data?.Task);
      setQuizQuestions(data?.Task.questions || []);
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
      console.error("Error fetching task details data:", error);
    }
  };

  const fetchStat = async () => {
    if (!token) return;

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

  useEffect(() => {
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
                <Progress w={"90%"} color="#f28520" value={progress} />
                <Text className={styles.completed}>
                  {taskProgress?.completedTasks}/{taskProgress?.totalTasks}
                </Text>
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
          </Flex>

          <Stack className={styles.questStack}>
            <Image
              src={task?.imageUrl || "/images/dashBlog.png"}
              alt="task"
              width={405}
              height={260}
              className={styles.questImg}
            />
            <Flex className={styles.questFlex}>
              <Text className={styles.questTitle}>{task?.title}</Text>
              <Link
                href={task?.url ?? "#"}
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

          <Stack className={styles.mainStack}>
            <Text className={styles.mainQuest}>Questions</Text>
            <Flex className={styles.mainFlex}>
              <Title className={styles.mainAsk}>
                {hide
                  ? currentQuestion?.questionText
                  : "You've completed all questions!"}
              </Title>
              <Text className={styles.index}>
                {currentQuestionIndex + 1}/{quizQuestions.length}
              </Text>
            </Flex>

            {hide ? (
              <Stack className={styles.mainStack}>
                <Radio.Group
                  value={answers[currentQuestionIndex] || ""}
                  className={styles.radioGroup}
                >
                  {currentQuestion?.options.map((option, idx) => (
                    <Radio
                      key={idx}
                      value={idx.toString()}
                      label={option}
                      disabled={answers[currentQuestionIndex] !== null}
                      onChange={() => handleOptionChange(idx)}
                      className={`${styles.radio} ${getOptionClass(idx)}`}
                    />
                  ))}
                </Radio.Group>

                <Stack className={styles.btnBox}>
                  <Button onClick={handleNext} className={styles.taskBtn}>
                    {currentQuestionIndex < quizQuestions?.length - 1
                      ? "Next"
                      : "Submit"}
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack className={styles.showStack}>
                <Image
                  src={"/icons/confetti.svg"}
                  alt=""
                  width={100}
                  height={100}
                />
                <Text className={styles.showTitle}>
                  {correctAnswersCount}/{quizQuestions?.length}
                </Text>
                <Text className={styles.showText}>You have earned</Text>
                <Text className={styles.showTitle}>
                  {(correctAnswersCount * (task?.points || 0)) /
                    quizQuestions.length}{" "}
                  points
                </Text>
                <Stack className={styles.showBtnBox}>
                  <Button className={styles.showBtn} onClick={handleEndTask}>
                    Next Task
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default TaskID;
