"use client";

import { Flex, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./moreBlog.module.css";
import LinkButton from "../button";
import { useRouter } from "next/navigation";

const MoreBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const moreBlogs = [
    {
      id: "1",
      tag: "R & D",
      title: "Explore our Research and Development center",
      writer: "Uche",
      src: "/images/exploreCard.png",
      url: "/",
    },
    {
      id: "2",
      tag: "MEDIA",
      title: "Explore AppSolute media  for our Educational vidoes",
      writer: "Sochima",
      src: "/images/hero2.png",
      url: "/",
    },
    {
      id: "3",
      tag: "KIDS",
      title: "Explore our AppSolute kids section",
      writer: "Fredrick",
      src: "/images/hero3.png",
      url: "/",
    },
  ];

  const router = useRouter();
  const handleClick = (url: string) => {
    // router.push(url);
    router.push(`/blog/${url}`);
  };

  const date = new Date().toDateString();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <Stack className={styles.wrapper}>
      <Stack className={styles.blogTitle}>
        <Title className={styles.blog}>From Our Blog</Title>
      </Stack>
      <Flex className={styles.moreBlog}>
        {moreBlogs.map((item, index) => (
          <Stack
            className={styles.content}
            key={index}
            onClick={() => handleClick(item.id)}
          >
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
        <LinkButton url="/blog" text="Read More &#62;" />
      </Stack>
    </Stack>
  );
};

export default MoreBlog;
