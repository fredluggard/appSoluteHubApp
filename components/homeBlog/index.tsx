"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./homeBlog.module.css";
import Image from "next/image";
import LinkButton from "../button";
import { useRouter } from "next/navigation";

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const blogPosts = [
    {
      id: "1",
      title: "Innovation Pipeline",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e",
      image: "/icons/pipeline.svg",
      url: "/",
    },
    {
      id: "2",
      title: "Emerging Technologies",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      image: "/icons/rocket.svg",
      url: "/",
    },
    {
      id: "3",
      title: "Market Insights",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e",
      image: "/icons/insight.svg",
      url: "/",
    },
    {
      id: "4",
      title: "Technology Advancement",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      image: "/icons/robotics.svg",
      url: "/",
    },
  ];

  const router = useRouter();
  const handleClick = (url: string) => {
    // router.push(url);
    router.push(`/blog/${url}`);
  };

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
  }, [baseUrl]);

  return (
    <Flex className={styles.homeBlog}>
      <Stack hiddenFrom="md" mt={15}>
        <LinkButton url="/blog" text="Learn More &#62;" />
      </Stack>
      <Stack className={styles.leftBox}>
        {blogPosts.map((post) => {
          if (parseInt(post.id) % 2 === 0) {
            return (
              <Stack
                gap={5}
                key={post.id}
                className={styles.blogPost1}
                onClick={() => handleClick(post.id)}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={85}
                  height={85}
                />
                <Text className={styles.postTitle}>{post.title}</Text>
                <Text className={styles.postText}>{post.description}</Text>
              </Stack>
            );
          } else if (post.id === "1") {
            return (
              <Stack key={post.id} className={styles.blogAdjust1}>
                <Stack
                  gap={5}
                  key={post.id}
                  className={styles.blogPost2}
                  onClick={() => handleClick(post.id)}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={85}
                    height={85}
                  />
                  <Text className={styles.postTitle}>{post.title}</Text>
                  <Text className={styles.postText}>{post.description}</Text>
                </Stack>
              </Stack>
            );
          } else {
            return (
              <Stack key={post.id} className={styles.blogAdjust2}>
                <Stack
                  gap={5}
                  key={post.id}
                  className={styles.blogPost2}
                  onClick={() => handleClick(post.id)}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={85}
                    height={85}
                  />
                  <Text className={styles.postTitle}>{post.title}</Text>
                  <Text className={styles.postText}>{post.description}</Text>
                </Stack>
              </Stack>
            );
          }
        })}
      </Stack>
      <Stack className={styles.rightBox}>
        <Title className={styles.title}>Our Research and Development</Title>
        <Text className={styles.text}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </Text>
        <Stack visibleFrom="md">
          <LinkButton url="/blog" text="Learn More &#62;" />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default HomeBlog;
