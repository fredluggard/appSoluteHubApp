import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  Stack,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import ReduxProvider from "@/store/Provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnalyticsTracker from "@/components/analytics/analytics";

export const metadata: Metadata = {
  title: "AppSolute - Innovating the Future, One Solution at a Time",
  description: "Innovating the Future, One Solution at a Time",
  icons: {
    icon: "/logo.svg",
  },
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
      <body className="body">
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <Navbar />
            <Stack>{children}</Stack>
            <Footer />
            <AnalyticsTracker />
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
