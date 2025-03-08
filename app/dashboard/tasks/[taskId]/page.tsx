"use client";

import {
  Box,
  Button,
  CheckIcon,
  Flex,
  Progress,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./taskId.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const quizQuestions = [
  {
    question: "How to open a stock account at Tradiant?",
    options: [
      "Fill out an online form",
      "Visit a local bank",
      "Call customer support",
      "Use a 3rd party broker",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the minimum deposit required?",
    options: ["$100", "$500", "$1000", "No minimum deposit"],
    correctAnswer: 3,
  },
  {
    question: "Which document is required for verification?",
    options: [
      "Passport",
      "Driver's License",
      "Utility Bill",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    question: "How long does the verification process take?",
    options: ["1-2 days", "3-5 days", "1 week", "2 weeks"],
    correctAnswer: 1,
  },
  {
    question: "Can you trade immediately after opening an account?",
    options: [
      "Yes",
      "No",
      "Depends on the verification",
      "Depends on the deposit amount",
    ],
    correctAnswer: 2,
  },
];

const TaskID = () => {
  const [hide, setHide] = useState(true);
  const [singleTask, setSingleTask] = useState<any>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(quizQuestions.length).fill(null)
  );
  const { question, options } = quizQuestions[currentQuestionIndex];
  const checkAnswer = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (
      currentQuestion.options[currentQuestion.correctAnswer] ===
      answers[currentQuestionIndex]
    ) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };
  const handleNext = () => {
    if (!answers[currentQuestionIndex])
      return alert("Please select an answer.");

    checkAnswer();

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setHide(!hide);
    }
  };

  const router = useRouter();
  const handleEndTask = () => {
    router.push("/dashboard/tasks");
  };

  const handleOptionChange = (value: string) => {
    if (answers[currentQuestionIndex] !== null) return; // Prevent re-selection

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const getOptionClass = (option: string, idx: number) => {
    const selectedAnswer = answers[currentQuestionIndex];
    const isCorrect =
      quizQuestions[currentQuestionIndex].options[
        quizQuestions[currentQuestionIndex].correctAnswer
      ];

    if (!selectedAnswer) return styles.radio;

    if (option === isCorrect) return styles.correct;
    if (option === selectedAnswer) return styles.incorrect;

    return styles.radio;
  };

  const { taskId } = useParams();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/v1/tasks/${taskId}`, {
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
        setSingleTask(data.Task);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack className={styles.tasksContainer}>
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

        <Stack className={styles.questStack}>
          <Image
            src={"/images/task1.png"}
            alt="task"
            width={605}
            height={260}
            className={styles.questImg}
          />
          <Flex className={styles.questFlex}>
            <Text className={styles.questTitle}>
              How to open a stock account at Tradiant?
            </Text>
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
              {currentQuestionIndex < quizQuestions.length - 1
                ? question
                : "Task points earned!"}
            </Title>
            <Text className={styles.index}>
              {currentQuestionIndex < quizQuestions.length - 1
                ? `${currentQuestionIndex + 1}/${quizQuestions.length}`
                : ""}
            </Text>
          </Flex>

          {hide ? (
            <Stack className={styles.mainStack}>
              <Radio.Group
                value={answers[currentQuestionIndex] || ""}
                onChange={handleOptionChange}
                className={styles.radioGroup}
              >
                {options.map((option, idx) => (
                  <Radio
                    key={idx}
                    value={option}
                    label={option}
                    disabled={answers[currentQuestionIndex] !== null}
                    className={`${styles.radio} ${getOptionClass(option, idx)}`}
                  />
                ))}
              </Radio.Group>

              <Stack className={styles.btnBox}>
                <Button onClick={handleNext} className={styles.taskBtn}>
                  {currentQuestionIndex < quizQuestions.length - 1
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
                {correctAnswersCount}/{quizQuestions.length}
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
    </Stack>
  );
};

export default TaskID;
