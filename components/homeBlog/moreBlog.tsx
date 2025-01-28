import { Flex, Stack, Title } from "@mantine/core";
import React from "react";
import styles from "./moreBlog.module.css";
import LinkButton from "../button";

const MoreBlog = () => {
  const moreBlogs = [
    {
      tag: "R & D",
      title: "Explore our Research and Development center",
      writer: "Uche",
      src: "/images/exploreCard.png",
      url: "/",
    },
    {
      tag: "MEDIA",
      title: "Explore AppSolute media  for our Educational vidoes",
      writer: "Sochima",
      src: "/images/hero2.png",
      url: "/",
    },
    {
      tag: "KIDS",
      title: "Explore our AppSolute kids section",
      writer: "Fredrick",
      src: "/images/hero3.png",
      url: "/",
    },
  ];

  const date = new Date().toDateString();

  return (
    <Stack className={styles.wrapper}>
      <Stack className={styles.blogTitle}>
        <Title className={styles.blog}>From Our Blog</Title>
      </Stack>
      <Flex className={styles.moreBlog}>
        {moreBlogs.map((item) => (
          <Stack className={styles.content}>
            <Stack
              className={styles.slideContent}
              style={{ backgroundImage: `url(${item.src})` }}
            >
              <span className={styles.tag}>{item.tag}</span>
            </Stack>
            <Stack>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.writer}>
                By {item.writer} &#124; {date}
              </span>
            </Stack>
          </Stack>
        ))}
      </Flex>
      <Stack className={styles.readMore}>
        <LinkButton url="#" text="Read More &#62;" />
      </Stack>
    </Stack>
  );
};

export default MoreBlog;
