"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Drawer, Flex, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import styles from "./dashNav.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getUser } from "@/store/userSlice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

const DashNavbar = () => {
  const [mobile, setMobile] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const makeMobile = () => {
    setMobile(true);
    open();
  };

  const removeMobile = () => {
    setMobile(false);
    close();
  };

  const logOut = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      dispatch(clearUser());

      if (!response.ok) {
        throw new Error(
          `Logout failed: ${response.status} ${response.statusText}`
        );
      }

      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error(
        "Failed to log out:",
        error instanceof Error ? error.message : error
      );
    }
  };

  return (
    <Stack hiddenFrom="md" w="100%">
      <Stack className={styles.navbarBox}>
        <Flex className={styles.mobileBody}>
          <AppSoluteLogo color="#ffffff" logoColor="white" />
          <Image
            src={mobile ? "/icons/close.svg" : "/icons/menu.svg"}
            alt="menu"
            width={35}
            height={35}
            className={styles.menu}
            onClick={opened ? removeMobile : makeMobile}
          />
        </Flex>

        <Drawer
          opened={opened}
          onClose={removeMobile}
          title="AppSolute"
          position="right"
          size="70%"
        >
          <ul className={styles.navLinks}>
            {[
              {
                href: "/dashboard",
                label: "Dashboard",
                icon: "/icons/sociD.svg",
              },
              {
                href: "/dashboard/tasks",
                label: "Tasks",
                icon: "/icons/sociT.svg",
              },
              {
                href: "/dashboard/leaderboard",
                label: "Leaderboard",
                icon: "/icons/soci.svg",
              },
              {
                href: "/dashboard/settings",
                label: "Settings",
                icon: "/icons/sociS.svg",
              },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={removeMobile}>
                  <Flex className={styles.flexMenu}>
                    <Image src={link.icon} alt="" width={25} height={25} />
                    {link.label}
                  </Flex>
                </Link>
              </li>
            ))}
          </ul>

          <Button variant="subtle" color="#ffffff" w={"80%"} onClick={logOut}>
            <Image
              src={"/icons/logout.svg"}
              alt="Logout"
              width={30}
              height={30}
            />
            <Text className={styles.sideText}>Logout</Text>
          </Button>
        </Drawer>
      </Stack>
    </Stack>
  );
};

export default DashNavbar;
