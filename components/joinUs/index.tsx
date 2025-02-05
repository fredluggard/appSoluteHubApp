import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./joinUs.module.css";

const JoinUs = () => {
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
          className={styles.input}
        />
        <Button className={styles.button}>Subscribe</Button>
      </Flex>
    </Stack>
  );
};

export default JoinUs;
