"use client";

import { Box, Flex } from "@mantine/core";
import React from "react";
import styles from "./navbar.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentUrl = usePathname();
  const pagePath = [
    "/login",
    "/signup",
    "/recover",
    "/reset-password/",
    "/dashboard",
  ];

  return (
    <>
      {!pagePath.some((path) => currentUrl.includes(path)) ? (
        <Flex className={styles.body} justify="space-between" align="center">
          <Box>
            <AppSoluteLogo color="#ffffff" />
          </Box>
          <Flex gap={70} align="center">
            <Flex>
              <ul className={styles.navLinks}>
                {[
                  { href: "/leaderboard", label: "Leaderboard" },
                  { href: "/media", label: "Media" },
                  { href: "/research-development", label: "R&D" },
                  { href: "/kids", label: "Kids" },
                  { href: "/blog", label: "Blog" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li
                    key={link.href}
                    className={`${styles.links} ${
                      currentUrl === link.href ? styles.active : ""
                    }`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </Flex>

            <Flex>
              <Link href="/login" className={styles.login}>
                Login
              </Link>
            </Flex>
          </Flex>
        </Flex>
      ) : null}
    </>
  );
};

export default Navbar;
