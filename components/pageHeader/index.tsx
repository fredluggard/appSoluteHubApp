import { Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./head.module.css";

const Header = ({ title }: { title: string }) => {
  return (
    <Flex className={styles.headContainer}>
      <Title className={styles.headTitle}>{title}</Title>
      <Flex className={styles.headFlex}>
        <Link href={"/"} passHref className={styles.link}>
          <Image src={"/icons/home.svg"} alt="home" width={20} height={20} />
          <Text className={styles.headText}>Home</Text>
        </Link>
        <Image src={"/icons/right.svg"} alt="home" width={10} height={10} />
        <Text className={styles.text}>{title}</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
