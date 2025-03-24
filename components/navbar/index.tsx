"use client";

import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import styles from "./navbar.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { getUser } from "@/store/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = useSelector(getUser);
  const router = useRouter();

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
            <AppSoluteLogo color="#ffffff" logoColor="white" />
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

            {user?.email ? (
              <Flex gap={10} align="center">
                <Image
                  src={user?.profileImage || "/images/userProfile.png"}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.userImg}
                  onClick={() => router.push("/dashboard/settings")}
                />

                <Text>Hi, {user?.fullName.split(" ")[0]}</Text>
              </Flex>
            ) : (
              <Flex>
                <Link href="/login" className={styles.login}>
                  Login
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      ) : null}
    </>
  );
};

export default Navbar;
