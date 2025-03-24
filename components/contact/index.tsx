"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useRef } from "react";
import styles from "./contactUs.module.css";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../button";
import emailjs from "@emailjs/browser";

const Contacts = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_qkyb6mi",
          "template_3lwcm4r",
          form.current,
          "0dpCurKgxpSUnFUJw"
        )
        .then(
          (result) => {
            console.log(result.text);
            form.current?.reset();
            alert("Message sent successfully");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <Stack className={styles.contactUs}>
      <Flex className={styles.topBox}>
        <Image
          src={"/images/contact.png"}
          alt="People laughing"
          width={200}
          height={200}
          className={styles.image}
        />
        <Stack className={styles.reach}>
          <Title className={styles.title}>Reach out to us</Title>
          <Text className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat.
          </Text>
          <Flex className={styles.linkGroup}>
            <Link href="https://www.facebook.com/share/14N6e7xVyM/?mibextid=LQQJ4d">
              <Image
                src={"/icons/fbCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://x.com/appsolutehub?s=21">
              <Image
                src={"/icons/twCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://www.instagram.com/appsolutehub?igsh=MWR3d3lnOHBzOXF0Zg==">
              <Image
                src={"/icons/igCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://www.linkedin.com/company/appsolutehub/">
              <Image
                src={"/icons/inCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
          </Flex>
        </Stack>
      </Flex>

      <Stack className={styles.bottomBox}>
        <form className={styles.form} ref={form} onSubmit={sendEmail}>
          <Flex className={styles.nameInput}>
            <input
              type="text"
              name="user_name"
              id="firstName"
              placeholder="First Name"
              className={styles.fullName}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className={styles.fullName}
            />
          </Flex>
          <input
            type="email"
            name="user_email"
            id="email"
            placeholder="Email"
            className={styles.email}
          />
          <textarea
            name="message"
            id="message"
            placeholder="Write your message..."
            className={styles.message}
          />
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
          {/* <LinkButton text="Send Message" url="#" /> */}
        </form>
      </Stack>
    </Stack>
  );
};

export default Contacts;
