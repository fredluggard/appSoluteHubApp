import MobileFooter from "@/components/footer/mobileFooter";
import DashNavbar from "@/components/navbar/dashNavbar";
import SideBar from "@/components/sidebar";
import { Flex, Stack } from "@mantine/core";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex>
      <aside>
        <SideBar />
      </aside>
      <Stack>
        <DashNavbar />
        <main>{children}</main>
        <MobileFooter />
      </Stack>
    </Flex>
  );
};

export default DashboardLayout;
