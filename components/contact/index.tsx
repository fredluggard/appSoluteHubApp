"use client";

import { Flex, Stack, Text, Title } from "@mantine/core";
import React, { useRef } from "react";
import styles from "./contactUs.module.css";
import Image from "next/image";
import Link from "next/link";
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
            Have questions or ready to take the next step? Whether you&apos;re
            exploring our educational programs, curious about our latest
            innovations, or searching for the right tech solution, we&apos;re
            here for you. Let&apos;s connect and explore how we can help bridge
            the gap between you and technology. Your journey toward smarter
            solutions starts with a simple conversation.
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
