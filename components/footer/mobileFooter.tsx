"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./footer.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import Image from "next/image";

const MobileFooter = () => {
  const year = new Date().getFullYear().toString();

  return (
    <Stack hiddenFrom="md" gap={100} className={styles.footerBox}>
      <Flex className={styles.top}>
        <Stack className={styles.logoBox}>
          <AppSoluteLogo color="#ffffff" logoColor="white" />
          <Text className={styles.logoText}>Lorem ipsum dolor sit amet</Text>
        </Stack>
        <Flex className={styles.group}>
          <Stack className={styles.list}>
            <Title order={4} className={styles.titles}>
              COMPANY
            </Title>
            <Stack>
              <Link href="/about" className={styles.text}>
                Mission
              </Link>
              <Link href="/about" className={styles.text}>
                Vision
              </Link>
              <Link href="/about" className={styles.text}>
                Explore
              </Link>
            </Stack>
          </Stack>

          <Stack className={styles.list}>
            <Title order={4} className={styles.titles}>
              SUPPORT
            </Title>
            <Stack>
              <Link href="/contact" className={styles.text}>
                Help
              </Link>
              <Link href="/contact" className={styles.text}>
                Privacy
              </Link>
              <Link href="/contact" className={styles.text}>
                Terms
              </Link>
            </Stack>
          </Stack>

          <Stack className={styles.list}>
            <Title order={4} className={styles.titles}>
              SOCIALS
            </Title>
            <Flex className={styles.groupLink}>
              <Link
                href="https://www.facebook.com/share/14N6e7xVyM/?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/icons/facebook.svg"}
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://x.com/appsolutehub?s=21"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/icons/twitter.svg"}
                  alt="twitter"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://www.instagram.com/appsolutehub?igsh=MWR3d3lnOHBzOXF0Zg=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/icons/instagram.svg"}
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://www.tiktok.com/@appsolutehub?_t=ZM-8uB70uxmNnR&_r=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/icons/tiktok.svg"}
                  alt="tiktok"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://youtube.com/@appsolutehub?si=i4tjPWK2JXzxIWZK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/icons/youtube.svg"}
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </Link>
            </Flex>
          </Stack>
        </Flex>
      </Flex>

      <Stack className={styles.copyright}>
        <Text className={styles.text}>&copy;Copyright {year}</Text>
      </Stack>
    </Stack>
  );
};

export default MobileFooter;
