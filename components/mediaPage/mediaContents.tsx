"use client";

import {
  Flex,
  FloatingIndicator,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./mediaContents.module.css";
import { useRouter } from "next/navigation";
import CustomBtn from "../button/customBtn";

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
    title:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat noproident.",
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
];

const MediaContents = () => {
  const router = useRouter();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("email");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const handleTask = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <Stack className={styles.mediaContainer}>
      <Stack className={styles.mediaStack}>
        <Title className={styles.mediaTitle}>From Our Media</Title>
        <Text className={styles.mediaText}>
          Stay ahead of the curve with our curated content that highlights
          breakthrough solutions, in-depth reviews, and expert insights. We
          scour the tech landscape to bring you the most innovative tools and
          platforms that can transform your work and solve your biggest
          challenges.
        </Text>
      </Stack>

      <Tabs
        variant="none"
        value={value}
        onChange={setValue}
        className={styles.tab}
        visibleFrom="md"
      >
        <Tabs.List ref={setRootRef} className={styles.tabLists}>
          <Tabs.Tab
            value="email"
            ref={setControlRef("email")}
            className={styles.subOptions}
          >
            Email Marketing
          </Tabs.Tab>
          <Tabs.Tab
            value="content"
            ref={setControlRef("content")}
            className={styles.subOptions}
          >
            Content Creation
          </Tabs.Tab>
          <Tabs.Tab
            value="writing"
            ref={setControlRef("writing")}
            className={styles.subOptions}
          >
            Writing
          </Tabs.Tab>
          <Tabs.Tab
            value="agents"
            ref={setControlRef("agents")}
            className={styles.subOptions}
          >
            AI Agents
          </Tabs.Tab>
          <Tabs.Tab
            value="graphic"
            ref={setControlRef("graphic")}
            className={styles.subOptions}
          >
            Graphic Design
          </Tabs.Tab>
          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={styles.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="email" className={styles.week}>
          <Flex pt={50} className={styles.taskFlex}>
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
                </Stack>
                <Title
                  className={styles.taskTitle}
                  lineClamp={2}
                  onClick={() => handleTask(task.id)}
                >
                  {task.title}
                </Title>
              </Stack>
            ))}
          </Flex>

          <Stack mt={50} justify="center">
            <CustomBtn url="#" text="See more videos" bgColor="#ff1709" />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="content" className={styles.week}>
          <Flex pt={50} className={styles.taskFlex}>
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
                </Stack>
                <Title
                  className={styles.taskTitle}
                  lineClamp={2}
                  onClick={() => handleTask(task.id)}
                >
                  {task.title}
                </Title>
              </Stack>
            ))}
          </Flex>

          <Stack mt={50} justify="center">
            <CustomBtn url="#" text="See more videos" bgColor="#ff1709" />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="writing" className={styles.week}>
          <Flex pt={50} className={styles.taskFlex}>
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
                </Stack>
                <Title
                  className={styles.taskTitle}
                  lineClamp={2}
                  onClick={() => handleTask(task.id)}
                >
                  {task.title}
                </Title>
              </Stack>
            ))}
          </Flex>

          <Stack mt={50} justify="center">
            <CustomBtn url="#" text="See more videos" bgColor="#ff1709" />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="agents" className={styles.week}>
          <Flex pt={50} className={styles.taskFlex}>
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
                </Stack>
                <Title
                  className={styles.taskTitle}
                  lineClamp={2}
                  onClick={() => handleTask(task.id)}
                >
                  {task.title}
                </Title>
              </Stack>
            ))}
          </Flex>

          <Stack mt={50} justify="center">
            <CustomBtn url="#" text="See more videos" bgColor="#ff1709" />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="graphic" className={styles.week}>
          <Flex pt={50} className={styles.taskFlex}>
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
                </Stack>
                <Title
                  className={styles.taskTitle}
                  lineClamp={2}
                  onClick={() => handleTask(task.id)}
                >
                  {task.title}
                </Title>
              </Stack>
            ))}
          </Flex>

          <Stack mt={50} justify="center">
            <CustomBtn url="#" text="See more videos" bgColor="#ff1709" />
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* <Flex pt={50} className={styles.taskFlex}>
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
            </Stack>
            <Title
              className={styles.taskTitle}
              lineClamp={2}
              onClick={() => handleTask(task.id)}
            >
              {task.title}
            </Title>
          </Stack>
        ))}
      </Flex> */}
    </Stack>
  );
};

export default MediaContents;
