"use client";

import { Flex, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./search.module.css";
import { useRouter } from "next/navigation";

const TaskSearch = ({ handleNew }: { handleNew: () => void }) => {
  const router = useRouter();

  const addNewPost = () => {
    handleNew();
    router.push("/admin/tasks/new-task");
  };

  return (
    <Flex className={styles.searchContainer}>
      <input type="text" placeholder="Search" className={styles.search} />
      <Flex className={styles.newBox}>
        <Text className={styles.searchText}>1 - 10 of {52}</Text>
        <Image
          src={"/icons/left.svg"}
          alt=""
          width={8}
          height={8}
          className={styles.img}
        />
        <Image
          src={"/icons/rightss.svg"}
          alt=""
          width={8}
          height={8}
          className={styles.img}
        />
        <button className={styles.addNew} onClick={addNewPost}>
          Create Task
        </button>
      </Flex>
    </Flex>
  );
};

export default TaskSearch;
