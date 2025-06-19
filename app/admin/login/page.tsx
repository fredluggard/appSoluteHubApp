"use client";

import AppSoluteLogo from "@/components/logo";
import { Button, Checkbox, Flex, Stack, Text } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { setUser } from "@/store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      dispatch(
        setUser({
          message: data.message,
          token: data.token,
          user: data.user,
        })
      );
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("userId", data.user.id, { expires: 7 });
      router.push("/dashboard");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className={styles.container}>
      <Flex className={styles.logFlex}>
        <AppSoluteLogo color="#34449C" logoColor="blue" />
        <Image src={"/icons/blogImage.svg"} alt="" width={120} height={120} />
      </Flex>
      <Stack className={styles.logBox}>
        <Text className={styles.signText}>Sign in to start a session</Text>
        <Stack className={styles.signBox}>
          <Stack className={styles.inputGroup}>
            <Stack className={styles.emailGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </Stack>

            <Stack className={styles.emailGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input2}
              />
            </Stack>

            <Flex className={styles.remBox}>
              <Checkbox
                label="Remember me"
                color="#37459C"
                className={styles.rem}
              />
              <Link href={"/recover"} className={styles.forget}>
                Forget Password?
              </Link>
            </Flex>

            <Button
              variant="filled"
              className={styles.signinlogButton}
              onClick={handleLogin}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
