import type { Metadata } from "next";
import "./sub-globals.css";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import ReduxProvider from "@/store/Provider";
import SideBar from "@/components/adminSidebar/index";

export const metadata: Metadata = {
  title: "AppSolute - Innovating the Future, One Solution at a Time",
  description: "Innovating the Future, One Solution at a Time",
};

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Poppins, sans-serif",
  headings: { fontFamily: "Poppins, sans-serif" },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <SideBar>{children}</SideBar>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
