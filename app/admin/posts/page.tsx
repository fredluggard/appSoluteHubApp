"use client";

import { Stack } from "@mantine/core";
import React, { useState } from "react";
import styles from "./posts.module.css";
import Header from "@/components/pageHeader";
import SearchComp from "@/components/searchComp";
import PostsList from "@/components/postsList";

const Posts = () => {
  const [addNew, setAddNew] = useState(false);

  const handleNew = () => {
    setAddNew((prev) => !prev);
  };

  console.log("Add New Post:", addNew);

  return (
    <Stack>
      <Header title="Posts" />
      <Stack className={styles.bodyBox}>
        <SearchComp handleNew={handleNew} />
        <PostsList />
      </Stack>
    </Stack>
  );
};

export default Posts;
