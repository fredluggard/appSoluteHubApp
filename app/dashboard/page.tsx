"use client";

import { Box, Flex, Loader, Progress, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./dash.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

const Dashboard = () => {
  const [blog, setBlog] = useState<
    | {
        id?: string;
        imageUrl: string;
        title: string;
        description?: string;
        contributor?: string;
        category?: string;
        authorId?: string;
        updatedAt?: string;
        author?: {
          email?: string;
          fullName?: string;
          id?: string;
        };
      }[]
    | null
  >(null);

  const [tasks, setTasks] = useState<any[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (token && userId) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userId", userId, { expires: 7 });

      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${url}/api/v1/posts/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setBlog(data?.data || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${url}/api/v1/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }
    };

    fetchTasks();
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) return;
      setLoading(true);

      try {
        const response = await fetch(`${url}/api/v1/userPage/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data?.data || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, userId]);

  return (
    <Stack className={styles.dashContainer}>
      {loading ? (
        <Stack className={styles.innerBox} justify="center" align="center">
          <Loader color="blue" size="lg" />
        </Stack>
      ) : (
        <Stack className={styles.innerBox}>
          <Flex className={styles.topFlex}>
            <Stack className={styles.topStack}>
              <Image
                src={"/images/userProfile.png"}
                alt="user profile"
                width={50}
                height={50}
                className={styles.userImg}
              />
              <Box bg={"orange"} className={styles.cameraBox}>
                <Image
                  src={"/icons/camera.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.cameraIcon}
                />
              </Box>
            </Stack>

            <Stack className={styles.downStack}>
              <Title className={styles.userName}>{user?.fullName}</Title>
              <Stack className={styles.progressBox}>
                <Progress w={"90%"} color="#f28520" value={30} />
                <Text className={styles.completed}>158/500</Text>
              </Stack>
              <Text className={styles.morePoints}>
                Earn more 332 more points to bypass 50 people
              </Text>
            </Stack>
          </Flex>

          <Flex className={styles.pointsBox}>
            <Flex className={styles.pointsFlex}>
              <Stack className={styles.pointStack}>
                <Text className={styles.points}>{user?.totalScore}</Text>
                <Text className={styles.pointsTotal}>Total Points</Text>
              </Stack>
              <Image
                src={"/icons/dashStar.svg"}
                alt=""
                width={50}
                height={50}
                className={styles.pointImg}
              />
            </Flex>

            <Flex className={styles.pointsFlex}>
              <Stack className={styles.pointStack}>
                <Text className={styles.points}>
                  {tasks ? tasks.length : "Loading"}
                </Text>
                <Text className={styles.pointsTotal}>Total Tasks</Text>
              </Stack>
              <Image
                src={"/icons/dashTask.svg"}
                alt=""
                width={50}
                height={50}
                className={styles.pointImg}
              />
            </Flex>
          </Flex>

          <Flex className={styles.availableBox}>
            <Stack className={styles.pointStack}>
              <Text className={styles.points}>{tasks?.length}</Text>
              <Text className={styles.pointsTotal}>Tasks Available</Text>
            </Stack>

            <Image
              src={"/icons/dashArrow.svg"}
              alt=""
              width={50}
              height={50}
              className={styles.pointImg}
              onClick={() => router.push("/dashboard/tasks")}
            />
          </Flex>

          <Stack className={styles.ourBlogBox}>
            <Title className={styles.blogTitle}>Check our blog articles</Title>
            <Stack className={styles.blogStack}>
              {blog?.slice(0, 3).map((item, i) => (
                <Flex
                  key={i}
                  className={styles.blogFlex}
                  onClick={() => router.push(`/blog/${item.id}`)}
                >
                  {item.imageUrl && (
                    <Image
                      src={
                        item.imageUrl ? item.imageUrl : "/images/dashBlog.png"
                      }
                      alt=""
                      width={50}
                      height={50}
                      className={styles.blogImg}
                    />
                  )}
                  <Stack className={styles.blogBox}>
                    <p className={styles.blogText}>{item.title}</p>
                    <span className={styles.blogDate}>
                      {new Date(item?.updatedAt || "").toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </Stack>
                </Flex>
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Dashboard;
