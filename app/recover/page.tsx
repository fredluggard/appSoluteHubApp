"use client";

import { Button, Stack, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import styles from "./recover.module.css";
import AppSoluteLogo from "@/components/logo";
import Image from "next/image";
import MobileNavbar from "@/components/navbar/mobileNavbar";
import MobileFooter from "@/components/footer/mobileFooter";

const RecoverPass = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleRecover = async () => {
    if (input !== "") {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/users/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: input,
            }),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Error ${response.status}:`, errorMessage);
          throw new Error(`Network response was not ok: ${errorMessage}`);
        }

        const data = await response.json();
        setSuccess(true);
        setInput("");
        setError("");
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in your email");
    }
  };

  return (
    <Stack className={styles.recoverContainer}>
      <MobileNavbar />
      <Stack className={styles.recoverBox}>
        <Stack visibleFrom="md">
          <AppSoluteLogo color="#ffffff" logoColor="blue" />
        </Stack>
        <Stack w={"100%"}>
          <Title className={styles.title}>Recover Password</Title>
          <Stack className={styles.emailGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={input}
              required
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              className={styles.input}
            />
            {error && <Text className={styles.danger}>{error}</Text>}
          </Stack>
          <Button
            variant="filled"
            className={styles.recoverlogButton}
            onClick={handleRecover}
            disabled={loading}
          >
            {loading ? "Processing..." : "Recover"}
          </Button>
        </Stack>
      </Stack>
      <MobileFooter />

      {success && (
        <Stack className={styles.darkLayout} onClick={() => setSuccess(false)}>
          <Stack className={styles.recoverLink}>
            {/* <Stack className={styles.cancelBox}>
              <Image
                src={"/icons/cancel.svg"}
                alt="check"
                width={30}
                height={30}
                className={styles.cancel}
              />
            </Stack> */}
            <Image
              src={"/icons/check.svg"}
              alt="check"
              width={50}
              height={50}
              className={styles.check}
            />
            <Title className={styles.successTitle}>
              Password Reset Link Sent
            </Title>
            <Text className={styles.successText}>
              Kindly proceed to your email and click on the provided link to
              reset your password.
            </Text>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default RecoverPass;
