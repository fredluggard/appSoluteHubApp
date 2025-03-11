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
    url: string;
    points: number;
    questions: Question[];
  }

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [hide, setHide] = useState(true);
  const [task, setTask] = useState<TaskType | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

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

  const submitScore = async (questionId: number, userAnswer: string) => {
    try {
      const response = await fetch(`${url}/api/v1/tasks/answer/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionId,
          userAnswer,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error ${response.status}:`, errorMessage);
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const router = useRouter();
  const handleEndTask = () => {
    router.push("/dashboard/tasks");
  };

  const handleOptionChange = (idx: number) => {
    if (answers[currentQuestionIndex] !== null) return;

    const selectedAnswer = currentQuestion?.options[idx] || "";
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    checkAnswer(idx);

    if (currentQuestion) {
      submitScore(currentQuestion.id, selectedAnswer);
    }
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
      const response = await fetch(`${url}/api/v1/tasks/${taskId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setTask(data?.Task);
      setQuizQuestions(data?.Task.questions || []);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  }, [taskId, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${url}/api/v1/userPage/${userId}`);
        const data = await response.json();
        console.log(data.data);
        setUser(data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, userId]);

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
              <Title className={styles.userName}>{user?.fullName}</Title>
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

          <Stack className={styles.questStack}>
            <Image
              src={task?.url || "/images/dashBlog.png"}
              alt="task"
              width={605}
              height={260}
              className={styles.questImg}
            />
            <Flex className={styles.questFlex}>
              <Text className={styles.questTitle}>{task?.title}</Text>
              <Link href={"#"} target="_blank" className={styles.questLink}>
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
                  {correctAnswersCount * 40} points
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
