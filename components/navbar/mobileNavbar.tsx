"use client";

import { Flex, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getUser } from "@/store/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MobileNavbar = () => {
  const [mobile, setMobile] = useState(false);
  const user = useSelector(getUser);
  const router = useRouter();

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobile]);

  return (
    <Stack hiddenFrom="md" w="100%">
      <Stack className={mobile ? styles.navbarBox : ""}>
        <Flex className={styles.mobileBody}>
          <AppSoluteLogo color="#ffffff" logoColor="white" />
          <Image
            src={mobile ? "/icons/close.svg" : "/icons/menu.svg"}
            alt="menu"
            width={35}
            height={35}
            className={styles.menu}
            onClick={() => setMobile(!mobile)}
          />
        </Flex>

        {mobile && (
          <Stack px={20} pt={40} justify="center" align="center">
            <ul className={styles.navLinks}>
              <li>
                <Link href="/leaderboard">Leaderboard</Link>
              </li>
              <li>
                <Link href="/media">Media</Link>
              </li>
              <li>
                <Link href="/research-development">R&D</Link>
              </li>
              <li>
                <Link href="/kids">Kids</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            <button
              className={styles.loginBtn}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default MobileNavbar;
