import { Box, Flex, Progress, Stack, Text, Title } from "@mantine/core";
import React from "react";
import styles from "./dash.module.css";
import Image from "next/image";

const Dashboard = () => {
  return (
    <Stack className={styles.dashContainer}>
      <Stack className={styles.innerBox}>
        <Flex className={styles.topFlex}>
          <Stack className={styles.topStack}>
            <Image
              src={"/images/userProfile.png"}
              alt="user profile"
              width={50}
              height={50}
              className={styles.userImg}
            />
            <Box bg={"orange"} className={styles.cameraBox}>
              <Image
                src={"/icons/camera.svg"}
                alt=""
                width={20}
                height={20}
                className={styles.cameraIcon}
              />
            </Box>
          </Stack>

          <Stack className={styles.downStack}>
            <Title className={styles.userName}>Sochima Onah</Title>
            <Stack className={styles.progressBox}>
              <Progress w={"90%"} color="#f28520" value={30} />
              <Text className={styles.completed}>158/500</Text>
            </Stack>
            <Text className={styles.morePoints}>
              Earn more 332 more points to bypass 50 people
            </Text>
          </Stack>
        </Flex>

        <Flex className={styles.pointsBox}>
          <Flex className={styles.pointsFlex}>
            <Stack className={styles.pointStack}>
              <Text className={styles.points}>55</Text>
              <Text className={styles.pointsTotal}>Total Points</Text>
            </Stack>
            <Image
              src={"/icons/dashStar.svg"}
              alt=""
              width={50}
              height={50}
              className={styles.pointImg}
            />
          </Flex>

          <Flex className={styles.pointsFlex}>
            <Stack className={styles.pointStack}>
              <Text className={styles.points}>55</Text>
              <Text className={styles.pointsTotal}>Total Tasks</Text>
            </Stack>
            <Image
              src={"/icons/dashTask.svg"}
              alt=""
              width={50}
              height={50}
              className={styles.pointImg}
            />
          </Flex>
        </Flex>

        <Flex className={styles.availableBox}>
          <Stack className={styles.pointStack}>
            <Text className={styles.points}>55</Text>
            <Text className={styles.pointsTotal}>Tasks Available</Text>
          </Stack>

          <Image
            src={"/icons/dashArrow.svg"}
            alt=""
            width={50}
            height={50}
            className={styles.pointImg}
          />
        </Flex>

        <Stack className={styles.ourBlogBox}>
          <Title className={styles.blogTitle}>Check our blog articles</Title>
          <Stack className={styles.blogStack}>
            <Flex className={styles.blogFlex}>
              <Image
                src={"/images/dashBlog.png"}
                alt=""
                width={50}
                height={50}
                className={styles.blogImg}
              />
              <Stack className={styles.blogBox}>
                <p className={styles.blogText}>
                  Lorem ipsum dolor sit amet consectetur. Et nisi morbi
                  dignissim aliquet porttitor viverra quam.{" "}
                  <span className={styles.blogDate}>12/4/2023</span>
                </p>
              </Stack>
            </Flex>

            <Flex className={styles.blogFlex}>
              <Image
                src={"/images/dashBlog.png"}
                alt=""
                width={50}
                height={50}
                className={styles.blogImg}
              />
              <Stack className={styles.blogBox}>
                <p className={styles.blogText}>
                  Lorem ipsum dolor sit amet consectetur. Et nisi morbi
                  dignissim aliquet porttitor viverra quam.{" "}
                  <span className={styles.blogDate}>12/4/2023</span>
                </p>
              </Stack>
            </Flex>

            <Flex className={styles.blogFlex}>
              <Image
                src={"/images/dashBlog.png"}
                alt=""
                width={50}
                height={50}
                className={styles.blogImg}
              />
              <Stack className={styles.blogBox}>
                <p className={styles.blogText}>
                  Lorem ipsum dolor sit amet consectetur. Et nisi morbi
                  dignissim aliquet porttitor viverra quam.{" "}
                  <span className={styles.blogDate}>12/4/2023</span>
                </p>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
