"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./homeBlog.module.css";
import Image from "next/image";
import LinkButton from "../button";
import Link from "next/link";
import { url } from "inspector";
import { useRouter } from "next/navigation";

const HomeBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Lorem ipsum dolor",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e",
      image: "/images/blogImg.png",
      url: "/",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur ",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      image: "/images/blogImg.png",
      url: "/",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e",
      image: "/images/blogImg.png",
      url: "/",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur ",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      image: "/images/blogImg.png",
      url: "/",
    },
  ];

  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <Flex className={styles.homeBlog}>
      <Stack className={styles.leftBox}>
        {blogPosts.map((post, index) => {
          if (post.id % 2 === 0) {
            return (
              <Stack
                gap={5}
                key={post.id}
                className={styles.blogPost1}
                onClick={() => handleClick(post.url)}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={85}
                  height={85}
                />
                <Link href={"#"} className={styles.postTitle}>
                  {post.title}
                </Link>
                <Text className={styles.postText}>{post.description}</Text>
              </Stack>
            );
          } else if (post.id === 1) {
            return (
              <Stack key={post.id} className={styles.blogAdjust1}>
                <Stack
                  gap={5}
                  key={post.id}
                  className={styles.blogPost2}
                  onClick={() => handleClick(post.url)}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={85}
                    height={85}
                  />
                  <Title order={3}>{post.title}</Title>
                  <Text>{post.description}</Text>
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
                  onClick={() => handleClick(post.url)}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={85}
                    height={85}
                  />
                  <Title order={3}>{post.title}</Title>
                  <Text>{post.description}</Text>
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
        <LinkButton url="/" text="Learn More &#62;" />
      </Stack>
    </Flex>
  );
};

export default HomeBlog;
