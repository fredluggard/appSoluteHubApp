import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./getIn.module.css";
import CustomBtn from "../button/customBtn";

const GetIn = () => {
  return (
    <Stack className={styles.getInContainer}>
      <Flex className={styles.getInFlex}>
        <Image
          src={"/images/rdPic.png"}
          alt=""
          width={500}
          height={500}
          className={styles.getInImg}
        />
        <Stack className={styles.getRight}>
          <Text className={styles.getText}>Get in touch</Text>
          <Title className={styles.getTitle}>Lorem ipsum dolor sit amet</Title>
          <Text className={styles.getInText}>
            Lorem ipsum dolor sit amet consectetur. Arcu vehicula tristique
            neque id pellentesque. Pretium sapien tempus blandit aliquet nibh
            mattis.
          </Text>
          <CustomBtn text="Contact Us Now!" bgColor="#34449C" url="#" />
        </Stack>
      </Flex>

      <Stack className={styles.midStack}>
        <Stack className={styles.midBox}>
          <Flex className={styles.midFlex}>
            <Box className={styles.box}>
              <Image
                src={"/images/ceo.png"}
                alt=""
                width={600}
                height={600}
                className={styles.ceo}
              />
            </Box>
            <Stack className={styles.innerStack}>
              <Text className={styles.innerText}>
                Lorem ipsum dolor sit amet consectetur. Feugiat mattis montes
                sapien donec vitae egestas ornare a. Mauris urna ut eget cursus
                eu dictum odio.
              </Text>
              <Stack className={styles.ceoStack}>
                <Title className={styles.ceoTitle}>Nwafor Livinus</Title>
                <Text className={styles.ceoText}>Ceo, AppSolute LLC</Text>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </Stack>

      <Flex className={styles.getInFlex2}>
        <Stack className={styles.getRight}>
          <Text className={styles.getText}>Get in touch</Text>
          <Title className={styles.getTitle}>Lorem ipsum dolor sit amet</Title>
          <Text className={styles.getInText}>
            Lorem ipsum dolor sit amet consectetur. Arcu vehicula tristique
            neque id pellentesque. Pretium sapien tempus blandit aliquet nibh
            mattis.
          </Text>
          <CustomBtn text="Contact Us Now!" bgColor="#34449C" url="#" />
        </Stack>
        <Image
          src={"/images/rdPic2.png"}
          alt=""
          width={500}
          height={500}
          className={styles.getInImg}
        />
      </Flex>
    </Stack>
  );
};

export default GetIn;
