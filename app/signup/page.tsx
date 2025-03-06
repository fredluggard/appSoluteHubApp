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
import styles from "./signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authData, setAuthData] = useState(null);
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
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleSignUp = () => {
    fetch(`${baseUrl}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: name,
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
        setAuthData(data);
        router.push("/login");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Flex className={styles.signUpContainer}>
      <Stack className={styles.signUpLeft}>
        <AppSoluteLogo color="#ffffff" />
        <Stack className={styles.signUpBox}>
          <Title className={styles.title}>Sign Up</Title>
          <Button className={styles.googleButton} onClick={handleGoogle}>
            <Image
              src={"/icons/google_Icon.svg"}
              alt="google icon"
              width={30}
              height={30}
              className={styles.googleIcon}
            />
            <Text className={styles.googleText}>Sign Up with Google</Text>
          </Button>

          <Stack className={styles.divider}>
            <Divider my="md" />
            <Text className={styles.dividerText}>Or</Text>
          </Stack>

          <Stack className={styles.inputGroup}>
            <Stack className={styles.emailGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Stack>

            <Stack className={styles.emailGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className={styles.input2}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>

            <Flex className={styles.remBox}>
              <Checkbox
                label="Remember me"
                color="#37459C"
                className={styles.rem}
              />
              <Link href={"#"} className={styles.forget}>
                Forget Password?
              </Link>
            </Flex>
          </Stack>

          <Button
            variant="filled"
            className={styles.logButton}
            onClick={handleSignUp}
          >
            Sign up
          </Button>

          <Flex className={styles.signBox}>
            <Text className={styles.signText}>Already have an account?</Text>
            <Link href={"/login"} className={styles.signLink}>
              login
            </Link>
          </Flex>
        </Stack>
      </Stack>
      <Stack className={styles.signUpRight}>
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

export default SignUp;
