"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./homeBlog.module.css";
import Image from "next/image";
import LinkButton from "../button";

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const blogPosts = [
    {
      id: "1",
      title: "Innovation Pipeline",
      description:
        "Got an idea? We'll help it grow. Our pipeline takes raw concepts, polishes them, and transforms them into innovations that actually make a difference.",
      image: "/icons/pipeline.svg",
      url: "/",
    },
    {
      id: "2",
      title: "Emerging Technologies",
      description:
        "The future doesn't wait, and neither do we. We explore, test, and deploy next-gen technologies that change how we live, work, and play.",
      image: "/icons/rocket.svg",
      url: "/",
    },
    {
      id: "3",
      title: "Market Insights",
      description:
        "What's trending? What's next? We're always digging into the data so you can stay informed, stay ready, and stay ahead.",
      image: "/icons/insight.svg",
      url: "/",
    },
    {
      id: "4",
      title: "Technology Advancement",
      description:
        "Great tech doesn't stop evolving, and neither do we. We upgrade, advance, and rethink what's possible with every breakthrough we make.",
      image: "/icons/robotics.svg",
      url: "/",
    },
  ];

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
              <Stack gap={5} key={post.id} className={styles.blogPost1}>
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
                <Stack gap={5} key={post.id} className={styles.blogPost2}>
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
                <Stack gap={5} key={post.id} className={styles.blogPost2}>
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
          We don&apos;t just research, we reinvent. Our R&D team is always
          cooking up something fresh, from emerging tech to smarter solutions
          that keep you ahead of the curve.
        </Text>
        <Stack visibleFrom="md">
          <LinkButton url="/research-development" text="Learn More &#62;" />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default HomeBlog;
