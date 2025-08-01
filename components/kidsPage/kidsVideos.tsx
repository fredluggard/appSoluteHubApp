"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./kidsVideos.module.css";
import CustomBtn from "../button/customBtn";
import { EducationalVideo } from "@/types/commonTypes";
import Link from "next/link";

const KidsVideos = () => {
  const [kidsContent, setKidsContent] = useState<EducationalVideo[]>([]);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchContent = async () => {
    try {
      const response = await fetch(`${url}/api/v1/contents/kidsVideos `);
      const data = await response.json();
      setKidsContent(data?.data || []);
    } catch (error) {
      console.error("Error fetching content data:", error);
    }
  };
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <Stack className={styles.mediaContainer}>
      <Stack className={styles.mediaStack}>
        <Title className={styles.mediaTitle}>
          Our videos teaches your kids about modern Tech
        </Title>
        <Text className={styles.mediaText}>
          We teach kids about tech, one fun video at a time. From AI to
          software, our videos break down big tech ideas into bite-sized fun for
          curious young minds.
        </Text>
      </Stack>

      <Stack className={styles.week}>
        <Flex className={styles.taskFlex}>
          {kidsContent?.slice(0, 9).map((task, index) => (
            <Stack key={index} className={styles.taskBox}>
              <Link
                href={task.url}
                className={styles.imageBox}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={task.thumbnail}
                  alt="task image"
                  width={240}
                  height={150}
                  className={styles.taskImg}
                />
              </Link>
              <Link
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.taskTitle}
              >
                {task.title}
              </Link>
            </Stack>
          ))}
        </Flex>

        <Stack mt={50} justify="center">
          <CustomBtn
            url="https://www.youtube.com/@appsolute_kids"
            text="See more videos"
            bgColor="#ff1709"
          />
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
