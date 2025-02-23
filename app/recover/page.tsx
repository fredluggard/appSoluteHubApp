"use client";

import { Button, Stack, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import styles from "./recover.module.css";
import AppSoluteLogo from "@/components/logo";
import Image from "next/image";

const RecoverPass = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleRecover = () => {
    setSuccess(true);
    if (input !== "") {
      fetch(`${baseUrl}/api/v1/users/forgot-password`, {
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
          console.log(data);
          setSuccess(true);
          setInput("");
          setError("");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      setError("Please fill in your email");
    }
  };

  return (
    <Stack className={styles.recoverContainer}>
      <Stack className={styles.recoverBox}>
        <AppSoluteLogo color="#ffffff" />
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
            className={styles.logButton}
            onClick={handleRecover}
          >
            Recover
          </Button>
        </Stack>
      </Stack>

      {success && (
        <Stack className={styles.darkLayout}>
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
