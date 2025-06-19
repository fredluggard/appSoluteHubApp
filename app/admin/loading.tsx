"use client";

import { Stack } from "@mantine/core";
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";

const LoadingBar = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f28520");

  return (
    <Stack
      align="center"
      justify="center"
      // style={{ width: "100%", height: "60vh" }}
    >
      <MoonLoader
        color={color}
        loading={loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Stack>
  );
};

export default LoadingBar;
