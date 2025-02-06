"use client";

import { Stack, Title } from "@mantine/core";
// import React, { useEffect, useState } from "react";

const Comments = ({ postId }: { postId: string }) => {
  //   const [comments, setComments] = useState<any>(null);
  //   const url = process.env.NEXT_PUBLIC_BASE_URL;

  //   useEffect(() => {
  //     const fetchBlog = async () => {
  //       try {
  //         const response = await fetch(`${url}/api/v1/posts/${postId}`);
  //         const data = await response.json();
  //         // setComments(data.data || null);
  //       } catch (error) {
  //         console.error("Error fetching recent blog:", error);
  //       }
  //     };

  //     fetchBlog();
  //   });

  return (
    <Stack>
      <Title>Comments</Title>
      <p>{postId}</p>
    </Stack>
  );
};

export default Comments;
