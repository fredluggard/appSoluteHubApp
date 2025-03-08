"use client";

import {
  Alert,
  Button,
  Flex,
  Notification,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import styles from "./joinUs.module.css";

const JoinUs = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleNotification = () => {
    setSuccess(true);
    setError("");
    setTimeout(() => {
      setSuccess(false);
    }, 10000);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubcribe = () => {
    if (email !== "" && validateEmail(email)) {
      setError("");
      fetch(`${baseUrl}/api/v1/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          handleNotification();
          setEmail("");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      setError("Please enter a valid email address");
    }
  };

  const icon = <IconCheck size={20} />;
  const fail = <IconX size={20} />;

  return (
    <Stack className={styles.joinUs}>
      <Title className={styles.title}>
        Join us today to be a part of our story
      </Title>
      <Text className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt.
      </Text>
      <Flex className={styles.inputGroup}>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="subscribe"
          id="subscribe"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <Button className={styles.button} onClick={handleSubcribe}>
          Subscribe
        </Button>
      </Flex>

      {error && <Text c={"red"}>{error}</Text>}

      {/* {error && (
        <Notification
          className={styles.alert}
          icon={fail}
          title="Failed"
          color="red"
        >
          {error}
        </Notification>
      )} */}

      {success && (
        <Notification
          className={styles.alert}
          icon={icon}
          title="Success"
          color="green"
        >
          You have successfully subscribed to our newsletter!
        </Notification>
      )}
    </Stack>
  );
};

export default JoinUs;
