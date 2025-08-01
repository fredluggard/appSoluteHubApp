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
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { setUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import MobileNavbar from "@/components/navbar/mobileNavbar";
import MobileFooter from "@/components/footer/mobileFooter";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleGoogle = async () => {
    window.location.href = "https://appsolutehub.com/auth/google";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
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
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("userId", data.user.id, { expires: 7 });
      Cookies.set("role", data.user.role, { expires: 7 });
      dispatch(setUser(data));
      const redirectTo = searchParams.get("redirectTo");
      if (redirectTo === "/") {
        router.push("/dashboard");
      } else {
        router.push(redirectTo || "/dashboard");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    if (!token || !userId) return;

    Cookies.set("token", token, { expires: 7 });
    Cookies.set("userId", userId ?? "", { expires: 7 });
    router.push("/dashboard");

    // const handleGoogleAuth = async () => {
    //   try {
    //     const response = await fetch(`${baseUrl}/api/v1/userPage/${userId}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }

    //     const data = await response.json();
    //     Cookies.set("token", data.token, { expires: 7 });
    //     Cookies.set("userId", data.user.id, { expires: 7 });
    //     Cookies.set("role", data.user.role, { expires: 7 });
    //     dispatch(setUser(data));
    //     router.push("/dashboard");
    //   } catch (error) {
    //     console.error("There was a problem with the fetch operation:", error);
    //     setError("Login failed. Please check your credentials and try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // handleGoogleAuth();
  }, [searchParams]);

  return (
    <Stack>
      <MobileNavbar />
      <Flex className={styles.loginContainer}>
        <Stack className={styles.loginLeft}>
          <Stack visibleFrom="md">
            <AppSoluteLogo color="#ffffff" logoColor="blue" />
          </Stack>
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

            {error && <Text c="red">{error}</Text>}

            <Button
              variant="filled"
              className={styles.signinlogButton}
              onClick={handleLogin}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Flex className={styles.signBox}>
              <Text className={styles.signText}>
                Don&apos;t have an account?
              </Text>
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
      <MobileFooter />
    </Stack>
  );
};

export default Login;
