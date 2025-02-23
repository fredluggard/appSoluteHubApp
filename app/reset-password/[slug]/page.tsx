"use client";

import { Button, Stack, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import styles from "./resetCode.module.css";
import AppSoluteLogo from "@/components/logo";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ResetCode = () => {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSuccess = () => {
    router.push("/login");
  };

  const handleReset = () => {
    if (input !== "" && input === input2) {
      fetch(`${baseUrl}/api/v1/users/reset-password`, {
        method: "POST",
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
          setInput2("");
          setError("");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else if (input === "" && input2 === "") {
      setError("Password cannot be empty");
    } else {
      setError("Please make sure your passwords match");
    }
  };

  return (
    <Stack className={styles.recoverContainer}>
      <Stack className={styles.recoverBox}>
        <AppSoluteLogo color="#ffffff" />
        <Stack w={"100%"}>
          <Title className={styles.title}>Reset Password</Title>
          <Stack className={styles.emailGroup}>
            <label htmlFor="password" className={styles.label}>
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={input}
              required
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className={styles.input}
            />
          </Stack>
          <Stack className={styles.emailGroup}>
            <label htmlFor="password2" className={styles.label}>
              Confirm New Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Password"
              value={input2}
              required
              onChange={(e) => {
                setInput2(e.target.value);
                setError("");
              }}
              className={styles.input}
            />
            {error && <Text className={styles.danger}>{error}</Text>}
          </Stack>
          <Button
            variant="filled"
            className={styles.logButton}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Stack>
      </Stack>

      {success && (
        <Stack className={styles.darkLayout}>
          <Stack className={styles.recoverLink}>
            <Stack className={styles.cancelBox}>
              <Image
                src={"/icons/cancel.svg"}
                alt="check"
                width={30}
                height={30}
                className={styles.cancel}
                onClick={handleSuccess}
              />
            </Stack>
            <Image
              src={"/icons/check.svg"}
              alt="check"
              width={50}
              height={50}
              className={styles.check}
            />
            <Title className={styles.successTitle}>
              Password Reset Successful!
            </Title>
            <Text className={styles.successText}>
              Password successfully changed. Login to your account now with your
              new password
            </Text>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ResetCode;
