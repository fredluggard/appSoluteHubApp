"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./kidsVideos.module.css";
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

const KidsVideos = () => {
  const router = useRouter();

  const handleTask = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <Stack className={styles.mediaContainer}>
      <Stack className={styles.mediaStack}>
        <Title className={styles.mediaTitle}>
          Our videos teaches your kids about modern Tech
        </Title>
        <Text className={styles.mediaText}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </Text>
      </Stack>

      <Stack className={styles.week}>
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
      </Stack>

      {/* <Tabs
        variant="none"
        value={value}
        onChange={setValue}
        className={styles.tab}
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

        <Tabs.Panel value="content">
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
      </Tabs> */}
    </Stack>
  );
};

export default KidsVideos;
