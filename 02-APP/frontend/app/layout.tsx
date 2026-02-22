import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Items App",
  description: "NextJS + FastAPI + SQLite demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
