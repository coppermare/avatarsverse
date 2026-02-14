import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avatarverse - Profile Avatar Library",
  description: "Deterministic, seed-based avatar library for the web",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
