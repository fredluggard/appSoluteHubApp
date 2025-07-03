"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./recent.module.css";
import Image from "next/image";
import Link from "next/link";

interface PostTag {
  id: string;
  postId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
}

const RecentBlog = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [tags, setTags] = useState<PostTag[]>([]);
  const [tags2, setTags2] = useState<PostTag[]>([]);
  const [tags3, setTags3] = useState<PostTag[]>([]);
  const [tags4, setTags4] = useState<PostTag[]>([]);
  const [blog, setBlog] = useState<{
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
    createdAt?: string;
  } | null>(null);

  const [blog2, setBlog2] = useState<{
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
    createdAt?: string;
  } | null>(null);

  const [blog4, setBlog4] = useState<{
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
    createdAt?: string;
  } | null>(null);
  const [blog3, setBlog3] = useState<{
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
    createdAt?: string;
  } | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${url}/api/v1/posts/`);
        const data = await response.json();
        console.log("Fetched recent blogs:", data);
        setBlog(data.data?.[0] || null);
        setBlog2(data.data?.[1] || null);
        setBlog3(data.data?.[2] || null);
        setBlog4(data.data?.[3] || null);
        setTags(data.data?.[0]?.tags || []);
        setTags2(data.data?.[1]?.tags || []);
        setTags3(data.data?.[2]?.tags || []);
        setTags4(data.data?.[3]?.tags || []);
      } catch (error) {
        console.error("Error fetching recent blog:", error);
      }
    };

    fetchBlog();
  }, []);

  return blog ? (
    <Stack className={styles.recentContainer}>
      <Title className={styles.title}>Recent Blog Post</Title>
      <Flex className={styles.flex}>
        <Link href={`/blog/${blog?.id}`} className={styles.leftPost}>
          <Image
            src={blog.imageUrl || "/default-image.jpg"}
            alt="Post image"
            width={300}
            height={200}
            priority
            className={styles.leftImage}
          />
          <Text className={styles.postWriter}>
            {blog?.author?.fullName || "Unknown Author"} |{" "}
            {new Date(blog?.createdAt || "").toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Flex className={styles.titleFlex}>
            <Title className={styles.postTitle}>{blog.title}</Title>
            <Image
              src={"/icons/arrow.svg"}
              alt="arrow link"
              width={30}
              height={30}
              className={styles.arrow}
            />
          </Flex>
          <Text className={styles.text} lineClamp={3}>
            {blog.description || "No description available."}
          </Text>
          <Flex className={styles.tagGroup}>
            <li className={styles.tag}>{tags[0]?.tag.name}</li>
            <li className={styles.tag2}>{tags[1]?.tag.name}</li>
            <li className={styles.tag3}>{tags[2]?.tag.name}</li>
          </Flex>
        </Link>

        <Stack className={styles.rightPost}>
          <Link href={`/blog/${blog2?.id}`} className={styles.rightFlex}>
            <Image
              src={blog2?.imageUrl || "/default-image.jpg"}
              alt="post image"
              width={300}
              height={300}
              priority
              className={styles.rightImage}
            />
            <Stack className={styles.rightBox}>
              <Text className={styles.postWriter}>
                {blog2?.author?.fullName || "Unknown Author"} |{" "}
                {new Date(blog?.createdAt || "").toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
              <Title className={styles.rightTitle}>{blog2?.title}</Title>
              <Text className={styles.rightText} lineClamp={3}>
                {blog2?.description || "No description available."}
              </Text>
              <Flex className={styles.tagGroup}>
                <li className={styles.tag}>{tags2[0]?.tag.name}</li>
                <li className={styles.tag2}>{tags2[1]?.tag.name}</li>
                <li className={styles.tag3}>{tags2[2]?.tag.name}</li>
              </Flex>
            </Stack>
          </Link>

          <Link href={`/blog/${blog3?.id}`} className={styles.rightFlex}>
            <Image
              src={blog3?.imageUrl || "/default-image.jpg"}
              alt="post image"
              width={300}
              height={200}
              priority
              className={styles.rightImage}
            />
            <Stack className={styles.rightBox}>
              <Text className={styles.postWriter}>
                {blog3?.author?.fullName || "Unknown Author"} |{" "}
                {new Date(blog?.createdAt || "").toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
              <Title className={styles.rightTitle}>{blog3?.title}</Title>
              <Text className={styles.rightText} lineClamp={3}>
                {blog3?.description || "No description available."}
              </Text>
              <Flex className={styles.tagGroup}>
                <li className={styles.tag}>{tags3[0]?.tag.name}</li>
                <li className={styles.tag2}>{tags3[1]?.tag.name}</li>
                <li className={styles.tag3}>{tags3[2]?.tag.name}</li>
              </Flex>
            </Stack>
          </Link>
        </Stack>
      </Flex>

      <Link href={`/blog/${blog4?.id}`} className={styles.bottomFlex}>
        <Image
          src={blog4?.imageUrl || "/default-image.jpg"}
          alt="post image"
          width={300}
          height={200}
          priority
          className={styles.rightImage}
        />
        <Stack className={styles.rightBox}>
          <Text className={styles.postWriter}>
            {blog4?.author?.fullName || "Unknown Author"} |{" "}
            {new Date(blog?.createdAt || "").toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Title className={styles.rightTitle}>{blog4?.title}</Title>
          <Text className={styles.rightText} lineClamp={5}>
            {blog4?.description || "No description available."}
          </Text>
          <Flex className={styles.tagGroup}>
            <li className={styles.tag}>{tags4[0]?.tag.name}</li>
            <li className={styles.tag2}>{tags4[1]?.tag.name}</li>
            <li className={styles.tag3}>{tags4[2]?.tag.name}</li>
          </Flex>
        </Stack>
      </Link>
    </Stack>
  ) : null;
};

export default RecentBlog;
