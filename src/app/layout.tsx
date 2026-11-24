import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "SkyMark | Digital Solutions Agency",
  description:
    "SkyMark provides web development, digital marketing, branding and creative digital solutions.",
};

const themeScript = `
  (function () {
    try {
      const savedTheme = localStorage.getItem("skymark-theme");
      const theme = savedTheme === "light" ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}