"use client";

import { Box, Flex, Loader, Progress, Stack, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import React, { useEffect, useState } from "react";
import styles from "./dash.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { getUser, setUser } from "@/store/userSlice";
import { useSelector } from "react-redux";

interface TaskProgress {
  completedTasks: number;
  totalTasks: number;
  progressPercent: number;
}

interface LeaderboardStatus {
  message: string;
  peopleToBypass: number;
  pointsToBypass: number;
}

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
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({
    completedTasks: 0,
    totalTasks: 0,
    progressPercent: 0,
  });
  const [leaderboardStatus, setLeaderboardStatus] = useState<LeaderboardStatus>(
    {
      message: "",
      peopleToBypass: 0,
      pointsToBypass: 0,
    }
  );
  const [progress, setProgress] = useState<number>(0);
  // const [user, setUser] = useState<any | null>(null);
  const user = useSelector(getUser);
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

    const fetchtaskDetails = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${url}/api/v1/tasks/task-progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTaskProgress({
          completedTasks: data.data.completedTasks || 0,
          totalTasks: data.data.totalTasks || 0,
          progressPercent: data.data.progressPercent || 0,
        });
        setProgress(data.data.progressPercent || 0);
      } catch (error) {
        console.error("Error fetching task details data:", error);
      }
    };

    const fetchStat = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${url}/api/v1/tasks/leaderboard-progress `,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        console.log("Stat data:", data);
        setLeaderboardStatus({
          message: data.data.message || "",
          peopleToBypass: data.data.peopleToBypass || 0,
          pointsToBypass: data.data.pointsToBypass || 0,
        });
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    fetchBlog();
    fetchtaskDetails();
    fetchStat();
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${url}/api/v1/tasks/undoneTasks/${userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched tasks:", data);
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
        setUser(data?.data);
        console.log(data);
        Cookies.set("role", data?.data.role, { expires: 7 });
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
                src={user?.profileImage ?? "/images/userProfile.png"}
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
                <Progress
                  w={"90%"}
                  color="#f28520"
                  value={typeof progress === "number" ? progress : 0}
                />
                <Text className={styles.completed}>
                  {taskProgress?.completedTasks}/{taskProgress?.totalTasks}
                </Text>
              </Stack>

              {leaderboardStatus?.peopleToBypass > 0 ? (
                <Text className={styles.morePoints}>
                  Earn more {leaderboardStatus?.pointsToBypass} points to bypass{" "}
                  {leaderboardStatus?.peopleToBypass} person&#40;s&#41;
                </Text>
              ) : (
                <Text className={styles.morePoints}>
                  {leaderboardStatus?.message ||
                    "Keep up the good work this month!"}
                </Text>
              )}
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
                  {taskProgress?.totalTasks || 0}
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
