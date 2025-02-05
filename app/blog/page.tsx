import BlogHero from "@/components/blog";
import AllBlog from "@/components/blog/allBlog";
import RecentBlog from "@/components/blog/recentBlog";
import { Stack } from "@mantine/core";
import React from "react";

const Blog = () => {
  return (
    <Stack>
      <BlogHero />
      <RecentBlog />
      <AllBlog />
    </Stack>
  );
};

export default Blog;
