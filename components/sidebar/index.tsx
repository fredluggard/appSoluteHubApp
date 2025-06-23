"use client";

import { Button, Stack, Text } from "@mantine/core";
import React from "react";
import styles from "./side.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";
import Cookies from "js-cookie";

const SideBar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const logOut = async (): Promise<void> => {
    const token = Cookies.get("token");
    console.log("Logging out with token:", token);
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      console.log("Logout response:", data);
      dispatch(clearUser());
      Cookies.remove("token");
      Cookies.remove("userId");

      if (!response.ok) {
        throw new Error(
          `Logout failed: ${response.status} ${response.statusText}`
        );
      }

      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error(
        "Failed to log out:",
        error instanceof Error ? error.message : error
      );
    }
  };

  return (
    <Stack visibleFrom="md" className={styles.sideContainer}>
      <Stack className={styles.sideTop}>
        <AppSoluteLogo color="#ffffff" logoColor="white" />

        <Link href="/dashboard" className={styles.sideLink}>
          <Image
            src={
              pathname === "/dashboard" ? "/icons/dash.svg" : "/icons/dash2.svg"
            }
            alt="Dashboard"
            width={25}
            height={25}
            className={styles.sideImage}
          />
          <Text
            className={`${
              pathname === "/dashboard" ? styles.active : styles.sideText
            }`}
          >
            Dashboard
          </Text>
        </Link>

        <Link
          href="/dashboard/tasks"
          className={`${styles.sideLink} ${
            pathname === "/dashboard/tasks" ? styles.active : ""
          }`}
        >
          <Image
            src={
              pathname === "/dashboard/tasks"
                ? "/icons/task.svg"
                : "/icons/task2.svg"
            }
            alt="tasks"
            width={25}
            height={25}
            className={styles.sideImage}
          />
          <Text className={styles.sideText}>Tasks</Text>
        </Link>

        <Link
          href="/dashboard/settings"
          className={`${styles.sideLink} ${
            pathname === "/dashboard/settings" ? styles.active : ""
          }`}
        >
          <Image
            src={"/icons/setting.svg"}
            alt="settings"
            width={25}
            height={25}
            className={styles.sideImage}
          />
          <Text className={styles.sideText}>Settings</Text>
        </Link>
      </Stack>

      <Button variant="subtle" color="#ffffff" w={"80%"} onClick={logOut}>
        <Image src={"/icons/logout.svg"} alt="Logout" width={30} height={30} />
        <Text className={styles.sideText}>Logout</Text>
      </Button>
    </Stack>
  );
};

export default SideBar;
