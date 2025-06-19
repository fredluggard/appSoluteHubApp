"use client";

import { Flex, Stack, Title, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./tasks.module.css";
import Header from "@/components/pageHeader";
import TaskSearch from "@/components/searchComp/taskSearch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingBar from "../loading";

export interface QuizQuestion {
  id: number;
  taskId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  url: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  questions: QuizQuestion[];
}

const Tasks = () => {
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState<Quiz[]>([]);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const createTask = () => {
    setAddNew((prev) => !prev);
  };

  const handleTask = (taskId: string) => {
    router.push(`/admin/tasks/edit-task?id=${taskId}`);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/v1/tasks`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setTaskList(data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return loading ? (
    <LoadingBar />
  ) : (
    <Stack>
      <Header title="Tasks" />
      <Stack className={styles.bodyBox}>
        <TaskSearch handleNew={createTask} />

        <Stack className={styles.taskStack}>
          <Title className={styles.availTitle}>Tasks</Title>

          <Flex className={styles.taskFlex}>
            {taskList?.map((task, index: any) => (
              <Stack key={index} className={styles.taskBox}>
                <Stack className={styles.imageBox}>
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
                    {/* {task.tags[0]} */}
                  </Text>
                </Flex>
                <Title className={styles.taskTitle}>{task.title}</Title>
                <Flex w="100%" justify={"space-between"}>
                  <button className={styles.taskEditBtn}>
                    <Image
                      src="/icons/taskEdit.svg"
                      alt="edit"
                      width={15}
                      height={15}
                      onClick={() => handleTask(task.id)}
                    />
                  </button>

                  <button
                    className={styles.taskEditBtn}
                    onClick={() => router.push(`${url}/dashboard`)}
                  >
                    View
                  </button>
                </Flex>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Tasks;
