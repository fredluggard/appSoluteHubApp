"use client";

import { Flex, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import styles from "./sideBar.module.css";
import { useSelector } from "react-redux";
import { getUser } from "@/store/userSlice";

const sideLinks = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    links: ["/admin/dashboard"],
    icon: "/icons/dashIcon.svg",
  },
  {
    name: "Tasks",
    link: "/admin/tasks",
    links: ["/admin/tasks", "/admin/tasks/new-task", "/admin/tasks/edit-task"],
    icon: "/icons/tasks.svg",
  },
  {
    name: "Posts",
    link: "/admin/posts",
    links: ["/admin/posts", "/admin/posts/new-post", "/admin/posts/edit-post"],
    icon: "/icons/pin.svg",
  },
  {
    name: "Categories",
    link: "/admin/categories",
    links: ["/admin/categories"],
    icon: "/icons/category.svg",
  },
  {
    name: "Tags",
    link: "/admin/tags",
    links: ["/admin/tags"],
    icon: "/icons/tag.svg",
  },
  {
    name: "Users",
    link: "/admin/users",
    links: ["/admin/users"],
    icon: "/icons/userIcon.svg",
  },
  {
    name: "Roles",
    link: "/admin/roles",
    links: ["/admin/roles"],
    icon: "/icons/roles.svg",
  },
  {
    name: "Comments",
    link: "/admin/comments",
    links: ["/admin/comments"],
    icon: "/icons/comment.svg",
  },
];

const SideBar = ({ children }: any) => {
  const currentUrl = usePathname();
  const pagePath = ["/login"];
  const router = useRouter();

  const user = useSelector(getUser);

  return (
    <>
      {!pagePath.some((path) => currentUrl.includes(path)) ? (
        <Stack className={styles.sideBar}>
          <Flex className={styles.sideBarHeader}>
            <Flex className={styles.sideBarHeaderLeft}>
              <Flex className={styles.sideBarHeaderLogo}>
                <Image
                  src="/icons/logo2.svg"
                  alt="AppSolute"
                  width={30}
                  height={30}
                  onClick={() => router.push("/")}
                />
                <Text className={styles.sideBarHeaderText}>
                  Blog{" "}
                  <span className={styles.sideBarHeaderSpan}>Admin Panel</span>
                </Text>
              </Flex>
              <Flex className={styles.sideBarMess}>
                <Image
                  src="/icons/messIcon.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                {/* <Text>2</Text> */}
              </Flex>
              <Flex className={styles.sideBarNew}>
                <Image
                  src="/icons/plus.svg"
                  alt="AppSolute"
                  width={20}
                  height={20}
                />
                <Link href="/admin/posts/new-post">New</Link>
              </Flex>
              <Link href="/blog">View blog</Link>
            </Flex>

            <Flex className={styles.sideBarHeaderRight}>
              <Image
                src="/icons/pic.svg"
                alt="AppSolute"
                width={20}
                height={20}
              />
              <Text>Hello, {user.fullName?.split(" ")[0]}</Text>
              <Image
                src="/icons/down.svg"
                alt="AppSolute"
                width={15}
                height={15}
              />
            </Flex>
          </Flex>

          <Flex>
            {/* Side Bar */}
            <Stack className={styles.mainSideBar}>
              {sideLinks.map((link) => (
                <Stack
                  key={link.name}
                  className={`${
                    link.links.some((path) => currentUrl.includes(path))
                      ? styles.navLinkBox
                      : styles.navLinkBlank
                  }`}
                >
                  <Flex
                    className={`${styles.navLink} ${
                      link.links.some((path) => currentUrl.includes(path))
                        ? styles.active
                        : ""
                    }`}
                  >
                    <Image src={link.icon} alt="" width={15} height={15} />
                    <Link href={link.link} className={styles.linkText}>
                      {link.name}
                    </Link>
                  </Flex>
                </Stack>
              ))}
            </Stack>

            <Stack className={styles.mainContent}>{children}</Stack>
          </Flex>
        </Stack>
      ) : (
        <Stack>{children}</Stack>
      )}
    </>
  );
};

export default SideBar;
