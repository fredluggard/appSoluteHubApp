"use client";

import { Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./signUser.module.css";
import Image from "next/image";
import CustomBtn from "@/components/button/customBtn";
import { useSearchParams } from "next/navigation";

const VerifySignUp = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = searchParams.get("token");

  const authUser = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}/api/v1/users/verify-email?token=${token}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify email");
      }

      const data = await response.json();
      console.log("Verification successful:", data);
      setSuccess(true);
    } catch (error) {
      console.error("Error authenticating user:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      authUser();
    } else {
      console.error("Token is missing in the URL");
    }
  }, [token]);

  return (
    <Stack className={styles.signUserContainer}>
      <Stack className={styles.darkLayout}>
        {success ? (
          <Stack className={styles.recoverLink}>
            <Image
              src={"/icons/check.svg"}
              alt="check"
              width={50}
              height={50}
              className={styles.check}
            />
            <Title className={styles.successTitle}>Verifed!</Title>
            <Text className={styles.successText}>
              You have successfully verified your email.
            </Text>

            <CustomBtn text="Login" url="/login" bgColor="#34449C" />
          </Stack>
        ) : (
          <Stack className={styles.recoverLink}>
            <Title className={styles.successTitle}>Verification Failed!</Title>
            <Text className={styles.successText}>
              An error occured during verification.
            </Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default VerifySignUp;
