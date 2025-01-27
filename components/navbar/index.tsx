import { Box, Flex, Stack } from "@mantine/core";
import React from "react";
import styles from "./navbar.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Flex className={styles.body} justify="space-between" align="center">
        <Box>
          <AppSoluteLogo />
        </Box>
        <Flex gap={70} align="center">
          <Flex>
            <ul className={styles.navLinks}>
              <li className={styles.links}>
                <Link href="/leaderboard">Leaderboard</Link>
              </li>
              <li className={styles.links}>
                <Link href="/research-development">R&D</Link>
              </li>
              <li className={styles.links}>
                <Link href="/kids">Kids</Link>
              </li>
              <li className={styles.links}>
                <Link href="/blog">Blog</Link>
              </li>
              <li className={styles.links}>
                <Link href="/about">About</Link>
              </li>
              <li className={styles.links}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </Flex>

          <Flex>
            <Link href="/login" className={styles.login}>
              Login
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
