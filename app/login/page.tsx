"use client";

import AppSoluteLogo from "@/components/logo";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { setUser, getUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authData, setAuthData] = useState(null);
  const dispacth = useDispatch();
  const user = useSelector(getUser);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleGoogle = () => {
    fetch(`${baseUrl}/auth/google`, {
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
        setAuthData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLogin = () => {
    fetch(`${baseUrl}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispacth(setUser(data));
        console.log(data);
        console.log(user);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Flex className={styles.loginContainer}>
      <Stack className={styles.loginLeft}>
        <AppSoluteLogo color="#ffffff" />
        <Stack className={styles.loginBox}>
          <Title className={styles.title}>Login</Title>
          <Button className={styles.googleButton} onClick={handleGoogle}>
            <Image
              src={"/icons/google_Icon.svg"}
              alt="google icon"
              width={30}
              height={30}
              className={styles.googleIcon}
            />
            <Text className={styles.googleText}>Sign In with Google</Text>
          </Button>

          <Stack className={styles.divider}>
            <Divider my="md" />
            <Text className={styles.dividerText}>Or</Text>
          </Stack>

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
          </Stack>

          <Button
            variant="filled"
            className={styles.logButton}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Flex className={styles.signBox}>
            <Text className={styles.signText}>Don&apos;t have an account?</Text>
            <Link href={"/signup"} className={styles.signLink}>
              Sign Up
            </Link>
          </Flex>
        </Stack>
      </Stack>
      <Stack className={styles.loginRight}>
        <Image
          src={"/images/login.png"}
          alt="Robot and human shaking hands"
          width={300}
          height={300}
          className={styles.logImg}
        />
      </Stack>
    </Flex>
  );
};

export default Login;
