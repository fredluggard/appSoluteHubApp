"use client";

import { Flex, Popover, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./pos.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/userSlice";
import LoadingBar from "@/app/admin/loading";

export interface Author {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
}

export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  authorId: string;
  contributors: any[];
  editorRole: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = useSelector(getUserToken);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = process.env.NEXT_PUBLIC_URL;

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/posts`);
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePosts = async (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    try {
      const response = await fetch(`${baseUrl}/api/v1/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Post deleted:", data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      getPosts();
    }
  };

  const goToPost = (postId: string) => {
    router.push(`/admin/posts/edit-post?id=${postId}`);
  };

  const rows = posts?.map((post) => (
    <tr key={post.id} className={styles.tableRow}>
      <th className={styles.headCheck}>
        <input type="checkbox" className={styles.headCheckBox} />
      </th>
      <td className={styles.headAuthor}>
        <Flex className={styles.authorRow}>
          <Image
            src={post.imageUrl}
            alt="author"
            width={50}
            height={50}
            className={styles.authorImg}
          />
          <Stack gap={0} className={styles.authorStack}>
            <span className={styles.authorName}>{post.author.fullName}</span>
            <span className={styles.role}>{post.editorRole}</span>
          </Stack>
        </Flex>
      </td>
      <td className={styles.rowTitle}>{post.title}</td>
      <td className={styles.headActions}>
        <Flex className={styles.actionRow}>
          <Image
            src={"/icons/pen.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
            onClick={() => goToPost(post.id)}
          />
          <Image
            src={"/icons/bin.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
            onClick={() => deletePosts(post.id)}
          />
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Image
                src={"/icons/share.svg"}
                alt=""
                width={20}
                height={20}
                className={styles.iconImg}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Flex gap={10} className={styles.shareIcons}>
                  <FacebookShareButton url={`${url}/blog/${post.id}`}>
                    <FacebookIcon size={25} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={`${url}/blog/${post.id}`}>
                    <TwitterIcon size={25} round />
                  </TwitterShareButton>
                  <TelegramShareButton url={`${url}/blog/${post.id}`}>
                    <TelegramIcon size={25} round />
                  </TelegramShareButton>
                  <WhatsappShareButton url={`${url}/blog/${post.id}`}>
                    <WhatsappIcon size={25} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={`${url}/blog/${post.id}`}>
                    <LinkedinIcon size={25} round />
                  </LinkedinShareButton>
                </Flex>
              </Stack>
            </Popover.Dropdown>
          </Popover>
          <button
            className={styles.editBtn}
            onClick={() => router.push(`${url}/blog/${post.id}`)}
          >
            View
          </button>
        </Flex>
      </td>
    </tr>
  ));

  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <LoadingBar />
  ) : (
    <Stack>
      <thead>
        <tr className={styles.tableHeader}>
          <th className={styles.headCheck}>
            <input type="checkbox" className={styles.headCheckBox} />
          </th>
          <th className={styles.headAuthor}>Author</th>
          <th className={styles.headTitle}>Post Title</th>
          <th className={styles.headActions}>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Stack>
  );
};

export default PostsList;
