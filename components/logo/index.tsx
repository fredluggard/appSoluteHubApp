import { Flex, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./logo.module.css";

const AppSoluteLogo = () => {
  return (
    <>
      <Flex gap={15} align="center">
        <Image
          src="/icons/logo.svg"
          alt="AppSolute Logo"
          width={50}
          height={49}
          className={styles.logo}
        />
        <Text className={styles.text}>AppSolute</Text>
      </Flex>
    </>
  );
};

export default AppSoluteLogo;
