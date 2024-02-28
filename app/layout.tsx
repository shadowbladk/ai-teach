import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { Chat } from "@/components/chat";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tutor",
  description: "AI Tutor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
          <Chat />
        </body>
      </html>
    </ClerkProvider>
  );
}
