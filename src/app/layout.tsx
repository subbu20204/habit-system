import type { Metadata } from "next";
import { getLatestVersion } from "@/lib/version";
import { Badge } from "@/components/ui/Badge/Badge";
import styles from "./layout.module.scss";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Habit System",
  description: "Personal habit tracker",
};

async function AppVersion() {
  const version = await getLatestVersion();
  return (
    <div className={styles.versionPin}>
      <Badge>{version}</Badge>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppVersion />
        {children}
      </body>
    </html>
  );
}
