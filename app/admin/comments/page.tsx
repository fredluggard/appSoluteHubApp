"use client";

import { Flex, Stack } from "@mantine/core";
import React, { useMemo, useState } from "react";
import styles from "./com.module.css";
import Header from "@/components/pageHeader";
import CommentSearch from "@/components/searchComp/commentSearch";
import Image from "next/image";

const comment = [
  {
    id: 1,
    email: "appSolute@admin",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vulputate sodales tortor.",
    author: "Sochima Onah",
    role: "Admin",
    img: "/images/post1.png",
  },
  {
    id: 2,
    email: "appSolute@admin",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vulputate sodales tortor.",
    author: "Joy Amuche",
    role: "Contributor",
    img: "/images/post1.png",
  },
  {
    id: 3,
    email: "appSolute@admin",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vulputate sodales tortor.",
    author: "Solomon Ali",
    role: "Admin",
    img: "/images/post1.png",
  },
  {
    id: 4,
    email: "appSolute@admin",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vulputate sodales tortor.",
    author: "Fred Aniebonam",
    role: "Contributor",
    img: "/images/post1.png",
  },
];

const CommentsPage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allIds = useMemo(
    () => comment?.map((post) => String(post.id)) || [],
    [comment]
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(allIds); // select all
    } else {
      setSelectedIds([]); // unselect all
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = comment?.map((post) => (
    <tr key={post.id} className={styles.tableRow}>
      <th className={styles.headCheck}>
        <input
          type="checkbox"
          className={styles.headCheckBox}
          checked={selectedIds.includes(String(post.id))}
          onChange={() => handleSelectOne(String(post.id))}
        />
      </th>
      <td className={styles.headAuthor}>
        <Flex className={styles.authorRow}>
          <Image
            src={post.img}
            alt="author"
            width={50}
            height={50}
            className={styles.authorImg}
          />
          <Stack gap={0} className={styles.authorStack}>
            <span className={styles.authorName}>{post.author}</span>
            <span className={styles.role}>{post.role}</span>
          </Stack>
        </Flex>
      </td>
      <td className={styles.rowTitle}>{post.email}</td>
      <td className={styles.rowTitle}>{post.comment}</td>
      <td className={styles.headActions}>
        <Flex className={styles.actionRow}>
          <Image
            src={"/icons/bin.svg"}
            alt=""
            width={20}
            height={20}
            className={styles.iconImg}
          />
        </Flex>
      </td>
    </tr>
  ));

  return (
    <Stack>
      <Header title="Comments" />
      <Stack className={styles.bodyBox}>
        <CommentSearch />

        <table className={styles.table}>
          {" "}
          {/* Make sure to apply styling if needed */}
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.headCheck}>
                <input
                  type="checkbox"
                  className={styles.headCheckBox}
                  checked={
                    selectedIds.length === allIds.length && allIds.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className={styles.headAuthor}>Author</th>
              <th className={styles.headTitle}>Email</th>
              <th className={styles.headTitle}>Comments</th>
              <th className={styles.headActions}>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </Stack>
    </Stack>
  );
};

export default CommentsPage;
