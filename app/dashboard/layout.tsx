import SideBar from "@/components/sidebar";
import { Flex } from "@mantine/core";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex>
      <aside>
        <SideBar />
      </aside>
      <main>{children}</main>
    </Flex>
  );
};

export default DashboardLayout;
