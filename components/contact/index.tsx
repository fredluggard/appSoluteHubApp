import { Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./contactUs.module.css";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../button";

const Contacts = () => {
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
            <Link href="#">
              <Image
                src={"/icons/fbCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="#">
              <Image
                src={"/icons/twCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="#">
              <Image
                src={"/icons/igCont.svg"}
                alt="facebook link"
                width={30}
                height={30}
              />
            </Link>
            <Link href="#">
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
        <form className={styles.form}>
          <Flex className={styles.nameInput}>
            <input
              type="text"
              name="firstName"
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
            name="email"
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
          <LinkButton text="Send Message" url="#" />
        </form>
      </Stack>
    </Stack>
  );
};

export default Contacts;
