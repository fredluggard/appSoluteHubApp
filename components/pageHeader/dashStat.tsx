import { Flex, Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import styles from "./dashStat.module.css";
import { useRouter } from "next/navigation";

interface DashboardData {
  metrics: {
    pageviews: number;
    monthlyUsers: number;
    posts: number;
    totalTasks: number;
  };
  siteTraffic: {
    total: number;
    monthlyData: {
      month: string;
      value: number;
      fullDate: string;
    }[];
  };
  topArticles: {
    title: string;
    postDate: string;
    category: string | null;
    commentsCount: number;
    imageUrl: string;
  }[];
  deviceUsage: any;
}

const DashStat = ({ dashData }: { dashData: DashboardData | null }) => {
  const router = useRouter();

  return (
    <Flex className={styles.statFlex}>
      <Stack className={styles.statBox}>
        <Flex className={styles.itemFlex}>
          <Image src={"/icons/eyes.svg"} alt="" width={15} height={15} />
          <Text className={styles.title}>Pageviews</Text>
        </Flex>
        <Flex className={styles.bottomFlex}>
          <Text className={styles.text}>
            {dashData?.metrics.pageviews ?? "50.8K"}
          </Text>
        </Flex>
      </Stack>

      <Stack className={styles.statBox}>
        <Flex className={styles.itemFlex}>
          <Image src={"/icons/user.svg"} alt="" width={15} height={15} />
          <Text className={styles.title}>Monthly Users</Text>
        </Flex>
        <Flex className={styles.bottomFlex}>
          <Text className={styles.text}>
            {dashData?.metrics.monthlyUsers ?? "26.8K"}
          </Text>
        </Flex>
      </Stack>

      <Stack className={styles.statBox}>
        <Flex className={styles.itemFlex}>
          <Image src={"/icons/plusIcon.svg"} alt="" width={15} height={15} />
          <Text className={styles.title}>Posts</Text>
        </Flex>
        <Flex className={styles.bottomFlex}>
          <Text className={styles.text}>
            {dashData?.metrics.posts ?? "756"}
          </Text>
        </Flex>
      </Stack>

      <Stack className={styles.statBox}>
        <Flex className={styles.itemFlex}>
          <Image src={"/icons/darkStar.svg"} alt="" width={15} height={15} />
          <Text className={styles.title}>Total Tasks</Text>
        </Flex>
        <Flex className={styles.bottomFlex}>
          <Text className={styles.text}>
            {dashData?.metrics.totalTasks ?? "2.3K"}
          </Text>
          <Text
            className={styles.textSub}
            onClick={() => router.push("/tasks")}
          >
            view
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default DashStat;
