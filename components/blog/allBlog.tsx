"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./allBlog.module.css";
import Link from "next/link";
import Image from "next/image";

const AllBlog = () => {
  const [blog, setBlog] = useState<
    {
      id?: string;
      imageUrl: string;
      title: string;
      description?: string;
      contributor?: string;
      category?: string;
      authorId?: string;
      author?: {
        email?: string;
        fullName?: string;
        id?: string;
      };
    }[]
  >();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${url}/api/v1/posts/`);
        const data = await response.json();
        setBlog(data.data || null);
      } catch (error) {
        console.error("Error fetching recent blog:", error);
      }
    };

    fetchBlog();
  }, []);

  return blog ? (
    <Stack className={styles.allBlog}>
      <Title className={styles.title}>All Blog Post</Title>
      <Flex className={styles.blogPosts}>
        {blog.slice(0, 9).map((post, index) => (
          <Link
            href={`/blog/${post.id}`}
            key={index}
            className={styles.leftPost}
          >
            <Image
              src={post.imageUrl || "/default-image.jpg"}
              alt="Post image"
              width={300}
              height={200}
              priority
              className={styles.leftImage}
            />
            <Text className={styles.postWriter}>
              {post?.author?.fullName || "Unknown Author"} | 1 Jan 2023
            </Text>
            <Flex className={styles.titleFlex}>
              <Title className={styles.postTitle} lineClamp={2}>
                {post.title}
              </Title>
              <Image
                src={"/icons/arrow.svg"}
                alt="arrow link"
                width={30}
                height={30}
                className={styles.arrow}
              />
            </Flex>
            <Text className={styles.text} lineClamp={2}>
              {post.description || "No description available."}
            </Text>
            <Flex className={styles.tagGroup}>
              <li className={styles.tag}>Design</li>
              <li className={styles.tag2}>Research</li>
              <li className={styles.tag3}>Presentation</li>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Stack>
  ) : null;
};

export default AllBlog;
