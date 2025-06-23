"use client";

import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./comment.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

export interface Comment {
  id: string;
  body: string;
  authorId: string;
  postId: string;
  createdAt: string;
  author: {
    fullName: string;
    profileImage: string;
  };
  numberOfLikes: number;
  countUnlike: number;
  unlikes: any[];
}

const Comments = ({ postId }: { postId: string }) => {
  const user = useSelector(getUser);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("token");

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetch(`${url}/api/v1/coments/${postId}`);
      const data = await response.json();
      console.log("Posts:", data);
      setComments(data.comments || null);
    } catch (error) {
      console.error("Error fetching recent blog:", error);
    }
  }, [url, postId]);

  const login = () => {
    router.push(`/login?redirectTo=/blog/${postId}`);
  };

  const postComment = async () => {
    if (input === "") {
      alert("Please write a comment");
    } else {
      try {
        const response = await fetch(`${url}/api/v1/coments/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: input }),
        });
        const data = await response.json();
        console.log(data);
        fetchBlog();
      } catch (error) {
        console.error("Error fetching comment data:", error);
      } finally {
        setInput("");
      }
    }
  };

  const likeComment = async (id: string) => {
    try {
      const response = await fetch(`${url}/api/v1/likes/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      fetchBlog();
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };

  const dislikeComment = async (id: string) => {
    try {
      const response = await fetch(`${url}/api/v1/likes/${id}/unlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      fetchBlog();
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };

  const formatCreatedAt = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes <= 1 ? "Just now" : `${diffMinutes} min ago`;
      }
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
    return created.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [reactions, setReactions] = useState<{
    [commentId: string]: { liked: boolean; disliked: boolean };
  }>({});

  const handleLike = (id: string) => {
    setReactions((prev) => {
      const current = prev[id] || { liked: false, disliked: false };
      return {
        ...prev,
        [id]: {
          liked: !current.liked,
          disliked: current.liked ? current.disliked : false,
        },
      };
    });
    likeComment(id);
  };

  const handleDislike = (id: string) => {
    setReactions((prev) => {
      const current = prev[id] || { liked: false, disliked: false };
      return {
        ...prev,
        [id]: {
          liked: current.disliked ? current.liked : false,
          disliked: !current.disliked,
        },
      };
    });
    dislikeComment(id);
  };

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return (
    <Stack className={styles.container}>
      <Stack className={styles.inputBox}>
        <textarea
          placeholder="Write a comment about this post"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />

        {user.email ? (
          <Button className={styles.btn} onClick={postComment}>
            Post Comment
          </Button>
        ) : (
          <Button className={styles.btn} onClick={login}>
            Login
          </Button>
        )}
      </Stack>

      <Title className={styles.title}>
        Comments &#40;{comments?.length}&#41;
      </Title>

      <Stack className={styles.commentStack}>
        {comments?.map((item, id) => {
          const reaction = reactions[item.id] || {
            liked: false,
            disliked: false,
          };

          const likeImage = reaction.liked
            ? "/icons/like.svg"
            : "/icons/like.svg";

          const dislikeImage = reaction.disliked
            ? "/icons/dislike2.svg"
            : "/icons/dislike.svg";

          return (
            <Flex key={id} className={styles.commentFlex}>
              <Stack className={styles.imageBox}>
                <Image
                  src={item?.author.profileImage}
                  alt="user image"
                  width={50}
                  height={50}
                  className={styles.image}
                />
              </Stack>

              <Stack className={styles.itemBox}>
                <Flex className={styles.authorBox}>
                  <Title className={styles.author}>
                    {item.author.fullName}
                  </Title>
                  <Text>•</Text>
                  <Text className={styles.create}>
                    {formatCreatedAt(item.createdAt)}
                  </Text>
                </Flex>

                <Text className={styles.bodyText}>{item.body}</Text>

                <Flex className={styles.reactionBox}>
                  <Flex className={styles.likeFlex}>
                    <Image
                      src={likeImage}
                      alt="Like icon"
                      width={18}
                      height={18}
                      className={styles.likeIcon}
                      onClick={() => handleLike(item.id)}
                    />

                    <Text className={styles.likeText}>
                      {item.numberOfLikes}
                    </Text>
                  </Flex>
                  <Flex className={styles.likeFlex}>
                    <Image
                      src={dislikeImage}
                      alt="Dislike icon"
                      width={18}
                      height={18}
                      className={styles.likeIcon}
                      onClick={() => handleDislike(item.id)}
                    />

                    <Text className={styles.likeText}>
                      {item.unlikes.length}
                    </Text>
                  </Flex>
                  <Flex className={styles.likeFlex}>
                    <Image
                      src={"/icons/delete.png"}
                      alt="Dislike icon"
                      width={18}
                      height={18}
                      className={styles.likeIcon}
                      onClick={() => handleDislike(item.id)}
                    />
                  </Flex>
                </Flex>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Comments;
