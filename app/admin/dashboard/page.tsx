"use client";

import { Flex, Stack, Table, Avatar, Text, Badge } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./dash.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import Header from "@/components/pageHeader";
import DashStat from "@/components/pageHeader/dashStat";
import TrafficChart from "@/components/charts/trafficChart";
import LoadingBar from "../loading";

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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashData, setDashData] = useState<DashboardData | null>(null);

  const rows = dashData?.topArticles.map((item, index) => (
    <tr key={index} className={styles.tableRow}>
      <td className={styles.tableTitle}>
        <Flex gap="4px" align="center">
          <Avatar src={item.imageUrl} radius="8px" />
          <Text lineClamp={1} className={styles.textTitle}>
            {item.title}
          </Text>
        </Flex>
      </td>
      <td className={styles.tableDate}>
        <Text size="sm" c="dimmed" className={styles.textDate}>
          {new Date(item.postDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </td>
      <td className={styles.tableCategory}>
        <Badge
          color={item.category ?? "gray"}
          variant="light"
          className={styles.badge}
        >
          {item.category ?? "Uncategorized"}
        </Badge>
      </td>
      <td className={styles.tableComment}>
        <Text className={styles.textComment}>
          {item.commentsCount} Comments
        </Text>
      </td>
    </tr>
  ));

  const options = [
    {
      label: "Jan 2023 - Dec 2023",
      value: "100",
      image: "/icons/calender.svg",
    },
    {
      label: "Jan 2024 - Dec 2024",
      value: "200",
      image: "/icons/calender.svg",
    },
    {
      label: "Jan 2025 - Dec 2025",
      value: "300",
      image: "/icons/calender.svg",
    },
  ];

  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (option: any) => {
    setSelected(option);
    setOpen(false);
  };

  const pieData = [
    { name: "Mobile", value: 75 },
    { name: "Web", value: 25 },
  ];

  const COLORS = ["#34449C", "#D8DEFF"];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const token = useSelector(getUserToken);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/dashboard/summary`);
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch Dashboard");
      }

      const data = await response.json();
      console.log("Data fetched:", data);
      setDashData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <LoadingBar />
  ) : (
    <Stack pb={40}>
      <Header title="Dashboard" />
      <DashStat dashData={dashData} />
      <Stack className={styles.bodyBox}>
        <Flex className={styles.siteFlex}>
          <Stack className={styles.siteBox}>
            <Text className={styles.siteText}>Site Traffic</Text>
            <Text className={styles.siteTitle}>
              {dashData?.siteTraffic.total}
            </Text>
          </Stack>

          {/* Dropdown for Date */}
          <div
            className={styles.customSelectWrapper}
            onClick={() => setOpen(!open)}
          >
            <div className={styles.customSelectDisplay}>
              {selected ? (
                <>
                  <img src={selected.image} alt="" width={20} />
                  <span className={styles.label}>{selected.label}</span>
                  <img src="/icons/arrowDown.svg" alt="" width={20} />
                </>
              ) : (
                <>
                  <img src="/icons/calender.svg" alt="" width={20} />
                  <span className={styles.label}>Jan 2024 - Dec 2024 </span>
                  <img src="/icons/arrowDown.svg" alt="" width={20} />
                </>
              )}
            </div>

            {open && (
              <div className={styles.customSelectOptions}>
                {options.map((option) => (
                  <div
                    key={option.value}
                    className={styles.customSelectOption}
                    onClick={() => handleSelect(option)}
                  >
                    <img src={option.image} alt="" width={20} />
                    <span className={styles.label}>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Flex>
        <TrafficChart dashData={dashData} />
      </Stack>

      <Flex className={styles.articleFlex}>
        <Stack className={styles.articleBox}>
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.tableTitle}>Article Title</th>
                <th className={styles.tableDate}>Post Date</th>
                <th className={styles.tableCategory}>Category</th>
                <th className={styles.tableComment}>Comment</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Stack>

        <Stack className={styles.deviceBox}>
          <div style={{ width: "100%", height: "200px" }}>
            <Text className={styles.deviceText}>USED DEVICE</Text>

            <ResponsiveContainer width="100%" height="96%">
              <PieChart width={150} height={150}>
                <Pie
                  data={pieData}
                  innerRadius={40} // This creates the doughnut effect
                  outerRadius={60}
                  fill="#f28520"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      name={entry.name}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Dashboard;
