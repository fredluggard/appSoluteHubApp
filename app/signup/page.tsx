"use client";

import AppSoluteLogo from "@/components/logo";
import {
  Box,
  Button,
  Divider,
  Flex,
  Notification,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./signup.module.css";
import Link from "next/link";
import MobileNavbar from "@/components/navbar/mobileNavbar";
import MobileFooter from "@/components/footer/mobileFooter";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(true);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleGoogle = () => {
    window.location.href = "https://appsolute-api-1.onrender.com/auth/google";
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      setSent(false);
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setShow(true);
      setSuccess(true);
      setLoading(false);
    }
  };

  const xIcon = <IconX size={20} />;

  return (
    <Stack className={styles.userContainer}>
      <MobileNavbar />
      {sent ? (
        <Flex className={styles.signUpContainer}>
          <Stack className={styles.signUpLeft}>
            <Stack visibleFrom="md">
              <AppSoluteLogo color="#ffffff" logoColor="blue" />
            </Stack>
            <Stack className={styles.signUpBox}>
              <Title className={styles.title}>Sign Up</Title>
              <Button className={styles.upgoogleButton} onClick={handleGoogle}>
                <Image
                  src={"/icons/google_Icon.svg"}
                  alt="google icon"
                  width={25}
                  height={25}
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
                    className={styles.input3}
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
              </Stack>

              {error && <Text c="red">{error}</Text>}

              <Button
                variant="filled"
                className={styles.signuplogButton}
                onClick={handleSignUp}
              >
                {loading ? "Processing..." : "Sign up"}
              </Button>

              <Flex className={styles.signBox}>
                <Text className={styles.signText}>
                  Already have an account?
                </Text>
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
      ) : (
        <Stack className={styles.darkLayout}>
          <Stack className={styles.recoverLink}>
            <Image
              src={"/icons/check.svg"}
              alt="check"
              width={50}
              height={50}
              className={styles.check}
            />
            <Title className={styles.successTitle}>
              Verification Link Sent
            </Title>
            <Text className={styles.successText}>
              Kindly proceed to your email and click on the provided link to
              verify your email.
            </Text>
          </Stack>
        </Stack>
      )}

      <Box pos={"absolute"} bottom={10} right={0}>
        {show && success && (
          <Notification
            icon={xIcon}
            color="red"
            title="Oops! Something went wrong"
            onClick={() => setShow(false)}
          >
            Please try again
          </Notification>
        )}
      </Box>

      <MobileFooter />
    </Stack>
  );
};

export default SignUp;
