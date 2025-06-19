import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Deception Game",
  description: "Can you convince Claude that you are an AI?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {children}
      </body>
    </html>
  );
}
