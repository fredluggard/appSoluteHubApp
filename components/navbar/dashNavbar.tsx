"use client";

import { useDisclosure } from "@mantine/hooks";
import { Drawer, Flex, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./dashNav.module.css";
import AppSoluteLogo from "../logo";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getUser } from "@/store/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SideBar from "../sidebar";

const DashNavbar = () => {
  const [mobile, setMobile] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector(getUser);
  const router = useRouter();

  const makeMobile = () => {
    setMobile(true);
    open();
  };

  const removeMobile = () => {
    setMobile(false);
    close();
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
        </Drawer>
      </Stack>
    </Stack>
  );
};

export default DashNavbar;
